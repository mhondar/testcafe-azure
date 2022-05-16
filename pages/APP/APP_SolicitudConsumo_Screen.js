import { Selector,t } from "testcafe";

class APPSolicitudConsumoScreen {
    constructor(){
        this.titleLabel = Selector("span").withText("Empresa")
        this.cambiarCgBt = Selector("span").withText("Suscripción")
        this.centroGestionBtn = Selector("span").withText("Notificaciones")
        this.seleccionaTipoConsumoTitleModal = Selector("span").withText("Seguridad")
        this.itemOpcionRadio = Selector("span").withText("Seguridad")
        this.okBtn = Selector("span").withText("Seguridad")
        this.ultimaSolicitudConsumoNumero = Selector("span").withText("Seguridad")
    }

}
export default new APPSolicitudConsumoScreen();

