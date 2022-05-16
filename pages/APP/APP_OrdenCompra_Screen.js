import { Selector,t } from "testcafe";

class APPOrdenCompraScreen {
    constructor(){
        this.titleOCLabel = Selector("span").withText("Empresa")
        this.aprobarBtn = Selector("span").withText("Suscripción")
        this.mensajeAprobacionText = Selector("span").withText("Notificaciones")
        this.confirmarBtn = Selector("span").withText("Seguridad")
        this.ocAprobadaPopup = Selector("span").withText("Seguridad")
        this.continuarBtnPopup = Selector("span").withText("Seguridad")
    }

}
export default new APPOrdenCompraScreen();

