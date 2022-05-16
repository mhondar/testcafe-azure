import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import SCMOrdenCompraPage, {validarPaginaOrdenCompra, ingresarNombreOC, seleccionarProveedor, seleccionarSucursal, buscarProductoPorCodigo, seleccionarMoneda, ingresarDatosLineaDeProducto, agregarProducto, validarImpuestoAplicado, validarCargoAplicado} from "../../pages/SCM/SCM_OrdenCompra_Page"
import Util from "../../helpers/utils"
import SCMHomePage from "../../pages/SCM/SCM_Home_Page"
import SCMInformacionOrdenCompraPage, {enviarInformacion, validarPaginaInformacionOrdenCompra} from "../../pages/SCM/SCM_InformacionOrdenCompra_Page"
import SCMBuscarOrdenCompra, {buscarOrdenCompra, validarEstadoOrden} from "../../pages/SCM/SCM_BuscarOrdenCompra_Page"
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"
import SCMBusquedaProductoModal, {seleccionarProducto} from "../../pages/SCM/SCM_BusquedaProducto_Modal"
import SCMFlujoAprobacionModal, {agregarAprobador} from "../../pages/SCM/SCM_FlujoAprobacion_Modal"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const ordenCompraData = require('../../data/SCM/ordenCompra_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Crear Orden de Compra con Aprobación")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].aprobador1.usuario, loginUserData[enviroment].aprobador1.organizacion, loginUserData[enviroment].aprobador1.password, loginUserData[enviroment].aprobador1.centroGestion) 
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Crear Orden de Compra")
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
    });

    test.meta("problem","true")("TC-67317 Validar Crear una Orden de Compra agregando productos por el Motor y Aprobador", async t =>{
        await ingresarNombreOC(SCMOrdenCompraPage, ordenCompraData.nombreOC)
        await seleccionarProveedor(SCMOrdenCompraPage, ordenCompraData.rut)
        await seleccionarSucursal(SCMOrdenCompraPage, ordenCompraData.sucursal) 
        await seleccionarMoneda(SCMOrdenCompraPage, "Peso chileno")
        await t
            .typeText(SCMOrdenCompraPage.notasInput, ordenCompraData.notas)
            .click(SCMOrdenCompraPage.codigoLupa)
        await seleccionarProducto(SCMBusquedaProductoModal, 7)
        await validarPaginaOrdenCompra(SCMOrdenCompraPage)
        await ingresarDatosLineaDeProducto(SCMOrdenCompraPage, "cantRandom", ordenCompraData.precio, ordenCompraData.glosa, "Dias de Despacho", ordenCompraData.comentario, ordenCompraData.cuentaCosto)
        await agregarProducto(SCMOrdenCompraPage, "seleccionado")
        await t
            .click(SCMOrdenCompraPage.verificarBtn)
            .click(SCMInformacionOrdenCompraPage.modificarFlujoBtn)
        await agregarAprobador(SCMFlujoAprobacionModal, "nlorca")
        await validarPaginaInformacionOrdenCompra(SCMInformacionOrdenCompraPage)
        await t.expect(SCMInformacionOrdenCompraPage.flujoAprobacionMsg.visible).ok("No se muestra Flujo de Aprobación con aprobador agregado")
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t.switchToMainWindow() 
        await clickMenuSubmenu(SCMHeaderComp, "Compras", "Consultar Estado de Orden")  
        await t.switchToIframe(SCMOrdenCompraPage.iframe)
        await buscarOrdenCompra(SCMBuscarOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await validarEstadoOrden(SCMBuscarOrdenCompra, "OC En Aprobación")
        await t.wait(5000)
        console.log("PASS TC-67317 Validar Crear una Orden de Compra agregando productos por el Motor y Aprobador")
    })
    
    