import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page";
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMCrearPedidoMaterialesPage, {seleccionarCuentasCosto, agregarNombreYComentarioPedido, editarPedido } from "../../pages/SCM/SCM_CrearPedidoMateriales_Page";
import { clearTextInput } from "../../helpers/shortcuts" 
import SCMMaestroProductoPMPage, {buscarProducto, seleccionarProductos} from "../../pages/SCM/SCM_MaestroProductoPM_Page"
import SCMEdicionLineasPMPage, {agregarDiasDespacho, agregarGlosa,agregarCantidad, agregarCuentasCosto } from "../../pages/SCM/SCM_EdicionLineasPM_Page"
import SCMInformacionPMGuardadoPage from "../../pages/SCM/SCM_InformacionPMGuardado_Page"
import SCMConsultarEstadoPMPage, {validarBusquedaPM} from "../../pages/SCM/SCM_ConsultarEstadoPM_Page"
import SCMOrdenCompraPage from "../../pages/SCM/SCM_OrdenCompra_Page"
import SCMBusquedaProductoModal, {seleccionarProductoPorCodigoYDescripcion} from "../../pages/SCM/SCM_BusquedaProducto_Modal"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const pedidoMaterialesData = require('../../data/SCM/pedidoMateriales_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Crear Pedido de Materiales")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion )
        await t.expect(SCMHeaderComp.pedidoMaterialesMenu.exists).ok()
        await clickMenuSubmenu(SCMHeaderComp, "Pedido Materiales", "Crear Pedido de Materiales")
    })

    test.meta("type","smog").meta("problem","false")("TC-59597 Validar menú Pedido de Materiales", async t => {
        console.log("PASS TC-59597 Validar menú Pedido de Materiales")
    });

    test.meta("problem","true")("TC-59598 Validar Creacion de un pedido de materiales", async t => {
        let randomNumber = Util.between(100000000,999999999)
        let nombrePM = pedidoMaterialesData.agregar.nombrePedido + randomNumber
        await agregarNombreYComentarioPedido(SCMCrearPedidoMaterialesPage, nombrePM, pedidoMaterialesData.agregar.notasPedido)
        await t
            .click(SCMCrearPedidoMaterialesPage.codigoLupaImg)
        let producto = await seleccionarProductoPorCodigoYDescripcion(SCMBusquedaProductoModal, pedidoMaterialesData.agregar.codigo, pedidoMaterialesData.agregar.filtroDescripcion, 7)    
        await t.switchToIframe(SCMCrearPedidoMaterialesPage.iFrame)
        let descripcionProduct = await SCMCrearPedidoMaterialesPage.getDescripcionProducto().textContent 
        await t
              .expect(producto).eql(descripcionProduct)
              .typeText(SCMCrearPedidoMaterialesPage.cantidadProductoInput, pedidoMaterialesData.agregar.cantidad)
              .typeText(SCMCrearPedidoMaterialesPage.glosaInput, pedidoMaterialesData.agregar.glosa)
              .click(SCMCrearPedidoMaterialesPage.diasDespachoRadioBtn)
              .typeText(SCMCrearPedidoMaterialesPage.diasDespachoLabel, pedidoMaterialesData.agregar.diasDespacho)
              .typeText(SCMCrearPedidoMaterialesPage.comentarioInput, pedidoMaterialesData.agregar.comentarios )
              .click(SCMCrearPedidoMaterialesPage.distribuirBtn)
            //pagina de distribucion cuentas de costo
        await t.switchToMainWindow()
              .expect(SCMCrearPedidoMaterialesPage.titleLabel.visible).ok("No se visualiza ventana Distribución de Cuentas de Costo")
              .click(SCMCrearPedidoMaterialesPage.buscarCCBtn)
        await seleccionarCuentasCosto(SCMCrearPedidoMaterialesPage)
        await t.click(SCMCrearPedidoMaterialesPage.seleccionarBtn)
        await clearTextInput(SCMCrearPedidoMaterialesPage.porcentajeValor1Label, pedidoMaterialesData.agregar.porcentaje1)
        await clearTextInput(SCMCrearPedidoMaterialesPage.porcentajeValor2Label, pedidoMaterialesData.agregar.porcentaje2)
        await t
              .click(SCMCrearPedidoMaterialesPage.guardarBtn)
              .click(SCMCrearPedidoMaterialesPage.cerrarBtn)
              .switchToIframe(SCMCrearPedidoMaterialesPage.iFrame)
              .click(SCMCrearPedidoMaterialesPage.agregarBtn)
        let result = await SCMCrearPedidoMaterialesPage.getProductoAnnadido().textContent
        await t
             .expect(result).eql(descripcionProduct) 
             .click(SCMCrearPedidoMaterialesPage.guardarProductoBtn)
             .switchToMainWindow()
        await clickMenuSubmenu(SCMHeaderComp, "Pedido Materiales", "Consultar Estado de Pedidos") 
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await validarBusquedaPM(SCMConsultarEstadoPMPage, nombrePM)
        await t.expect(SCMConsultarEstadoPMPage.getCantidadLineas('1').visible).ok("La cantidad de líneas del producto es diferente a 1")
        console.log("PASS TC-59598 Validar Creacion de un pedido de materiales")
    });

    test.meta("problem","true")("TC-59616 Validar creación de un pedido por la opción Maestro", async t => {
        let randomNumber = Util.between(100000000,999999999)
        let nombrePNI = pedidoMaterialesData.maestro.nombrePedido + randomNumber
        await agregarNombreYComentarioPedido(SCMCrearPedidoMaterialesPage, nombrePNI, pedidoMaterialesData.maestro.notasPedido)
        await t.click(SCMCrearPedidoMaterialesPage.maestroBtn)
        await buscarProducto(SCMMaestroProductoPMPage, pedidoMaterialesData.maestro.filtroDescripcion)
        await seleccionarProductos(SCMMaestroProductoPMPage)
        await t
              .setNativeDialogHandler(() => true)
              .click(SCMMaestroProductoPMPage.seleccionarBtn)
              .click(SCMMaestroProductoPMPage.cerrarBtn)
              .switchToIframe(SCMCrearPedidoMaterialesPage.iFrame)
              .expect(SCMCrearPedidoMaterialesPage.productosAnnadidosGrilla.visible).ok("No se visualizan productos añadidos en la grilla")      
        //await editarPedido(SCMCrearPedidoMaterialesPage, pedidoMaterialesData.maestro.cantidad, pedidoMaterialesData.maestro.glosa, pedidoMaterialesData.maestro.diasDespacho, pedidoMaterialesData.maestro.cuentaCosto)
              .click(SCMCrearPedidoMaterialesPage.editarLineasBtn)
              .expect(SCMEdicionLineasPMPage.titleEdicionLineasLabel.visible).ok("No se visualiza página de Edición de líneas de pedido de Materiales")
              .setTestSpeed(0.9)
        await agregarCuentasCosto(SCMEdicionLineasPMPage)
        await t.wait(1000)
        await agregarDiasDespacho(SCMEdicionLineasPMPage)
        await t.wait(1000)
        await agregarCantidad(SCMEdicionLineasPMPage)
        await t.wait(1000)
        await agregarGlosa(SCMEdicionLineasPMPage)
        await t
             .setTestSpeed(1.0)
             .click(SCMEdicionLineasPMPage.guardarBtn)
             .click(SCMEdicionLineasPMPage.cerrarBtn)
             .click(SCMCrearPedidoMaterialesPage.verificarBtn)
             .expect(SCMInformacionPMGuardadoPage.titleInformacionPMLabel.visible).ok("No se despliega página de Información del pedido de Materiales")
             .typeText(SCMInformacionPMGuardadoPage.comentariosInput, "Pedido de Materiales Prueba Automatizada Comentario 2")
             .click(SCMInformacionPMGuardadoPage.enviarBtn)
             .setNativeDialogHandler(() => true)
             .switchToMainWindow()
        await clickMenuSubmenu(SCMHeaderComp, "Pedido Materiales", "Consultar Estado de Pedidos") 
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await validarBusquedaPM(SCMConsultarEstadoPMPage, nombrePNI)
        await t.expect(SCMConsultarEstadoPMPage.getCantidadLineas('4').visible).ok("La cantidad de líneas del producto es diferente a 4")   
        console.log("PASS TC-59616 Validar creación de un pedido por la opción Maestro")
    });

    
