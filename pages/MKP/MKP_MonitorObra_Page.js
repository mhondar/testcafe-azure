import { Selector,t } from "testcafe";

class MKPMonitorObraPage {
    constructor(){
        this.monitorObraIFrame = Selector('#frame')
        this.monitorObraLabel = Selector('h2').withText("Monitor de Obras")
        this.verTodasRubrosLink = Selector("strong").withText("Rubros de obras").parent("h3").parent("div").parent("div").find("a").withText("Ver todas")
    }
  
}
export default new MKPMonitorObraPage();
