import { Selector} from "testcafe";

class MKPNotificacionesPage {
    constructor(){
        this.notificacionesTitle = Selector("strong").withText("Notificaciones")
    }



}
export default new MKPNotificacionesPage();
