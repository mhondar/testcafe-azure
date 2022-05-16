import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMAdministrarPMPage, {seleccionarPedidoPorEstado, seleccionarPedidoMixto, buscarPedidoPorNumero} from "../../pages/SCM/SCM_AdministrarPM_Page"
import SCMGenerarDocumentoPage from "../../pages/SCM/SCM_GenerarDocumento_Page"
import SCMAdministracionPedidoAdquisicionPage, {seleccionarDesignado} from "../../pages/SCM/SCM_AdministracionPedidoAdquisicion_Page"
import SCMConsultaCotizacionPage, {validarPageConsultaCotizacion, buscarCotPorNombre} from "../../pages/SCM/SCM_ConsultaCotizacion_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const adminPMData = require('../../data/SCM/administracionPM_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Administración de Pedido")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion) 
        await clickMenuSubmenu(SCMHeaderComp, "Pedido Materiales", "Administración de Pedidos")
     })

   test.meta("type","smog").meta("problem","false")("TC-60042 Validar SubMenú Administración de Pedido", async t => {
        await t
             .switchToIframe(SCMAdministrarPMPage.iframe)
             .expect(SCMAdministrarPMPage.titleAdministracionPMLabel.visible).ok("No se visualiza página de Administración de Pedido")
        console.log("PASS TC-60042 Validar SubMenú Administración de Pedido")
   });

   test.meta("problem","false")("TC-60044 Validar compra de un pedido de Materiales", async t => {
       let randomNumber = Util.between(100000000,999999999)
       let nombreOC = adminPMData.nombreOrdenComprar + randomNumber
       await t
            .switchToIframe(SCMAdministrarPMPage.iframe)
            .expect(SCMAdministrarPMPage.titleAdministracionPMLabel.visible).ok("No se visualiza página de Administración de Pedido")
            .click(SCMAdministrarPMPage.administrarPedidoMenu) 
       let numeroPedido = await seleccionarPedidoPorEstado(SCMAdministrarPMPage) 
       let pedido = await SCMAdministracionPedidoAdquisicionPage.getNumeroPM().textContent  
       await t.expect(numeroPedido).eql(pedido)
       await seleccionarDesignado(SCMAdministracionPedidoAdquisicionPage, adminPMData.opcion)
       await t
             .click(SCMAdministracionPedidoAdquisicionPage.primerProductoCheck)
             .click(SCMAdministracionPedidoAdquisicionPage.tercerProductoCheck)      
             .click(SCMAdministracionPedidoAdquisicionPage.comprarBtn)
             .expect(SCMGenerarDocumentoPage.titleGenerarDocumentoLabel.visible).ok("No se visualiza la Página de Generar documento desde líneas")
             .typeText(SCMGenerarDocumentoPage.nombreOrdenInput, nombreOC)
             .expect(SCMGenerarDocumentoPage.grillaProductos.visible).ok("No se visualiza grilla con los productos seleccionados")
             .click(SCMGenerarDocumentoPage.generarBtn)
             .expect(SCMAdministracionPedidoAdquisicionPage.titleAdministracionPM.visible).ok("No se visualiza página de Administración de Pedido")
             .click(SCMAdministracionPedidoAdquisicionPage.volverBtn)
       await buscarPedidoPorNumero(SCMAdministrarPMPage, numeroPedido, "Pedido Mixto")     
       console.log("PASS TC-60044 Validar compra de un pedido de Materiales")
   });

   test.meta("problem","false")("TC-60045 Validar crear Cotización de pedido", async t => {
       let randomNumber = Util.between(100000000,999999999)
       let nombreCot = adminPMData.nombreCotizacion + randomNumber
       await t
             .switchToIframe(SCMAdministrarPMPage.iframe)
             .expect(SCMAdministrarPMPage.titleAdministracionPMLabel.visible).ok("No se visualiza página de Administración de Pedido")
             .click(SCMAdministrarPMPage.administrarPedidoMenu)
        let numeroPedido = await seleccionarPedidoMixto(SCMAdministrarPMPage)
        let pedido = await SCMAdministracionPedidoAdquisicionPage.getNumeroPM().textContent  
        await t.expect(numeroPedido).eql(pedido)
        await seleccionarDesignado(SCMAdministracionPedidoAdquisicionPage, adminPMData.opcion)
        await t
              .click(SCMAdministracionPedidoAdquisicionPage.segundoProductoCheck)
              .click(SCMAdministracionPedidoAdquisicionPage.cuartoProductoCheck)
              .click(SCMAdministracionPedidoAdquisicionPage.cotizarBtn)
              .expect(SCMGenerarDocumentoPage.titleGenerarDocumentoLabel.visible).ok("No se visualiza la Página de Generar documento desde líneas")
              .typeText(SCMGenerarDocumentoPage.nombreOrdenInput, nombreCot)
              .click(SCMGenerarDocumentoPage.generarBtn)
              .expect(SCMAdministracionPedidoAdquisicionPage.titleAdministracionPM.visible).ok("No se visualiza página de Administración de Pedido")
              .switchToMainWindow() 
       await clickMenuSubmenu(SCMHeaderComp, "Cotizaciones", "Consultar Estado de Cotizaciones")     
       await validarPageConsultaCotizacion(SCMConsultaCotizacionPage)
       await buscarCotPorNombre(SCMConsultaCotizacionPage,nombreCot)
       console.log("PASS TC-60045 Validar crear Cotización de pedido")
   });



 