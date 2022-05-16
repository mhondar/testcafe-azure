import { Selector,t } from "testcafe";

class MKPLoginPage {
    constructor(){
        this.emailInput = Selector('input').withAttribute("name","txtUsername")
        this.passwordInput= Selector('input').withAttribute("name","txtPassword")
        this.iniciarSesionBtn = Selector('button').withText("Iniciar sesión")
        this.popUp = Selector('#popup > div > div > button > b')
    }

}
export default new MKPLoginPage();

export async function login(MKPStartPage,MKPLoginPage, MKPHeaderComp,userMail, pass ) {
    let enviroment = process.env.ENV;
    await t
        .click(MKPStartPage.iniciarSesionBtn)
    //await isVisiblePopUp(MKPLoginPage)    
    await t
        .typeText(MKPLoginPage.emailInput, userMail)
        .typeText(MKPLoginPage.passwordInput, pass)
        .click(MKPLoginPage.iniciarSesionBtn) 
        .expect(MKPHeaderComp.userHello.visible).ok()
 }

 export async function isVisiblePopUp(MKPLoginPage) {
    try {
        await t.click(MKPLoginPage.popUp)
      } catch (e) {
        //   console.log("No se visualiza el Pop Up")
      }
  
}
