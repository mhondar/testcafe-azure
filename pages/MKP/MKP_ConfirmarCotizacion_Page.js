import { Selector,t } from "testcafe";

class MKPConfirmarCotizacionPage {
    constructor(){
        this.comentariosInput = Selector('label').withText("Añadir comentarios adicionales para el cliente (opcional)").sibling('textarea')
        this.confirmarEnvioBtn = Selector('a').withText("Confirmar envío de oferta")

    }

}
export default new MKPConfirmarCotizacionPage();

export async function confirmarCotizacion(MKPConfirmarCotizacionPage,comentarioOferta) {
    await t
        .typeText(MKPConfirmarCotizacionPage.comentariosInput,comentarioOferta.comentario)
        .click(MKPConfirmarCotizacionPage.confirmarEnvioBtn)
 }