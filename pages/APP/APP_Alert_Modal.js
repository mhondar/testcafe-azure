import { Selector,t } from "testcafe";

class APPAlertModal {
    constructor(){
        this.onlyThisTimeButton = Selector("span").withText("Empresa")
    }

}
export default new APPAlertModal();

