import { Selector } from "testcafe";

class MKPSuscripcionPopup {
    constructor(){
        this.popupNo = Selector('#onesignal-slidedown-cancel-button')
    }

}
export default new MKPSuscripcionPopup();