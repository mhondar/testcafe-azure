import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMBuscarOrdenCompra, {validarTitleBuscarOrden, seleccionarOrdenPorEstado, buscarOrdenCompra, buscarOrdenCompraPorProveedorEstado} from "../../pages/SCM/SCM_BuscarOrdenCompra_Page"
import SCMOrdenCompraPage, {validarPaginaOrdenCompra, seleccionarProveedor, seleccionarSucursal, ingresarDatosLineaDeProducto, agregarProducto} from "../../pages/SCM/SCM_OrdenCompra_Page"
import SCMBusquedaProductoModal, {seleccionarProducto} from "../../pages/SCM/SCM_BusquedaProducto_Modal"
import SCMEdicionLineasOCPage, {agregarPrecioUnitario, agregarDiasDespacho} from "../../pages/SCM/SCM_EdicionLineasOC_Page"
import SCMDescuentosOrdenCompraPage, {aplicarDescuentos} from "../../pages/SCM/SCM_DescuentosOrdenCompra_Page"
import SCMInformacionOrdenCompraPage, {enviarInformacion} from "../../pages/SCM/SCM_InformacionOrdenCompra_Page"
import SCMHomePage from "../../pages/SCM/SCM_Home_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const ordenCompraData = require('../../data/SCM/ordenCompra_Data.json');
const productoData = require('../../data/SCM/pedidoMateriales_Data.json');
const descuentosData = require('../../data/SCM/descuentosOC_Data.json')
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Envío Orden de Compra")
    .page(url)
    .beforeEach(async t => {
          await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)
          await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")
          await validarTitleBuscarOrden(SCMBuscarOrdenCompra)  
     })

   test.meta("type","smog").meta("problem","false")("TC-60305 Validar menú Consulta Estado de Orden", async t => {
        console.log("PASS TC-60305 Validar menú Consulta Estado de Orden")
   });

   test.meta("problem","false")("TC-60306 Validar Búsqueda de ordenes", async t => {
          await t
               .click(SCMBuscarOrdenCompra.buscarBtn)
               .expect(SCMBuscarOrdenCompra.grillaOrdenes.visible).ok("No se visualiza grilla con ordenes")
          console.log("PASS TC-60306 Validar Búsqueda de ordenes")
    });

    test.meta("problem","true")("TC-60313 Validar Envío de orden", async t => {
          await buscarOrdenCompraPorProveedorEstado(SCMBuscarOrdenCompra, "NO INGRESADO", "Guardada")
          let nombreOC = await seleccionarOrdenPorEstado(SCMBuscarOrdenCompra)
          await t.expect(SCMOrdenCompraPage.titleOrdenCompra.visible).ok("No se visualiza la página de Orden de Compra")
          await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
          await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal)
          let rut = await SCMOrdenCompraPage.getRut().textContent
          await t
               .expect(rut).eql(ordenCompraData.rut)
               .typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
               .click(SCMOrdenCompraPage.codigoLupa)
          await seleccionarProducto(SCMBusquedaProductoModal, 7)    
          await validarPaginaOrdenCompra(SCMOrdenCompraPage) 
          await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, productoData.agregar.cantidad, productoData.agregar.precio, productoData.agregar.glosa, "Dias de Despacho", productoData.agregar.comentarios, productoData.agregar.cuentaCosto)
          await agregarProducto(SCMOrdenCompraPage, "seleccionado")
          await t.click(SCMOrdenCompraPage.editarLineasBtn)
          await agregarPrecioUnitario(SCMEdicionLineasOCPage, "100")
          await SCMEdicionLineasOCPage.eliminarFechaEntrega()
          await agregarDiasDespacho(SCMEdicionLineasOCPage)
          await t
               .click(SCMEdicionLineasOCPage.guardarBtn)
               .click(SCMEdicionLineasOCPage.volverBtn)
               .click(SCMOrdenCompraPage.descuentoImg)
          await aplicarDescuentos(SCMDescuentosOrdenCompraPage, descuentosData.descripcion, descuentosData.tipoDcto, descuentosData.formato, descuentosData.valor)     
          await t
               .switchToIframe(SCMOrdenCompraPage.iframe)
               .click(SCMOrdenCompraPage.verificarBtn)
          await enviarInformacion(SCMInformacionOrdenCompraPage)
          await t
                 .expect(SCMHomePage.welcomeLabel.visible).ok("No se visualiza la página de Su Escritorio")
                 .switchToMainWindow()    
          await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")
          await t.switchToIframe(SCMOrdenCompraPage.iframe)
          await buscarOrdenCompra(SCMBuscarOrdenCompra, nombreOC)
          let estado = await SCMBuscarOrdenCompra.getEstado(2).textContent
          await t.expect(estado.trim()).eql("OC Enviada a Proveedor", "No se visualiza la orden de compra con el estado correcto")
          await t.wait(5000)
          console.log("PASS TC-60313 Validar Envío de orden")
    });
