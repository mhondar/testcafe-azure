import { Selector,t } from "testcafe";

class APPGenerandoSolicitudScreen {
    constructor(){
        this.titleLabel = Selector("span").withText("Empresa")
        this.personaRetiraText = Selector("span").withText("Suscripción")
        this.preseleccionarDestinoSelect = Selector("span").withText("Notificaciones")
        this.preseleccionarDestinoTitlePopup = Selector("span").withText("Seguridad")
        this.destinoARadio = Selector("span").withText("Seguridad")

        this.okBtn = Selector("span").withText("Empresa")
        this.agregarItemBtn = Selector("span").withText("Suscripción")
        this.enviarBtn = Selector("span").withText("Notificaciones")
        this.preseleccionarDestinoTitlePopup = Selector("span").withText("Seguridad")
        this.getDestinoOption = Selector("span").withText("Seguridad")
    }

}
export default new APPGenerandoSolicitudScreen();

