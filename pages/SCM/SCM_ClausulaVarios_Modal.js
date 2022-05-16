import { Selector,t } from "testcafe";

class SCMClausulaVariosModal{
    constructor(){
        this.clausulaVariosTitle = Selector('.titulopagina2')
        this.clausulaInput = Selector('#txtClausula')
        this.guardarBtn = Selector('#lnkGuardar')
    }
}

export default new SCMClausulaVariosModal();

export async function ingresarClausula(SCMClausulaVariosModal, clausulaData){
    await t
        .switchToMainWindow()
        .expect(SCMClausulaVariosModal.clausulaVariosTitle.visible).ok("No se visualiza el modal de Clausula Varios")
        .typeText(SCMClausulaVariosModal.clausulaInput, clausulaData)
        .click(SCMClausulaVariosModal.guardarBtn)
}