import { Selector,t } from "testcafe";

class APPMainScreen {
    constructor(){
        this.validarMainTitle = Selector("ion-card-title")
        this.menuBtn = Selector('ion-button').withAttribute("color", "light")
        this.aprobacionesMenu = Selector("span").withText("Empresa")
        this.bodegaMenu = Selector("span").withText("Suscripción")
        this.consultaDocumentosMenu = Selector("span").withText("Notificaciones")
        
    }

}
export default new APPMainScreen();

export async function validarMensajeBienvenida(APPMainScreen, user, empresa) {
    let mensajeObtenido = await APPMainScreen.validarMainTitle.textContent
    let mensajeEsperado = "Bienvenido" + user + empresa
    await t.expect(mensajeObtenido).eql(mensajeEsperado)
}

export async function logout(APPMainScreen) {
    await t.click(APPMainScreen.menuBtn)
    // await t.expect(mensajeObtenido).eql(mensajeEsperado)
}
