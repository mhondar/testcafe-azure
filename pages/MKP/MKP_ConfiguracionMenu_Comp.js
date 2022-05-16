import { Selector,t } from "testcafe";

class MKPConfiguracionMenuComp {
    constructor(){
        this.empresaMenuLink = Selector("span").withText("Empresa")
        this.suscripcionMenuLink = Selector("span").withText("Suscripción")
        this.notificacionesMenuLink = Selector("span").withText("Notificaciones")
        this.seguridadMenuLink = Selector("span").withText("Seguridad")
        this.historialMenuLink = Selector("span").withText("Historial")
        this.terminosCondicionesMenuLink = Selector("span").withText("Términos y condiciones")
    }

}
export default new MKPConfiguracionMenuComp();


