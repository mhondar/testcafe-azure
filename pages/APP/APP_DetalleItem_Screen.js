import { Selector,t } from "testcafe";

class APPDetalleItemScreen {
    constructor(){
        this.titleLabel = Selector("span").withText("Empresa")
        this.cantidadText = Selector("span").withText("Suscripción")
        this.destinoSelect = Selector("span").withText("Notificaciones")
        this.destinoTitlePopup = Selector("span").withText("Seguridad")
        this.partidaSelect = Selector("span").withText("Seguridad")
        this.partidaTitlePopup = Selector("span").withText("Empresa")
        this.okBtn = Selector("span").withText("Suscripción")
        this.comentarioText = Selector("span").withText("Notificaciones")
        this.agregarItemBtn = Selector("span").withText("Seguridad")
        this.aceptarPartidaBtn = Selector("span").withText("Seguridad")
        this.getDestinoOption = Selector("span").withText("Seguridad")
        this.getPartidaOption = Selector("span").withText("Seguridad")

    }

}
export default new APPDetalleItemScreen();

