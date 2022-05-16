import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp, isVisiblePopUpcapacitaciones} from "../../pages/MKP/MKP_UpdateData_Popup"
import MKPMiPerfilPage from "../../pages/MKP/MKP_MiPerfil_Page"
import Util from "../../helpers/utils"

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Usuario")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await isVisiblePopUpcapacitaciones(MKPUpdateDataPopup)

    })

    test.meta("type","smog")("TC-49105 Validar Login", async t => {
        await t.expect(MKPHeaderComp.userHello.visible).ok()
        console.log("PASS TC-49105 Validar Login")
    });

    test("TC-58521 Validar ir a configuraciones desde el portal de Marketplace", async t => {
        await t
           .click(MKPHeaderComp.userHello)
           .click(MKPHeaderComp.configuracionBtn)
           .expect(MKPMiPerfilPage.usuarioNameLabel.visible).ok()
           console.log("PASS TC-58521 Validar ir a configuraciones desde el portal de Marketplace")
    });
   

    test.meta("type","smog")("TC-49109 Validar Logout", async t => {
        await t
           .click(MKPHeaderComp.userHello)
           .click(MKPHeaderComp.cerrarSessionBtn)
           .expect(MKPLoginPage.emailInput.visible).ok()
        console.log("PASS TC-49109 Validar Logout")
    });
   
