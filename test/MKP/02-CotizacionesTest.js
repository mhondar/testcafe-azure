import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import MKPCotizacionesPage, { buscarCotizaciones, validarCotizaciones } from "../../pages/MKP/MKP_Cotizaciones_Page"
import MKPTourIFrame, { closeTour } from "../../pages/MKP/MKP_Tour_iFrame"
import MKPDetalleCotizacionPage from "../../pages/MKP/MKP_DetalleCotizacion_Page"
import Util from "../../helpers/utils"
import MKPImprimirCotizacionPage, { imprimirCotizacion } from "../../pages/MKP/MKP_ImprimirCotizacion_Page"
import MKPOfertaCotizacionPage, { completarOferta } from "../../pages/MKP/MKP_OfertaCotizacion_Page"
import MKPConfirmarCotizacionPage, { confirmarCotizacion } from "../../pages/MKP/MKP_ConfirmarCotizacion_Page"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const clienteData = require('../../data/MKP/clienteData.json');
const ofertaData = require('../../data/MKP/ofertaData.json');
const comentarioOferta = require('../../data/MKP/comentarioOferta.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Cotizaciones")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow();
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userCot.user, loginUserData[enviroment].userCot.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp,"cotizaciones")
        await closeTour(MKPTourIFrame)
        await buscarCotizaciones(MKPCotizacionesPage, clienteData)
    })

    test("TC-55622 Validar Buscar Cotización por Cliente", async t => {
        let result = await validarCotizaciones(MKPCotizacionesPage, clienteData)
        await t.expect(result).ok();
        console.log("PASS TC-55622 Validar Buscar Cotización por Cliente")
    });

    test.meta("type","smog")("TC-55621 Validar Visualizar Cotización 51", async t => {
        await t
            .click(MKPCotizacionesPage.seleccionarCotizacion("51"))
            .expect(MKPDetalleCotizacionPage.titleCotizacion.textContent).contains("Cotización " + "51" + " "); 
        console.log("PASS TC-55621 Validar Visualizar Cotización 51")  
    });

    // test.skip("TC-55623 Validar Descargar PDF para Imprimir de Cotización", async t => {
    //     await t.click(MKPCotizacionesPage.seleccionarCotizacion("1"));
    //     await imprimirCotizacion(MKPDetalleCotizacionPage, MKPImprimirCotizacionPage)
    //     await t.wait(10000)
    //     let result = await Util.findFileOnDownloadDirectory("cotizacion");
    //     await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
    //     console.log("PASS TC-55623 Validar Descargar PDF para Imprimir de Cotización")  
    // });

    test("TC-55624 Validar Visualizar Historial de Cotización", async t => {
        await t
            .click(MKPCotizacionesPage.seleccionarCotizacion("51"))
            .click(MKPDetalleCotizacionPage.historialTab)
            .expect(MKPDetalleCotizacionPage.historialVisible.visible).ok()
        console.log("PASS TC-55624 Validar Visualizar Historial de Cotización") 
    });

    test("TC-55625 Validar Visualizar Lineas de Cotización", async t => {
        await t
            .click(MKPCotizacionesPage.seleccionarCotizacion("51"))
            .click(MKPDetalleCotizacionPage.historialTab)
            .click(MKPDetalleCotizacionPage.lineasTab)
            .expect(MKPDetalleCotizacionPage.lineasVisible.visible).ok()
        console.log("PASS TC-55625 Validar Visualizar Lineas de Cotización") 
    });

    test("TC-55626 Validar ocultar Resumen de Cotización", async t => {
        await t
            .click(MKPCotizacionesPage.seleccionarCotizacion("51"))
            .click(MKPDetalleCotizacionPage.ocultarResumenBtn)
            .expect(MKPDetalleCotizacionPage.panelCostadoOculto.visible).ok()
        console.log("PASS TC-55626 Validar ocultar Resumen de Cotización") 
    });

    test("TC-55627 Validar mostrar Resumen de Cotización", async t => {
        await t
            .click(MKPCotizacionesPage.seleccionarCotizacion("51"))
            .click(MKPDetalleCotizacionPage.ocultarResumenBtn)
            .click(MKPDetalleCotizacionPage.ocultarResumenBtn)
            .expect(MKPDetalleCotizacionPage.panelCostadoVisible.visible).ok()
        console.log("PASS TC-55627 Validar mostrar Resumen de Cotización") 
    });

    test("TC-55628 Validar Descargar Planilla para Ofertar Cotización", async t => {
        await t
            .click(MKPCotizacionesPage.ofertarBtn)
            .click(MKPOfertaCotizacionPage.descargarPlanillaLabel)
            .wait(10000)
            let result = await Util.findFileOnDownloadDirectory("Plantilla_Oferta");
        await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
        console.log("PASS TC-55628 Validar Descargar Planilla para Ofertar Cotización") 
    });
    
    // test.skip("TC-55629 Validar Cargar Planilla para Ofertar Cotización", async t => {
    //     await t
    //         .click(MKPCotizacionesPage.ofertarBtn)
    //         //Adjuntar Planilla PENDING
    //     console.log("PASS TC-55629 Validar Cargar Planilla para Ofertar Cotización") 
    // });

    test("TC-55631 Validar Enviar Oferta de Cotización", async t => {
        await t.click(MKPCotizacionesPage.getOfertarBtn('54'));
        await t.typeText(MKPOfertaCotizacionPage.nombreOfertaLabel, "Prueba Oferta QA")
        await completarOferta(MKPOfertaCotizacionPage,ofertaData);
        await t.click(MKPOfertaCotizacionPage.enviarOfertaBtn);
        await confirmarCotizacion(MKPConfirmarCotizacionPage,comentarioOferta); 
        await t.expect(MKPCotizacionesPage.confirmacionOfertaPopup.visible).ok()
        console.log("PASS TC-55631 Validar Enviar Oferta de Cotización") 
    });
   
