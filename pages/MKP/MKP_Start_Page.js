import { Selector,t } from "testcafe";

class MKPStartPage {
    constructor(){
        this.iniciarSesionBtn = Selector('#navbarCollapse > ul > li:nth-child(8) > a')
    }

}
export default new MKPStartPage();