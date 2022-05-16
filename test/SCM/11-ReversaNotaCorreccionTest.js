import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp";
import SCMIngresoNotaCorreccionPage, {validarGrillaDocumentosAsociadosYEliminarDoc} from "../../pages/SCM/SCM_IngresoNotaCorreccion_Page"
import SCMControlFacturaYNotaPage, {buscarDocumentoNotaCorreccion, validarGrillaNotas, buscarNotaCorreccion} from "../../pages/SCM/SCM_ControlFacturaYNota_Page";
import SCMCancelacionNotaCorreccionPage, {colocarMotivoCancelacion} from "../../pages/SCM/SCM_CancelacionNotaCorreccion_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const notaCorreccionData = require('../../data/SCM/notaCorreccion_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Reversa Nota de Corrección")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)   
        await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Control de Documentos")
        await t.switchToIframe(SCMHeaderComp.iFrame)
        await t.expect(SCMControlFacturaYNotaPage.controlNotasCorreccionTab.visible).ok("No se visualiza el tab de Control de Notas de Corrección")
})

   test.meta("type","smog").meta("problem","false")("TC-63487 Validar submenú Control de Documentos - Notas de Corrección", async t => {
        await t
            .click(SCMControlFacturaYNotaPage.controlNotasCorreccionTab)
            .expect(SCMControlFacturaYNotaPage.tipoNotaCorreccionLabel.visible).ok("No se visualiza el label Tipo de Nota de Corrección")
        console.log("PASS TC-63487 Validar submenú Control de Documentos - Notas de Corrección")
   });

   test.meta("problem","false")("TC-63516 Validar búsqueda de documentos en estado Totalmente Asociado", async t => {
        await t
            .click(SCMControlFacturaYNotaPage.controlNotasCorreccionTab)
            .expect(SCMControlFacturaYNotaPage.tipoNotaCorreccionLabel.visible).ok("No se visualiza el label Tipo de Nota de Corrección")
        await buscarDocumentoNotaCorreccion(SCMControlFacturaYNotaPage, notaCorreccionData.estado)
        await validarGrillaNotas(SCMControlFacturaYNotaPage)
        console.log("PASS TC-63516 Validar búsqueda de documentos en estado Totalmente Asociado")    
    });

    test.meta("problem","false")("TC-63364 Validar la Reversa Notas de Corrección", async t => {
        await t
            .click(SCMControlFacturaYNotaPage.controlNotasCorreccionTab)
            .expect(SCMControlFacturaYNotaPage.tipoNotaCorreccionLabel.visible).ok("No se visualiza el label Tipo de Nota de Corrección")
        await buscarDocumentoNotaCorreccion(SCMControlFacturaYNotaPage, notaCorreccionData.estado)
        let estadoAsoc = await SCMControlFacturaYNotaPage.getEstadoAsociacionGrilla(0).textContent
        let folioUnico = await SCMControlFacturaYNotaPage.getFolioUnicoGrilla().textContent
        await t
            .expect(estadoAsoc.trim()).eql("Totalmente Asociada", "No coincide le estado de Asociación")
            .click(SCMControlFacturaYNotaPage.opcionesVerDocumentoImg)
            .expect(SCMIngresoNotaCorreccionPage.titleLabel.visible).ok("No se visualiza la página de Ingreso de Nota de Corrección")
        await validarGrillaDocumentosAsociadosYEliminarDoc(SCMIngresoNotaCorreccionPage)
        await buscarNotaCorreccion(SCMControlFacturaYNotaPage, folioUnico,"Ingresada", "Ingresado", "No Asociada")
        await t.click(SCMControlFacturaYNotaPage.opcionesCancelarImg)
        await colocarMotivoCancelacion(SCMCancelacionNotaCorreccionPage, "Prueba Automatizada, cancelar nota de corrección")
        await t
            .expect(SCMControlFacturaYNotaPage.tipoNotaCorreccionLabel.visible).ok("No se visualiza el label Tipo de Nota de Corrección")
            .click(SCMControlFacturaYNotaPage.estadoDocumentoNotaDrp)
            .click(SCMControlFacturaYNotaPage.getEstadoFacturaList("Cancelada"))
            .click(SCMControlFacturaYNotaPage.buscarNotaBtn)
        let folioDoc = await SCMControlFacturaYNotaPage.getFolioUnicoGrilla().textContent
        let estadoDoc = await SCMControlFacturaYNotaPage.getEstadoNotaCorreccion().textContent
        await t
            .expect(folioDoc.trim()).eql(folioUnico, "No coinciden los folios")
            .expect(estadoDoc.trim()).eql("Cancelado", "No coinciden el estado del docuemnto")
        console.log("PASS TC-63364 Validar la Reversa Notas de Corrección")    
    });
