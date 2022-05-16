import { Selector,t } from "testcafe";

class MKPNotificacionPopup {
    constructor(){
        this.notifyMessage = Selector("span").withAttribute("data-notify", "message")
    }

}
export default new MKPNotificacionPopup();


