import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import MKPTourIFrame, { closeTour } from "../../pages/MKP/MKP_Tour_iFrame"
import MKPOrdenesCompraPage, { buscarOrdenCompra } from "../../pages/MKP/MKP_OrdenesCompra_Page"
import Util from "../../helpers/utils"
import MKPDetalleOrdenCompraComp, { validarInformacionOculta,validarInformacionVisible,validarHistoricoLineas,validarHistorialTab,validarVerOCTab } from "../../pages/MKP/MKP_DetalleOrdenCompra_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const ordenCompraData = require('../../data/MKP/ordenCompraData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Órdenes de Compra")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow();
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp,"ordenesCompra")
        await closeTour(MKPTourIFrame)
    })

    test("TC-49115 Validar Descargar excel de las órdenes de compra", async t => {
        await t.switchToIframe(MKPOrdenesCompraPage.ordenesCompraIFrame)
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t
            .click(MKPOrdenesCompraPage.descargarExcelLink)
            .wait(5000);
        let result = await Util.findFileOnDownloadDirectory("Órdenes de Compra");
        await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
        console.log("PASS TC-49115 Validar Descargar excel de las órdenes de compra") 
    });

    test.meta("type","smog")("TC-56862 Validar Buscar órdenes de compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        console.log("PASS TC-56862 Validar Buscar órdenes de compra") 
    });

    test("TC-56863 Validar Abrir Detalle de Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t
            .click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
            .expect(MKPDetalleOrdenCompraComp.numeroDocumentoLabel.textContent).contains(ordenCompraData.numeroOrdenCompra)
        console.log("PASS TC-56863 Validar Abrir Detalle de Orden de Compra") 
    });

    test("TC-56864 Validar Descargar PDF de Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t
            .click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
            .click(MKPDetalleOrdenCompraComp.descargarPdfBtn)
            .wait(5000);
        await t.expect(Util.checkFileExists("Documento " + ordenCompraData.numeroOrdenCompra + ".pdf")).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
        console.log("PASS TC-56864 Validar Descargar PDF de Orden de Compra")
    });

    test("TC-56865 Validar al Ocultar Caja de Resumen de Precios de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t
            .click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
            .click(MKPDetalleOrdenCompraComp.cajaPrecioOcultarBtn)
            .expect(MKPDetalleOrdenCompraComp.cajaPrecioVisibleTable.exists).notOk()
        console.log("PASS TC-56865 Validar al Ocultar Caja de Resumen de Precios de la Orden de Compra")
    });

    test("TC-56866 Validar al Mostrar Caja de Resumen de Precios de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t
            .click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
            .click(MKPDetalleOrdenCompraComp.cajaPrecioOcultarBtn)
            .click(MKPDetalleOrdenCompraComp.cajaPrecioOcultarBtn)
            .expect(MKPDetalleOrdenCompraComp.cajaPrecioVisibleTable.exists).ok()
        console.log("PASS TC-56866 Validar al Mostrar Caja de Resumen de Precios de la Orden de Compra")
    });

    test("TC-56867 Validar al Ocultar Información del Comprador de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionOculta('INFORMACIÓN DEL COMPRADOR',1)
        console.log("PASS TC-56867 Validar al Ocultar Información del Comprador de la Orden de Compra")
    });

    test("TC-56868 Validar al Mostrar Información del Comprador de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionVisible('INFORMACIÓN DEL COMPRADOR',2)
        console.log("PASS TC-56868 Validar al Mostrar Información del Comprador de la Orden de Compra")
    });

    test("TC-56869 Validar al Ocultar Información de Despacho de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionOculta('INFORMACIÓN DE DESPACHO',1)
        console.log("PASS TC-56869 Validar al Ocultar Información de Despacho de la Orden de Compra")
    });

    test("TC-56870 Validar al Mostrar Información de Despacho de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionVisible('INFORMACIÓN DE DESPACHO',2)
        console.log("PASS TC-56870 Validar al Mostrar Información de Despacho de la Orden de Compra")
    });

    test("TC-56871 Validar al Ocultar Información de Facturación de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionOculta('INFORMACIÓN DE FACTURACIÓN',2)
        console.log("PASS TC-56871 Validar al Ocultar Información de Facturación de la Orden de Compra")
    });

    test("TC-56872 Validar al Mostrar Información de Facturación de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionVisible('INFORMACIÓN DE FACTURACIÓN',1)
        console.log("PASS TC-56872 Validar al Mostrar Información de Facturación de la Orden de Compra")
    });

    test("TC-56873 Validar al Ocultar Proveedor de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionOculta('PROVEEDOR',2)
        console.log("PASS TC-56873 Validar al Ocultar Proveedor de la Orden de Compra")
    });

    test("TC-56874 Validar al Mostrar Proveedor de la Orden de Compra", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarInformacionVisible('PROVEEDOR',1)
        console.log("PASS TC-56874 Validar al Mostrar Proveedor de la Orden de Compra")
    });

    test("TC-56875 Validar se muestre información historica en todas las líneas de la Orden", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarHistoricoLineas(MKPDetalleOrdenCompraComp)
        console.log("PASS TC-56875 Validar se muestre información historica en todas las líneas de la Orden")
    });

    test("TC-56876 Validar pestaña Historial muestre información", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarHistorialTab(MKPDetalleOrdenCompraComp)
        console.log("PASS TC-56876 Validar pestaña Historial muestre información")
    });

    test("TC-56877 Validar pestaña Ver OC muestre vista de PDF", async t => {
        await buscarOrdenCompra(MKPOrdenesCompraPage, ordenCompraData.estado, ordenCompraData.numeroOrdenCompra)
        await t.click(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompraData.numeroOrdenCompra))
        await validarVerOCTab(MKPDetalleOrdenCompraComp)
        console.log("PASS TC-56877 Validar pestaña Ver OC muestre vista de PDF")
    });


 