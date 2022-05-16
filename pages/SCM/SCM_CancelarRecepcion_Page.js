import { Selector,t } from "testcafe";

class SCMCancelacionRecepcionPage{
    constructor(){
        this.titleLabel = Selector('.titulopagina2')
        this.comentarioInput = Selector('#txtMotivoCancela') 
        this.anularBtn = Selector('#btnCancelar')
    }
}

export default new SCMCancelacionRecepcionPage();

export async function cancelacionRecepcion(SCMCancelacionRecepcionPage, comentario){
    await t
        .expect(SCMCancelacionRecepcionPage.titleLabel.visible).ok("No se visualiza la página de Anular Recepción")
        .typeText(SCMCancelacionRecepcionPage.comentarioInput, comentario)
        .click(SCMCancelacionRecepcionPage.anularBtn)
}