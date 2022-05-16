import { Selector, t} from "testcafe";

class SCMInformacionSubcontratoPage{
    constructor(){
        this.titleInformacionSubcontrato = Selector('#CtrSubcontrato_lblTitulo')
        this.comentariosInput = Selector('#CtrSubcontrato_txtComentarios')
        this.enviarBtn = Selector('a#btnEnviar')
    }
}

export default new SCMInformacionSubcontratoPage();

export async function enviarComentarios(SCMInformacionSubcontratoPage){
    await t
        .expect(SCMInformacionSubcontratoPage.titleInformacionSubcontrato.visible).ok("No se visualiza la página de Información del Subcontrato")
        .typeText(SCMInformacionSubcontratoPage.comentariosInput, "Subcontrato QA prueba Automatizada")
        .setNativeDialogHandler(() => true)
        .click(SCMInformacionSubcontratoPage.enviarBtn)
}
