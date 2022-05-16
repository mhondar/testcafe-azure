import { Selector,t } from "testcafe";

class SCMAnularRecepcionPage{
    constructor(){
        this.titleLabel = Selector('#Header1')
        this.numeroInput = Selector('#txtNumDoc') 
        this.buscarBtn = Selector('#btnBuscar')
        this.anularRecepcionImg = Selector('img').withAttribute('src', '../images/ic_cancelar.gif')
    }

    getNumeroOrdenCompra(){
        return Selector('#tblListado > tbody > tr:nth-child(2) > td:nth-child(1)')
    }
}

export default new SCMAnularRecepcionPage();

export async function anularRecepcion(SCMAnularRecepcionPage, numeroRecepcion){
    await t
        .expect(SCMAnularRecepcionPage.titleLabel.visible).ok("No se visualiza la página de Anular Recepción")
        .typeText(SCMAnularRecepcionPage.numeroInput, numeroRecepcion)
        .click(SCMAnularRecepcionPage.buscarBtn)
        .setNativeDialogHandler(() => true)
        .click(SCMAnularRecepcionPage.anularRecepcionImg)
}