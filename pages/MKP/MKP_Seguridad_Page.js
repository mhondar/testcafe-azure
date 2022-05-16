import { Selector} from "testcafe";

class MKPSeguridadPage {
    constructor(){
        this.seguridadTitle = Selector("strong").withText("Seguridad de dominio")
    }



}
export default new MKPSeguridadPage();
