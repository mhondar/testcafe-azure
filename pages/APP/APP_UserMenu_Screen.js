import { Selector,t } from "testcafe";

class APPUserMenuScreen {
    constructor(){
        //ion-label[text()="Cerrar sesión"]
        this.cerrarSessionBtn = Selector("ion-label").withText("Cerrar sesión")
             
    }

}
export default new APPUserMenuScreen();

export async function logout(APPUserMenuScreen) {
    await t
        .expect(APPUserMenuScreen.cerrarSessionBtn.visible).ok("No se muesta el menú de usuario")
        .click(APPUserMenuScreen.cerrarSessionBtn)
}

