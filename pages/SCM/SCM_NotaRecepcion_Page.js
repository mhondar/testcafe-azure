import { Selector,t } from "testcafe";

class SCMNotaRecepcionPage{
    constructor(){
        this.titleLabel = Selector('.titulopagina2')
        this.comentarioInput = Selector('#txtComentarios')
        this.abrirDocumentoBtn = Selector('#btnAbrir')
        this.volverBtn = Selector('#btnVolver')
    }
}

export default new SCMNotaRecepcionPage();

export async function agregarComentario(SCMNotaRecepcionPage, comentarioGuia){
    await t
        .expect(SCMNotaRecepcionPage.titleLabel.visible).ok("No se visualiza la página de Nota de Recepción")
        .typeText(SCMNotaRecepcionPage.comentarioInput, comentarioGuia)
        .setNativeDialogHandler(() => true)
        .click(SCMNotaRecepcionPage.abrirDocumentoBtn)
}