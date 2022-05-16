import { Selector,t } from "testcafe";

class APPAgregarItemScreen {
    constructor(){
        this.titleLabel = Selector("span").withText("Empresa")
        this.bucarItemText = Selector("span").withText("Suscripción")
        this.item = Selector("span").withText("Notificaciones")
        this.getProducto = Selector("span").withText("Seguridad")
        this.getBodegaLabel = Selector("span").withText("Seguridad")
    }

}
export default new APPAgregarItemScreen();

