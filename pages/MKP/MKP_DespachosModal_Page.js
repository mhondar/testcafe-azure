import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";
import { clearTextInput } from "../../helpers/shortcuts"
import MKPDespachosPage, { clickLinkDocumentoTransporte } from "../../pages/MKP/MKP_Despachos_Page"

class MKPDespachosModalPage{
    constructor(){
        this.nombreGuiaDespachoLabel = Selector('span#spTipoDocumento1')
        this.detalleRecepcionLabel = Selector('#HeaderResult').child('div').nth(2).child('h3')
        this.NC09Link = Selector('a#btnImprimir2')
        //Pestaña Items
        this.verMotivo = Selector('a').withAttribute('data-container', '#slidedetalle')
        //Pestaña Comentarios
        this.pestannaComentariosLink = Selector('a').withText('Comentarios')
        this.comentariosInput = Selector('#txtComentario')
        this.agregarBtn = Selector('#btnAgregarComentario')
    }

    getnombreGuiaDespachoLabel(){
        return Selector('span#spTipoDocumento1')
    }

    getnumeroGuiaDespachoLabel(){
        return Selector('span#spNumeroDocumento1')
    }

    getComentarioAgregado(){
        return Selector('#ComentarioResult').child('div').child('span')
    }
}

export default new MKPDespachosModalPage();

export async function concatenarNombreYNumeroGuia(MKPDespachosModalPage){
    await t.expect(MKPDespachosModalPage.nombreGuiaDespachoLabel.visible).ok("Modal de detalle Guia de Despacho no visible")
    let resultNombre = await MKPDespachosModalPage.getnombreGuiaDespachoLabel().textContent
    let resultNumero = await MKPDespachosModalPage.getnumeroGuiaDespachoLabel().textContent
    let result = resultNombre + " " + resultNumero 
    return result;
}

export async function validarModalDespacho(MKPDespachosModalPage, MKPDespachosPage){
    let nombreGuiaDespacho = await clickLinkDocumentoTransporte(MKPDespachosPage)
    let resultNombre = await concatenarNombreYNumeroGuia(MKPDespachosModalPage)
    await t.expect(nombreGuiaDespacho).eql(resultNombre)
}