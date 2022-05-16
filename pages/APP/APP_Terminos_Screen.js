import { Selector,t } from "testcafe";

class APPTerminosScreen {
    constructor(){
        //ion-card-title[text()="Términos y Condiciones"]
        this.titleLabel = Selector("ion-card-title").withText("Términos y Condiciones")
        this.aceptarButton = Selector("ion-button").withText("ACEPTAR")
    }

}
export default new APPTerminosScreen();

export async function validarAceptarTerminosCondiciones(APPTerminosScreen) {
    await t
        .expect(APPTerminosScreen.titleLabel.visible).ok("No se muestra la pagina de Términos y Condiciones")
        .click(APPTerminosScreen.aceptarButton)
}