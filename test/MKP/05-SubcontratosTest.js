import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import MKP_Subcontratos_Page, { validarEstadoContrato, clickRandomContratoByNum } from "../../pages/MKP/MKP_Subcontratos_Page"
import MKPTourIFrame, { closeTour } from "../../pages/MKP/MKP_Tour_iFrame"
import MKPModalDetalleSubcontratoPage, { clickRandomDescargaPdfByNum } from "../../pages/MKP/MKP_ModalDetalleSubcontrato_Page"
import Util from "../../helpers/utils";

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const subcontrato = require('../../data/MKP/subcontratoData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Subcontratos")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp,"subcontratos")
        await closeTour(MKPTourIFrame)
        await t
            .switchToIframe(MKP_Subcontratos_Page.iFrame)
            .expect(MKP_Subcontratos_Page.titleSubcontratosLabel.visible).ok()
           
    })

    test.meta("type","smog")("TC-58545 Validar búsqueda de subcontrato en ejecución", async t => {
        await t
            .click(MKP_Subcontratos_Page.estadoContratoDrp)
            .click(MKP_Subcontratos_Page.getOptionEstadoContrato("En ejecución"))
            .click(MKP_Subcontratos_Page.buscarBtn)
            .wait(5000)
        let result = await validarEstadoContrato(MKP_Subcontratos_Page)
        await t.expect(result).ok();
        console.log("PASS TC-58545 Validar búsqueda de subcontrato en ejecución")
    });

    test("TC-58547 Validar búsqueda de subcontrato por numero de folio", async t => {
        await t
            .typeText(MKP_Subcontratos_Page.numeroFolioInput, subcontrato.numeroFolio)
            .click(MKP_Subcontratos_Page.buscarBtn)
            //esperar 5 segundos para que se muestre la info del btn Buscar
            .wait(5000)
        let numeroFolioGrilla = await MKP_Subcontratos_Page.numeroFolioLink.textContent
            // console.log(numeroFolioGrilla)
        await t.expect(numeroFolioGrilla).eql(subcontrato.numeroFolio)
        console.log("PASS TC-58547 Validar búsqueda de subcontrato por numero de folio")
    });

    test("TC-58548 Validar página del detalle del subcontrato", async t => {         
        let contratoNumero = await clickRandomContratoByNum(MKP_Subcontratos_Page)
        let titleNumber = await MKPModalDetalleSubcontratoPage.titleSubcontratoNumeroLabel.textContent
        await t.expect(contratoNumero).eql(titleNumber)
        console.log("PASS TC-58548 Validar página del detalle del subcontrato")
    });

    test("TC-58550 Validar descargar pdf en pestaña Ver estado de pago", async t => {
        await t
            .click(MKP_Subcontratos_Page.numeroContratoLink)
            .click(MKPModalDetalleSubcontratoPage.pestanaVerEstadoPagoMenu)
            .expect(MKPModalDetalleSubcontratoPage.estadoDePagoLabel.visible).ok()
        let numeroPdf = await clickRandomDescargaPdfByNum(MKPModalDetalleSubcontratoPage)
        await t.wait(5000)
        let result = await Util.findFileOnDownloadDirectory("Documento ")
        await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
        console.log("PASS TC-58550 Validar descargar pdf en pestaña Ver estado de pago")    
    });

    test("TC-58551 Validar información visible de la pestaña Ver SC y anexos", async t => {
        let contratoNumero = await clickRandomContratoByNum(MKP_Subcontratos_Page)
        await t
            .click(MKPModalDetalleSubcontratoPage.pestanaVerScyAnexoMenu)
            .expect(MKPModalDetalleSubcontratoPage.nombreVerScyAnexoLabel.visible).ok()
            .expect(MKPModalDetalleSubcontratoPage.fechaCreacionVerScyAnexoLabel.visible).ok()
            .expect(MKPModalDetalleSubcontratoPage.montoVerScyAnexoLabel.visible).ok()
        console.log("PASS TC-58551 Validar información visible de la pestaña Ver SC y anexos") 
    });

    test("TC-58552 Validar información visible de la pestaña Garantías", async t => {
        let contratoNumero = await clickRandomContratoByNum(MKP_Subcontratos_Page)
        await t
            .click(MKPModalDetalleSubcontratoPage.pestanaGarantiasMenu)
            .expect(MKPModalDetalleSubcontratoPage.tipoGrarantiaLabel.visible).ok()
            .expect(MKPModalDetalleSubcontratoPage.tipoDocumentoGarantiaLabel.visible).ok()
            .expect(MKPModalDetalleSubcontratoPage.fechaCreacionGarantiasLabel.visible).ok()
            .expect(MKPModalDetalleSubcontratoPage.fechaVencimientoGarantiasLabel.visible).ok()
            .expect(MKPModalDetalleSubcontratoPage.montoGarantiasLabel.visible).ok()   
        console.log("PASS TC-58552 Validar información visible de la pestaña Garantías")     
    });

    test("TC-58554 Validar descarga PDF página Subcontrato", async t => {
        await t
            .click(MKP_Subcontratos_Page.buscarBtn)
            .expect(MKP_Subcontratos_Page.totalEstadoContratoGrilla.visible).ok()
            .click(MKP_Subcontratos_Page.descargarExcelLink)
            .wait(8000)
        let result = await Util.findFileOnDownloadDirectory("SubContratos ")
        await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
        console.log("PASS TC-58554 Validar descarga PDF página Subcontrato") 
    })


 






 
   
