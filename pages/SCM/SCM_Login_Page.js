import { Selector,t } from "testcafe";
import SCMHomePage from "../../pages/SCM/SCM_Home_Page"
import SCMSeleccionarCentroGestionPage, {seleccionarCentroGestion} from "../../pages/SCM/SCM_SeleccionarCentroGestion_Page"

class SCMLoginPage {
    constructor(){
        this.accesoClientesBtn = Selector('a').withText('Iniciar sesión')
        this.LoginIframe= Selector('#iframeTabLoginOld')
        this.usuarioTxt = Selector('#txtUsuario')
        this.organizacionTxt = Selector('#txtOrganizacion')
        this.passwordTxt = Selector('#txtClave')
        this.ingresarBtn = Selector('#btnIngresar')
    }

}
export default new SCMLoginPage();

export async function login(SCMLoginPage, user, org, pass, ceGestion){
    let enviroment = process.env.ENV;
    //await t.click(Selector("button.popup-cerrar"))
    await t.maximizeWindow()
    if( enviroment == "prod") {
        await t.click(SCMLoginPage.accesoClientesBtn)
    }
    await t        
        .switchToIframe(SCMLoginPage.LoginIframe)
        .typeText(SCMLoginPage.usuarioTxt, user)
        .typeText(SCMLoginPage.organizacionTxt, org)
        .typeText(SCMLoginPage.passwordTxt, pass)
        .click(SCMLoginPage.ingresarBtn)
        .switchToMainWindow()            
        //cambiar centro de gestion
        .click(SCMHomePage.centroGestionIcons)
    await seleccionarCentroGestion(SCMSeleccionarCentroGestionPage, ceGestion)
    await t.switchToMainWindow()
    let centroGestion = await SCMHomePage.getCentroGestionLabel().textContent
    await t.expect(centroGestion).contains(ceGestion)
}

