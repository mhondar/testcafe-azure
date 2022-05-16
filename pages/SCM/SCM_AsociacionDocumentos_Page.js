import { Selector,t } from "testcafe";
import utils from "../../helpers/utils";

class SCMAsociacionDocumentosPage{
    constructor(){
        this.asociacionDocTab = Selector('td').withText('Asociación de documentos')
        this.asociarBtn = Selector('#btnAsociar')
        this.documentosAsociadosTab = Selector('td').withText('Documentos Asociados')
        this.aceptarBtn = Selector('#btnAceptar')
    }

    getSubtotalFactuta(){
        return Selector('#lblSubtotalFactura')
    }

    getTipoDocumento(num){
        return Selector('#tblRegistros > tbody > tr:nth-child(' + num + ') > td:nth-child(2)')
    }

    getCheck(num){
        return Selector('#tblRegistros > tbody > tr:nth-child(' + num + ') > td:nth-child(8) > input')
    }

    getCantDocumentoGrilla(){
        return Selector('#tblRegistros > tbody > tr')
    }

    getTotalAsociado(){
        return Selector('#ctrMontoFactura_lblTotAsociado')
    }

    getSaldoPorAsociar(){
        return Selector('#ctrMontoFactura_lblSaldoXAsociar')
    }

    getDocTransporteAsociado(){
        return Selector('#tblCorrecciones > tbody > tr')
    }

    getMontoDocumento(num){
        return Selector('#tblRegistros > tbody > tr:nth-child(' + num + ') > td:nth-child(6)')
    }

    getMonedaDocumento(num){
        return Selector('#tblRegistros > tbody > tr:nth-child('+num+') > td:nth-child(7)')
    }
}

export default new SCMAsociacionDocumentosPage();

export async function seleccionarDocumento(SCMAsociacionDocumentosPage, totalNetoValor){
    await t
        .expect(SCMAsociacionDocumentosPage.asociacionDocTab.visible).ok("No se visualiza el tab Asociacion de Documentos")
        .click(SCMAsociacionDocumentosPage.asociacionDocTab)
    let cant = await SCMAsociacionDocumentosPage.getCantDocumentoGrilla().count
    for (let i = 3; i <= cant; i++) {
        let tipoDoc = await SCMAsociacionDocumentosPage.getTipoDocumento(i).textContent
        let montoDoc = await SCMAsociacionDocumentosPage.getMontoDocumento(i).textContent
        let moneda = await SCMAsociacionDocumentosPage.getMonedaDocumento(i).textContent
        //let monto = utils.convertDecimal(montoDoc)
        let montoValor = montoDoc.replace("$", "")
        let montoPeso = montoValor.toString().replace(".", "")
        let montoPesoDoc = montoPeso.toString().split(",")
        if(tipoDoc.trim() == "Guía" && totalNetoValor >= parseInt(montoPesoDoc[0]) && moneda.trim() == "$"){
            await t.click(SCMAsociacionDocumentosPage.getCheck(i))
               break;
        }  
    }
}

export async function validarDcocumentoRecepcion(SCMAsociacionDocumentosPage){
    let count = await SCMAsociacionDocumentosPage.getDocTransporteAsociado().count
    await t.expect(count).eql(3)
}



