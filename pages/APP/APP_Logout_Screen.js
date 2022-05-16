import { Selector,t } from "testcafe";

class APPLogoutScreen {
    constructor(){
        //ion-button[@color="success"]
        this.cerrarSessionBtn = Selector("ion-button").withAttribute("color","success")      
    }

}
export default new APPLogoutScreen();

export async function cerrarSession(APPLogoutScreen) {
    await t
        .expect(APPLogoutScreen.cerrarSessionBtn.visible).ok("No se muesta pagina de cerrar session")
        .click(APPLogoutScreen.cerrarSessionBtn)
}

