import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import SCMOrdenCompraPage, {validarPaginaOrdenCompra, ingresarNombreOC, seleccionarProveedor, seleccionarSucursal, buscarProductoPorCodigo, seleccionarMoneda, ingresarDatosLineaDeProducto, agregarProducto, validarImpuestoAplicado, validarCargoAplicado} from "../../pages/SCM/SCM_OrdenCompra_Page"
import Util from "../../helpers/utils"
import SCMHomePage from "../../pages/SCM/SCM_Home_Page"
import SCMInformacionOrdenCompraPage, {enviarInformacion, modificarFlujoAprobador} from "../../pages/SCM/SCM_InformacionOrdenCompra_Page"
import SCMBuscarOrdenCompra, {buscarOrdenCompra, validarEstadoOrden} from "../../pages/SCM/SCM_BuscarOrdenCompra_Page"
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"
import SCMBusquedaProductoModal, {seleccionarProducto} from "../../pages/SCM/SCM_BusquedaProducto_Modal"
import SCMDistribucionCuentaCostoModal, {distribuirCuentaCosto} from "../../pages/SCM/SCM_DistribucionCuentaCosto_Modal"
import SCMDescuentosOrdenCompraPage, {aplicarDescuentos} from "../../pages/SCM/SCM_DescuentosOrdenCompra_Page"
import SCMImpuestosOrdenCompraPage, {aplicarImpuestos} from "../../pages/SCM/SCM_ImpuestosOrdenCompra_Page"
import SCMMaestroProductosModal, {seleccionarProductos} from "../../pages/SCM/SCM_MaestroProductos_Modal"
import SCMEdicionLineasOCPage, {editarLineasProductos} from "../../pages/SCM/SCM_EdicionLineasOC_Page"
import SCMCargosOrdenCompraModal, {aplicarCargos} from "../../pages/SCM/SCM_CargosOrdenCompra_Modal"
import {clearTextInput} from "../../helpers/shortcuts"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const ordenCompraPNIData = require('../../data/SCM/ordenCompraPNI_Data.json');
const ordenCompraData = require('../../data/SCM/ordenCompra_Data.json');
const descuentosData = require('../../data/SCM/descuentosOC_Data.json')
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Crear Orden de Compra")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion) 
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Crear Orden de Compra")
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
    });

    test.meta("type","smog").meta("problem","false")("TC-63513 Validar ingreso a página desde Menú de Compras, Crear Orden de Compra", async t =>{
       console.log("PASS TC-63513 Validar ingreso a página desde Menú de Compras, Crear Orden de Compra")
    })

    test.meta("problem","false")("TC-49896 Validar Ingreso de datos obligatorios y PNI para creación de orden de compra", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraPNIData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraPNIData.rut)
        await seleccionarMoneda(SCMOrdenCompraPage, "Peso chileno")
        await buscarProductoPorCodigo(SCMOrdenCompraPage, ordenCompraPNIData.codigo)
        await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, "cantRandom", ordenCompraPNIData.precio, ordenCompraPNIData.glosa, "Ver Calendario", ordenCompraPNIData.comentario, ordenCompraPNIData.cuentaCosto)
        await agregarProducto(SCMOrdenCompraPage, ordenCompraPNIData.codigo)
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t
            .expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
            .switchToMainWindow()  
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC Enviada por Email")
        console.log("PASS TC-49896 Validar Ingreso de datos obligatorios y PNI para creación de orden de compra")
    })

    test.meta("problem","true")("TC-63549 Validar Crear una Orden de Compra usando el motor de Búsqueda de Productos de 1 Producto sin Distribuir Cuentas de Costo", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
        await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal) 
        await seleccionarMoneda(SCMOrdenCompraPage, "Peso chileno")
        await t.typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
        await t.click(SCMOrdenCompraPage.codigoLupa)
        await seleccionarProducto(SCMBusquedaProductoModal, 7)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, "cantRandom", ordenCompraData.precio, ordenCompraData.glosa, "Dias de Despacho", ordenCompraData.comentario, ordenCompraData.cuentaCosto)
        await agregarProducto(SCMOrdenCompraPage, "seleccionado")
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t
            .expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
            .switchToMainWindow() 
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC Enviada a Proveedor")
        console.log("PASS TC-63549 Validar Crear una Orden de Compra usando el motor de Búsqueda de Productos de 1 Producto sin Distribuir Cuentas de Costo")
    })

    test.meta("problem","true")("TC-63560 Validar Crear una Orden de Compra usando el motor de Búsqueda de Productos de más de 1 Producto con Distribución de Cuenta de costo por Cantidad", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
        await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal) 
        await seleccionarMoneda(SCMOrdenCompraPage, "Peso chileno")
        await t.typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
        //Primer Producto
        await t.click(SCMOrdenCompraPage.codigoLupa)
        await seleccionarProducto(SCMBusquedaProductoModal, 7)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, "cantRandom", ordenCompraData.precio, ordenCompraData.glosa, "Ver Calendario", ordenCompraData.comentario, "distribuida")
        await distribuirCuentaCosto(SCMDistribucionCuentaCostoModal, "Cantidad")
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await t.click(SCMOrdenCompraPage.descuentoLineaProductoBtn)
        await aplicarDescuentos(SCMDescuentosOrdenCompraPage, descuentosData.descripcion, descuentosData.tipoDcto, descuentosData.formato, descuentosData.valor)     
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await t.click(SCMOrdenCompraPage.otroImpuestosBtn)
        await aplicarImpuestos(SCMImpuestosOrdenCompraPage, "10,00")
        await validarImpuestoAplicado(SCMOrdenCompraPage, "10,00")
        await agregarProducto(SCMOrdenCompraPage, "seleccionado")
        //Segundo Producto
        await t.click(SCMOrdenCompraPage.codigoLupa)
        await seleccionarProducto(SCMBusquedaProductoModal, 7)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, "cantRandom", ordenCompraData.precio, ordenCompraData.glosa, "Ver Calendario", ordenCompraData.comentario, ordenCompraData.cuentaCosto)
        await agregarProducto(SCMOrdenCompraPage, "seleccionado")
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t
            .expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
            .switchToMainWindow()  
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC Enviada a Proveedor")
        console.log("PASS TC-63560 Validar Crear una Orden de Compra usando el motor de Búsqueda de Productos de más de 1 Producto con Distribución de Cuenta de costo por Cantidad")
    })

    test.meta("problem","true")("TC-63561 Validar Crear una Orden de Compra usando el motor de Búsqueda de Productos de 1 Producto Con Distribución de Cuentas de Costo por Porcentaje", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
        await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal) 
        await seleccionarMoneda(SCMOrdenCompraPage, "Euro")
        await t.typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
        await t.click(SCMOrdenCompraPage.codigoLupa)
        await seleccionarProducto(SCMBusquedaProductoModal, 7)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, "cantRandom", "0,05", ordenCompraData.glosa, "Ver Calendario", ordenCompraData.comentario, "distribuida")
        await distribuirCuentaCosto(SCMDistribucionCuentaCostoModal, "Porcentaje")
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await t.click(SCMOrdenCompraPage.descuentoLineaProductoBtn)
        await aplicarDescuentos(SCMDescuentosOrdenCompraPage, descuentosData.descripcion, descuentosData.tipoDcto, descuentosData.formato, descuentosData.valor)     
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await agregarProducto(SCMOrdenCompraPage, "seleccionado")
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t
            .expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
            .switchToMainWindow()  
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC Enviada a Proveedor")
        console.log("PASS TC-63561 Validar Crear una Orden de Compra usando el motor de Búsqueda de Productos de 1 Producto Con Distribución de Cuentas de Costo por Porcentaje")
    })

    test.meta("problem","true")("TC-63551 Validar Crear una Orden de Compra usando el Maestro de Productos agregando 1 producto", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
        await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal) 
        await seleccionarMoneda(SCMOrdenCompraPage, "Dólar estadounidense")
        await t
            .typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
            .click(SCMOrdenCompraPage.maestroBtn)
        await seleccionarProductos(SCMMaestroProductosModal, 1)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await t.click(SCMOrdenCompraPage.editarLineasBtn)
        await editarLineasProductos(SCMEdicionLineasOCPage, "0,05")
        await t
            .click(SCMEdicionLineasOCPage.guardarBtn)
            .click(SCMEdicionLineasOCPage.volverBtn)
            .click(SCMOrdenCompraPage.descuentoImg)
        await aplicarDescuentos(SCMDescuentosOrdenCompraPage, descuentosData.descripcion, descuentosData.tipoDcto, descuentosData.formato, descuentosData.valor)     
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t
            .expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
            .switchToMainWindow()  
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC Enviada a Proveedor")
        console.log("PASS TC-63551 Validar Crear una Orden de Compra usando el Maestro de Productos agregando 1 producto")
    })

    test.skip.meta("problem","true")("TC-63552 Validar Crear una Orden de Compra usando el Maestro de Productos agregando varios productos", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
        await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal) 
        await seleccionarMoneda(SCMOrdenCompraPage, "Unidad de Fomento")
        await t
            .typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
            .click(SCMOrdenCompraPage.maestroBtn)
        await seleccionarProductos(SCMMaestroProductosModal, 2)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await t
            .wait(2000)
            .click(SCMOrdenCompraPage.editarLineasBtn)
        await editarLineasProductos(SCMEdicionLineasOCPage, "0,01")
        await t
            .click(SCMEdicionLineasOCPage.guardarBtn)
            .click(SCMEdicionLineasOCPage.volverBtn)
            .click(SCMOrdenCompraPage.otroImpuestosBtn)
        await aplicarImpuestos(SCMImpuestosOrdenCompraPage, "0,01")
        await validarImpuestoAplicado(SCMOrdenCompraPage, "0,01")
        await t.click(SCMOrdenCompraPage.cargosBtn)
        await aplicarCargos(SCMCargosOrdenCompraModal, "0,01")
        await validarCargoAplicado(SCMOrdenCompraPage, "0,01")
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t
            .expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
            .switchToMainWindow()  
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC Enviada a Proveedor")
        console.log("PASS TC-63552 Validar Crear una Orden de Compra usando el Maestro de Productos agregando varios productos")
    })

    