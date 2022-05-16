import { Selector,t } from "testcafe";

class MKPFichaEmpresaPage {
    constructor(){
        this.constructoraLabel = Selector('td').child("h4").child("a")

    }
}
export default new MKPFichaEmpresaPage();

