import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp";
import SCMControlDeRecepcionesPage, {buscarDocumentoPorEstadoYEstadoAsociacion, validarBusquedaDocumentoPorEstadoYAsociacion, seleccionarGuia, buscarDocumentoPorNumeroTransporte} from "../../pages/SCM/SCM_ControlDeRecepciones_Page"
import SCMNotaRecepcionPage, {agregarComentario} from "../../pages/SCM/SCM_NotaRecepcion_Page"
import SCMAnularRecepcionPage, {anularRecepcion} from "../../pages/SCM/SCM_AnularRecepcion_Page"
import SCMCancelacionRecepcionPage, {cancelacionRecepcion} from "../../pages/SCM/SCM_CancelarRecepcion_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');

fixture("Suite Pruebas iConstruye Reversa Recepción")
    .page(url)
    .beforeEach(async t => {
        let enviroment = process.env.ENV;
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)   
        await clickMenuSubmenu(SCMHeaderComp, "Recepción", "Control de Recepciones")
        await t
            .switchToIframe(SCMHeaderComp.iFrame)
            .expect(SCMControlDeRecepcionesPage.titleLabel.visible).ok("No se visualiza la página de Control de Recepciones")   
    })

   test.meta("type","smog").meta("problem","false")("TC-63808 Validar SubMenú Control de Recepciones", async t => {
        await t.expect(SCMControlDeRecepcionesPage.titleLabel.visible).ok("No se visualiza la página de Control de Recepciones")   
        console.log("PASS TC-63808 Validar SubMenú Control de Recepciones")
   });

   test.meta("problem","false")("TC-63876 Validar busqueda de Recepciones Ingresadas", async t => {
        await buscarDocumentoPorEstadoYEstadoAsociacion(SCMControlDeRecepcionesPage, "Ingresado", "No Asociada")
        await validarBusquedaDocumentoPorEstadoYAsociacion(SCMControlDeRecepcionesPage, "Ingresado", "No Asociada")
        console.log("PASS TC-63876 Validar busqueda de Recepciones Ingresadas")    
    });

    test.meta("problem","false")("TC-63375 Validar Reversa Recepciones", async t => {
        await buscarDocumentoPorEstadoYEstadoAsociacion(SCMControlDeRecepcionesPage, "Ingresado", "No Asociada")
        let numero = await seleccionarGuia(SCMControlDeRecepcionesPage)
        await agregarComentario(SCMNotaRecepcionPage, "Prueba Automatizada Reversa de Recepción")
        await t
            .click(SCMNotaRecepcionPage.volverBtn)
            .switchToMainWindow()
        await clickMenuSubmenu(SCMHeaderComp, "Recepción", "Anular Operaciones")
        await t.switchToIframe(SCMHeaderComp.iFrame)
        await anularRecepcion(SCMAnularRecepcionPage, numero)  
        await cancelacionRecepcion(SCMCancelacionRecepcionPage, "Prueba Automatizada Anular Recepcion")  
        await t.switchToMainWindow()
        await clickMenuSubmenu(SCMHeaderComp, "Recepción", "Control de Recepciones")
        await t.switchToIframe(SCMHeaderComp.iFrame)
        await buscarDocumentoPorNumeroTransporte(SCMControlDeRecepcionesPage, numero, "Anulado")
        console.log("PASS TC-63375 Validar Reversa Recepciones")    
    }); 

    