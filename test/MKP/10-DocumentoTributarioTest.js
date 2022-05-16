import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import Util from "../../helpers/utils"
import MKPTourIFrame, { closeTour } from "../../pages/MKP/MKP_Tour_iFrame"
import MKPDocumentoTributarioPage, {validarPaginaDocumentoTributarioPresente, buscarPorFiltroRapido, buscarValidarPorFechaEmision, clickValidarDocumentoRandom} from "../../pages/MKP/MKP_DocumentoTributario_Page"

const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const clienteUserData = require('../../data/MKP/clienteData.json')
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Documento Tributario")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp, "documentoTributario") 
        await closeTour(MKPTourIFrame)
        await validarPaginaDocumentoTributarioPresente(MKPDocumentoTributarioPage)
    })

    // test.skip("TC-58566 Validar ir a página Documento Tributario desde el Menú", async t => {
    //     await validarPaginaDocumentoTributarioPresente(MKPDocumentoTributarioPage)
    //     console.log("PASS TC-58566 Validar ir a página Documento Tributario desde el Menú")
    // });

    test("TC-59998 Validar en Panel de Documentos Tributarios la Razón Social contenga el nombre del usuario", async t => {
        await t.expect(MKPDocumentoTributarioPage.getRazonSocial(loginUserData[enviroment].nombreCompleto).visible).ok("No se muestra en Razón Social la empresa correcta")
        console.log("PASS TC-59998 Validar en Panel de Documentos Tributarios la Razón Social contenga el nombre del usuario")
    });

    // test.skip("TC-60001 Validar al Buscar Factura de Compra por Filtros Rápidos, Documentos cedidos, arroje resultados", async t => {
    //     await t.click(MKPDocumentoTributarioPage.documentosTab)
    //     await buscarPorFiltroRapido(MKPDocumentoTributarioPage, "Documentos Cedidos")
    //     //Falta validar resultados pero no esta devolviendo data
    //     console.log("PASS TC-60001 Validar al Buscar Factura de Compra por Filtros Rápidos, Documentos cedidos, arroje resultados")
    // });

    test.meta("type","smog")("TC-60005 Validar al Buscar en un Rango de Fecha de emisión válido arroje resultados", async t => {
        await t.click(MKPDocumentoTributarioPage.documentosTab)
        await buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, "01/09/2021", "04/10/2021")
        console.log("PASS TC-60005 Validar al Buscar en un Rango de Fecha de emisión válido arroje resultados")
    });

    test("TC-60008 Validar página de Factura de Compra Electrónica sea visible al seleccionarla", async t => {
        await t.click(MKPDocumentoTributarioPage.documentosTab)
        await buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, "01/09/2021", "04/10/2021")
        await clickValidarDocumentoRandom(MKPDocumentoTributarioPage)
        console.log("PASS TC-60008 Validar página de Factura de Compra Electrónica sea visible al seleccionarla")
    });

    test("TC-60009 Validar en Página de Detalles de la Factura pestaña de Información de Conciliación visible", async t => {
        await t.click(MKPDocumentoTributarioPage.documentosTab)
        await buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, "01/09/2021", "04/10/2021")
        await clickValidarDocumentoRandom(MKPDocumentoTributarioPage)
        await t.expect(MKPDocumentoTributarioPage.infoConciliacionTabPage.visible).ok("No se muestra la Información de Conciliación")
        console.log("PASS TC-60009 Validar en Página de Detalles de la Factura pestaña de Información de Conciliación visible")
    });
  
    test("TC-60010 Validar en Página de Detalles de la Factura pestaña de Pago visible", async t => {
        await t.click(MKPDocumentoTributarioPage.documentosTab)
        await buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, "01/09/2021", "04/10/2021")
        await clickValidarDocumentoRandom(MKPDocumentoTributarioPage)
        await t
            .click(MKPDocumentoTributarioPage.pagoTab)
            .expect(MKPDocumentoTributarioPage.pagoTabTitle.visible).ok("No Visible Tab de Pagos")
        console.log("PASS TC-60010 Validar en Página de Detalles de la Factura pestaña de Pago visible")
    });
  
    test("TC-60011 Validar en Página de Detalles de la Factura pestaña de Historial visible", async t => {
        await t.click(MKPDocumentoTributarioPage.documentosTab)
        await buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, "01/09/2021", "04/10/2021")
        await clickValidarDocumentoRandom(MKPDocumentoTributarioPage)
        await t
            .click(MKPDocumentoTributarioPage.historialTab)
            .expect(MKPDocumentoTributarioPage.historialCont.visible).ok("No Visible Tab de Pagos")
        console.log("PASS TC-60011 Validar en Página de Detalles de la Factura pestaña de Historial visible")
    });

    // test.skip("TC-60012 Validar Descargar Excel con información de Documentos Tributarios", async t => {
    //     await t.click(MKPDocumentoTributarioPage.documentosTab)
    //     await buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, "01/09/2021", "04/10/2021")
    //     await t.click(MKPDocumentoTributarioPage.descargarExcelBtn)
    //     await t.wait(10000)
    //     let result = await Util.findFileOnDownloadDirectory("Documentos Tributarios Electrónicos");
    //     await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
    //     console.log("PASS TC-60012 Validar Descargar Excel con información de Documentos Tributarios")
    // });