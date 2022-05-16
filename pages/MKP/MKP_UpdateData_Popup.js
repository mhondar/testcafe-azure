import { Selector, t} from "testcafe";

class MKPUpdateDataPopup {
    constructor(){
        this.cancelarButton = Selector('a').withText("Cancelar")
        this.cerrarButton = Selector('#leadinModal-3161606 > div.leadinModal-content > button')
    }

}
export default new MKPUpdateDataPopup();

//validar si aparece el popUp cerrarlo
export async function isVisiblePopUp(MKPUpdateDataPopup) {
    try {
        await t.click(MKPUpdateDataPopup.cancelarButton)
      } catch (e) {
        //   console.log("No se visualiza el Pop Up")
      }
  
 }

 export async function isVisiblePopUpcapacitaciones(MKPUpdateDataPopup){
   try{
     await t.click(MKPUpdateDataPopup.cerrarButton)
    } catch (e) {
      //   console.log("No se visualiza el Pop Up")
    }
 }

