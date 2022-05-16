import { Selector,t } from "testcafe";

class APPAprobacionesScreen {
    constructor(){
        this.titleLabel = Selector("span").withText("Empresa")
        this.ordenesCompraTab = Selector("span").withText("Suscripción")
        this.documento = Selector("span").withText("Notificaciones")
        this.irAtrasBtn = Selector("span").withText("Seguridad")
    }

}
export default new APPAprobacionesScreen();

