import { Selector} from "testcafe";

class MKPTerminosCondicionesPage {
    constructor(){
        this.terminosCondicionesTitle = Selector("h1").withText("Términos y condiciones")
    }



}
export default new MKPTerminosCondicionesPage();
