import { Selector,t } from "testcafe";

class APPLoginScreen {
    constructor(){
        this.ingresarButton = Selector("ion-button")
        this.iniciarSesionLabel = Selector('ion-item').withText("Iniciar Sesión")
        //input[@name="usuario"]
        this.nombreUsuarioInput = Selector("input").withAttribute("name", "usuario")
        this.empresaInput = Selector("input").withAttribute("name", "empresa")
        this.claveInput = Selector("input").withAttribute("name", "clave")
        //ion-button[text()="Ingresar"]
        this.aceptarButton = Selector("ion-button").withAttribute("class", /btnIngresar*/)
    }

}
export default new APPLoginScreen();


export async function login(APPLoginScreen, user, org, pass) {
    await t
        .click(APPLoginScreen.ingresarButton)
        .expect(APPLoginScreen.iniciarSesionLabel.visible).ok("No se muestra la pagina de Iniciar Sessión")
        .typeText(APPLoginScreen.nombreUsuarioInput,user)
        .typeText(APPLoginScreen.empresaInput,org)
        .typeText(APPLoginScreen.claveInput,pass)
        .click(APPLoginScreen.aceptarButton)
}