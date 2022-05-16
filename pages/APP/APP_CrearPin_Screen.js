import { Selector,t } from "testcafe";

class APPCrearPinScreen {
    constructor(){
        this.crearPinLabel = Selector("ion-title").withText("CREAR PIN")
        this.hechoAlertBtn = Selector('button')
    }

    getNumberBtn(num){
        //ion-button[text()="0"]
        return Selector("ion-button").withText(num)
    }

}
export default new APPCrearPinScreen();

export async function ingresarPin(APPCrearPinScreen, pin, cant) {
    await t.expect(APPCrearPinScreen.crearPinLabel.visible).ok("No se muestra la pagina de Crear Pin")
    for (let j=0; j<cant; j++) {
        for (let i=0; i<pin.length; i++) {
            await t.click(APPCrearPinScreen.getNumberBtn(pin.substr(i,1)))
        }
    }
    await t
        .expect(APPCrearPinScreen.hechoAlertBtn.visible).ok("No se muestra PopUp de Pin Creado")
        .click(APPCrearPinScreen.hechoAlertBtn)
}
