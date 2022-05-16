import { Selector,t } from "testcafe";

class APPBodegaScreen {
    constructor(){
        this.titletitleLabelLabel = Selector("span").withText("Empresa")
        this.solicitudConsumoBtn = Selector("span").withText("Suscripción")
    }

}
export default new APPBodegaScreen();

