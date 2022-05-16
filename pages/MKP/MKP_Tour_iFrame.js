import { Selector,t } from "testcafe";

class MKPTourIFrame {
    constructor(){
        this.tourIFrame = Selector('#frame')
        this.tourCloseBtn = Selector('span').withText("×")
    }

}
export default new MKPTourIFrame();

export async function closeTour(MKPTourIFrame) {
    await t
        .switchToIframe(MKPTourIFrame.tourIFrame)
        .click(MKPTourIFrame.tourCloseBtn)
        .switchToMainWindow()     
 }