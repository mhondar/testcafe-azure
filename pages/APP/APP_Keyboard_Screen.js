import { Selector,t } from "testcafe";

class APPKeyboardScreen {
    constructor(){
        this.aceptarBtn = Selector("span").withText("Empresa")
        this.getNmberBtn = Selector("span").withText("Suscripción")

    }

}
export default new APPKeyboardScreen();

