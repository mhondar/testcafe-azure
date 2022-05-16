import { Selector,t } from "testcafe";

class APPSolicitudesScreen {
    constructor(){
        this.titleLabel = Selector("span").withText("Empresa")
        this.mensageConfirmacion = Selector("span").withText("Suscripción")
        this.irAlInicioBtn = Selector("span").withText("Notificaciones")
        this.numeroSolicitud = Selector("span").withText("Seguridad")
    }

}
export default new APPSolicitudesScreen();

