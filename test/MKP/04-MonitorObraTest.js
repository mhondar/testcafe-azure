import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import MKPMonitorObraPage from "../../pages/MKP/MKP_MonitorObra_Page"
import MKPConsultaObrasPage, {buscarObraPorRegion, validarListaObrasPorRegion, buscarObraPorConstructora, validarListaObrasPorConstructora, validarFiltrosVacios, clickRandomProyectReturnName} from "../../pages/MKP/MKP_ConsultaObras_Page"
import MKPObraProyectoPage, {validarComponentesContactoVisibles} from "../../pages/MKP/MKP_ObraProyecto_Page"
import MKPFichaEmpresaPage from "../../pages/MKP/MKP_FichaEmpresa_Page"
import Util from "../../helpers/utils"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const constructoraData = require('../../data/MKP/constructora.json');
let enviroment = process.env.ENV;


fixture("Suite Pruebas MKP iConstruye Monitor de Obra")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow();
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp,"monitorObra")
        await t
            .wait(4000)    
            .switchToIframe(MKPMonitorObraPage.monitorObraIFrame)
            .click(MKPMonitorObraPage.monitorObraLabel)
            .expect(MKPMonitorObraPage.monitorObraLabel.visible).ok('Pagina de Monitor de Obra visible')
            .click(MKPMonitorObraPage.verTodasRubrosLink)
            .expect(MKPConsultaObrasPage.consultaObrasMigaPan.visible).ok('Pagina de Consulta de Obras visible')
    })

    test("TC-49126 Validar se haga visible Lista de Rubro de Obra del Buscador de Obras", async t => {
        await t
            .click(MKPConsultaObrasPage.rubroObraFiltroSelect)
            .wait(2000)
            .expect(MKPConsultaObrasPage.rubrObraFiltroSelectListVisible.visible).ok('Pagina de Consulta de Obras visible')
        console.log("PASS TC-49126 Validar se haga visible Lista de Rubro de Obra del Buscador de Obras")
    });

    test.meta("type","smog")("TC-57279 Validar buscar Obra por Región", async t => {
        await buscarObraPorRegion(MKPConsultaObrasPage, "Región Metropolitana de Santiago")
        let result = await validarListaObrasPorRegion(MKPConsultaObrasPage, "Región Metropolitana de Santiago")
        await t.expect(result).ok()
        console.log("PASS TC-57279 Validar buscar Obra por Región")
    });

    test("TC-57280 Validar buscar Obra por Constructora", async t => {
        await buscarObraPorConstructora(MKPConsultaObrasPage, constructoraData)
        let result = await validarListaObrasPorConstructora(MKPConsultaObrasPage, constructoraData)
        await t.expect(result).ok()
        console.log("PASS TC-57280 Validar buscar Obra por Constructora")
    });

    test("TC-57281 Validar Ver detalle de Proyecto desde Consulta de Obras", async t => {
        let proyectName = await clickRandomProyectReturnName(MKPConsultaObrasPage)
        await t
            .expect(MKPObraProyectoPage.obraProyectoMigaPan.visible).ok()
            .wait(2000)
        let titleObraProyecto = await MKPObraProyectoPage.obraProyectoTitle.textContent
        await t.expect(proyectName).eql(titleObraProyecto)
        console.log("PASS TC-57281 Validar Ver detalle de Proyecto desde Consulta de Obras")
    });

    test("TC-57282 Validar Componentes para enviar Mensaje Visibles", async t => {
        await clickRandomProyectReturnName(MKPConsultaObrasPage)
        await validarComponentesContactoVisibles(MKPObraProyectoPage)
        console.log("PASS TC-57282 Validar Componentes para enviar Mensaje Visibles")
    });

    test("TC-57283 Validar al limpiar filtros se vacién los mismos", async t => {
        await buscarObraPorRegion(MKPConsultaObrasPage, "Región Metropolitana de Santiago")
        await t.click(MKPConsultaObrasPage.limpiarButton)
        await validarFiltrosVacios(MKPConsultaObrasPage)
        console.log("PASS TC-57283 Validar al limpiar filtros se vacién los mismos")
    });
   
    test("TC-57284 Validar Descargar Excel de las Obras", async t => {
        await t
            .click(MKPConsultaObrasPage.descargarExcelLink)
            .wait(5000)
        let result = await Util.findFileOnDownloadDirectory("Obras");
        await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
        console.log("PASS TC-57284 Validar Descargar Excel de las Obras")
    });

    test("TC-57285 Validar al seleccionar Ver más Proyectos en Pagina de Detalle de Obra muestre Ficha de la Constructora", async t => {
        let empresaName =  await clickRandomProyectReturnName(MKPConsultaObrasPage)
        let empresaDisplay = await MKPObraProyectoPage.obraProyectoTitle.textContent
        let constructoraName = await MKPObraProyectoPage.constructoraLabel.textContent
        await t
            .expect(empresaName).eql(empresaDisplay)
            .click(MKPObraProyectoPage.verMasProyectosButton).wait(2000)
        let constructoraLabel = await MKPFichaEmpresaPage.constructoraLabel.textContent
        await t.expect(constructoraName).eql(constructoraLabel)
        console.log("PASS TC-57285 Validar al seleccionar Ver más Proyectos en Pagina de Detalle de Obra muestre Ficha de la Constructora")
    });
   
 