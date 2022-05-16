import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp";
import SCMControlFacturaYNotaPage, {buscarFactura, buscarFacturaPorEstado, validarEstadoFacturaEnGrilla} from "../../pages/SCM/SCM_ControlFacturaYNota_Page";
import SCMInformacionFacturaPage, {agregarComentarioCorreccionYRevertir} from "../../pages/SCM/SCM_InformacionFactura_Page"
import SCMCancelacionFacturaPage, {agregarMotivoCancelacion} from "../../pages/SCM/SCM_CancelacionFactura_Page";

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const facturaData = require('../../data/SCM/facturaData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Reversa Facturación")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)   
        await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Control de Documentos")
        await t
            .switchToIframe(SCMHeaderComp.iFrame)
            .expect(SCMControlFacturaYNotaPage.controlFacturaTab.visible).ok("No se visualiza el tab de Control de Facturas")
            .click(SCMControlFacturaYNotaPage.controlFacturaTab)
    })

   test.meta("type","smog").meta("problem","false")("TC-63665 Validar submenú Control de Documentos - Control de Facturas", async t => {
        await t.expect(SCMControlFacturaYNotaPage.estadoFactura.visible).ok("No se visualiza los elementos del tab Control de Factura")
        console.log("PASS TC-63665 Validar submenú Control de Documentos - Control de Facturas")
   });

   test.meta("problem","false")("TC-63666 Validar búsqueda de facturas en estado Aprobada", async t => {
        await buscarFacturaPorEstado(SCMControlFacturaYNotaPage, "Factura Aprobada")
        await validarEstadoFacturaEnGrilla(SCMControlFacturaYNotaPage, "Aprobada")
        console.log("PASS TC-63666 Validar búsqueda de facturas en estado Aprobada")    
    });

    test.meta("problem","false")("TC-63668 Revertir factura de estado Aprobada a Ingresada", async t => {
        await buscarFacturaPorEstado(SCMControlFacturaYNotaPage, "Factura Aprobada")
        await validarEstadoFacturaEnGrilla(SCMControlFacturaYNotaPage, "Aprobada")
        await t.click(SCMControlFacturaYNotaPage.getRevertirImg(0))
        let folioData = await agregarComentarioCorreccionYRevertir(SCMInformacionFacturaPage, facturaData.comentarioReversa)    
        await buscarFactura(SCMControlFacturaYNotaPage, folioData.toString(),"Factura Ingresada" ,"Ingresada")
        console.log("PASS TC-63668 Revertir factura de estado Aprobada a Ingresada")    
    });

    test.meta("problem","false")("TC-63670 Cancelar factura", async t => {
        await buscarFacturaPorEstado(SCMControlFacturaYNotaPage, "Factura Ingresada")
        await validarEstadoFacturaEnGrilla(SCMControlFacturaYNotaPage, "Ingresada")
        let folioUnico = await SCMControlFacturaYNotaPage.getFolioUnicoGrilla().textContent
        await t
            .setNativeDialogHandler(() => true)
            .click(SCMControlFacturaYNotaPage.getCancelarImg(0))
        await agregarMotivoCancelacion(SCMCancelacionFacturaPage, "Prueba Automatizada QA Revertir Factura")
        await buscarFactura(SCMControlFacturaYNotaPage, folioUnico.toString(),"Factura Cancelada" ,"Cancelada")
        console.log("PASS TC-63670 Cancelar factura")    
    });

    test.meta("problem","false")("TC-63806 Validar descarga de Facturas", async t => {
        await t
            .expect(SCMControlFacturaYNotaPage.estadoFactura.visible).ok("No se visualiza los elementos del tab Control de Factura")
            .click(SCMControlFacturaYNotaPage.excelBtn)
        let result = await Util.findFileOnDownloadDirectory("ReporteControlFacturas")
        await t.expect(result).ok('El documento no se descargó', { allowUnawaitedPromise: true })
        console.log("PASS TC-63806 Validar descarga de Facturas")
   });
