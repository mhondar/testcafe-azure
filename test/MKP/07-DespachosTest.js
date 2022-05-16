import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"
import Util from "../../helpers/utils"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import MKPTourIFrame, { closeTour } from "../../pages/MKP/MKP_Tour_iFrame"
import MKPDespachosPage, { buscarPorFechaRecepcion, clickBotonBuscarYValidarGrilla } from "../../pages/MKP/MKP_Despachos_Page"
import MKPDespachosModalPage, { validarModalDespacho} from "../../pages/MKP/MKP_DespachosModal_Page"


// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const despachosData = require('../../data/MKP/despachosData.json');
const comentario = require('../../data/MKP/comentarioOferta.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Despachos")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp,"despachos")
        await closeTour(MKPTourIFrame)
        await t.switchToIframe(MKPTourIFrame.tourIFrame)
        
    })

    test.meta("type","smog")("TC-58555 Validar menú Despachos", async t => {
        await t.expect(MKPDespachosPage.titleDespachosLabel.visible).ok()
        console.log("PASS TC-58555 Validar menú Despachos")
    });

    test("TC-58556 Validar búsqueda filtro fecha de recepción", async t => {
        await buscarPorFechaRecepcion(MKPDespachosPage, despachosData.fechaRecepcionInicial, despachosData.fechaRecepcionFinal)
        await clickBotonBuscarYValidarGrilla(MKPDespachosPage) 
        console.log("PASS TC-58556 Validar búsqueda filtro fecha de recepción")    
    });

    test("TC-58557 Validar que al seleccionar un despacho, se muestre el detalle", async t => {
        await buscarPorFechaRecepcion(MKPDespachosPage, despachosData.fechaRecepcionInicial, despachosData.fechaRecepcionFinal)
        await clickBotonBuscarYValidarGrilla(MKPDespachosPage) 
        await validarModalDespacho(MKPDespachosModalPage, MKPDespachosPage)
        await t
              .wait(2000)
              .expect(MKPDespachosModalPage.detalleRecepcionLabel.visible).ok()
        console.log("PASS TC-58557 Validar que al seleccionar un despacho, se muestre el detalle")
    });

    test("TC-58558 Validar que se visualice motivo de rechazo", async t => {
        await buscarPorFechaRecepcion(MKPDespachosPage, despachosData.fechaRecepcionInicial, despachosData.fechaRecepcionFinal)
        await clickBotonBuscarYValidarGrilla(MKPDespachosPage) 
        await validarModalDespacho(MKPDespachosModalPage, MKPDespachosPage)
        //validar visualizacion de motivo de rechazo
        await t.hover(MKPDespachosModalPage.verMotivo)
       console.log("PASS TC-58558 Validar que se visualice motivo de rechazo")
    });

    test("TC-58560 Validar descarga NR nota de recepción del despacho", async t => {
        await buscarPorFechaRecepcion(MKPDespachosPage, despachosData.fechaRecepcionInicial, despachosData.fechaRecepcionFinal)
        await clickBotonBuscarYValidarGrilla(MKPDespachosPage) 
        await validarModalDespacho(MKPDespachosModalPage, MKPDespachosPage)
        await t
              .click(MKPDespachosModalPage.NC09Link)
              .wait(5000)
        let result = await Util.findFileOnDownloadDirectory("Documento")
        await t.expect(result).ok('El documento no se descargó', { allowUnawaitedPromise: true })
        console.log("PASS TC-58560Validar descarga NR nota de recepción del despacho")
    });

    // test.skip("TC-58562 Validar envío de comentarios en despacho", async t => {
    //     await buscarPorFechaRecepcion(MKPDespachosPage, despachosData.fechaRecepcionInicial, despachosData.fechaRecepcionFinal)
    //     await clickBotonBuscarYValidarGrilla(MKPDespachosPage) 
    //     await validarModalDespacho(MKPDespachosModalPage, MKPDespachosPage)
    //     await t
    //         .click(MKPDespachosModalPage.pestannaComentariosLink)
    //         .typeText(MKPDespachosModalPage.comentariosInput, comentario.comentario)
    //         .click(MKPDespachosModalPage.agregarBtn)
    //         .wait(5000)
    //     let comentarioAgregado = await MKPDespachosModalPage.getComentarioAgregado().textContent
    //     await t.expect(comentarioAgregado).eql(comentario.comentario)
    //     console.log("PASS TC-58562 Validar envío de comentarios en despacho")    
    // });

    test("TC-58565 Validar descarga de Excel de despachos", async t => {
        await buscarPorFechaRecepcion(MKPDespachosPage, despachosData.fechaRecepcionInicial, despachosData.fechaRecepcionFinal)
        await clickBotonBuscarYValidarGrilla(MKPDespachosPage) 
        await t
              .click(MKPDespachosPage.descargarExcelLink)
              .wait(3000)
        let result = await Util.findFileOnDownloadDirectory("Despachos")
        await t.expect(result).ok('El documento no se descargó', { allowUnawaitedPromise: true })      
        console.log("PASS TC-58565 Validar descarga de Excel de despachos")
    });
