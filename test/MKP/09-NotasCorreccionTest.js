import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import Util from "../../helpers/utils"
import MKPNotasCorreccionPage, {validarPaginaNotasCorreccionPresente,buscarNotaCorreccionPorCliente,buscarNotaCorreccionPorEstado} from "../../pages/MKP/MKP_NotasCorreccion_Page"

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
const clienteUserData = require('../../data/MKP/clienteData.json')
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Notas Corrección")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp, "notas") 
        await validarPaginaNotasCorreccionPresente(MKPNotasCorreccionPage)
    })

    test.meta("type","smog")("TC-59368 Validar menú Solicitud Nota Corrección", async t => {
        console.log("PASS TC-59368 Validar menú Solicitud Nota Corrección")
    });

    // test.skip("TC-59371 Validar busqueda por filtro estado arroje resultados", async t => {
    //     await buscarNotaCorreccionPorEstado(MKPNotasCorreccionPage, "Nueva")
    //     //Error no se visualizan resultados
    //     await t.wait(5000)
    //     console.log("PASS TC-59371 Validar busqueda por filtro estado arroje resultados")
    // });

    // test.skip("TC-59376 Validar busqueda por filtro cliente arroje resultados", async t => {
    //     await buscarNotaCorreccionPorCliente(MKPNotasCorreccionPage, clienteUserData)
    //     //Error no se visualizan resultados
    //     await t.wait(5000)
    //     console.log("TC-59376 Validar busqueda por filtro cliente arroje resultados")
    // });

    // test.skip("TC-59963 Validar descargar satisfactoriamente documentos buscados previamente", async t => {
    //     await buscarNotaCorreccionPorEstado(MKPNotasCorreccionPage, "Nueva")
    //     //Error no se visualizan resultados
    //     await t.wait(5000)
    //     console.log("TC-59963 Validar descargar satisfactoriamente documentos buscados previamente ")
    // });
