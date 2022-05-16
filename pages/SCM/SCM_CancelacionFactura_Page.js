import { Selector,t } from "testcafe";

class SCMCancelacionFacturaPage{
    constructor(){
        this.titleLabel = Selector('#tituloCancelar')
        this.comentarioInput = Selector('#txtMotivoCancela')
        this.cancelarBtn = Selector('#btnCancelar')
    }
}

export default new SCMCancelacionFacturaPage();

export async function agregarMotivoCancelacion(SCMCancelacionFacturaPage, comentario){
    await t
        .expect(SCMCancelacionFacturaPage.titleLabel.visible).ok("No se visualiza la página de Cancelación de factura")
        .typeText(SCMCancelacionFacturaPage.comentarioInput, comentario)
        .click(SCMCancelacionFacturaPage.cancelarBtn)
    }