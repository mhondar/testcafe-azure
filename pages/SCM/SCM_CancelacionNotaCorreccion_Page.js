import { Selector,t } from "testcafe";

class SCMCancelacionNotaCorreccionPage{
    constructor(){
        this.titleLabel = Selector('td').withText('Cancelación de nota de Corrección')
        this.motivoInput = Selector('#txtMotivoCancela')
        this.cancelarNotaCorreccionBtn = Selector('#btnCancelar')
    }
}

export default new SCMCancelacionNotaCorreccionPage();

export async function colocarMotivoCancelacion(SCMCancelacionNotaCorreccionPage, motivo){
    await t
        .expect(SCMCancelacionNotaCorreccionPage.titleLabel.visible).ok("No se visualiza la página de cancelación de Nota de Corrección")
        .typeText(SCMCancelacionNotaCorreccionPage.motivoInput, motivo)
        .click(SCMCancelacionNotaCorreccionPage.cancelarNotaCorreccionBtn)
        
}