import { Selector,t } from "testcafe";

class MKPHeaderComp {
    constructor(){
        this.menuBtn = Selector('span.text-menu')
        this.userHello = Selector('#step1')
        this.configuracionBtn = Selector('a').withText('Configuración')
        this.cerrarSessionBtn = Selector('a').withText('Cerrar Sesión')
    }

}
export default new MKPHeaderComp();