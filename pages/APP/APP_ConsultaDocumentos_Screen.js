import { Selector,t } from "testcafe";

class APPConsultaDocumentosScreen {
    constructor(){
        this.titleConsultaDocLabel = Selector("span").withText("Empresa")
    }

}
export default new APPConsultaDocumentosScreen();

