import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"
import utils from "../../helpers/utils";

class SCMSolicitarNotaCorreccionPage{
    constructor(){
        this.titleLabel = Selector('#ctrMontoFactura_hAsociacionDocumentos')
        this.tipoDocumentoDrp = Selector('#lstTipoDocumento')
        this.montoNetoInput = Selector('#txtMontoCorreccion')
        this.motivoInput = Selector('textarea#txtMotivoCorreccion')
        this.enviarProveedorBtn = Selector('input#btnVerificaGrabaCorreccion')
        this.solicitudCorreccionGrilla = Selector('#tblCorrecciones > tbody > tr:nth-child(2)') 
        this.volverBtn = Selector('a#btnVolver')
    }

    getSubTotalFactura(){
        return Selector('#ctrMontoFactura_lblSubTotalDetalle')
    }

    getTotalAsociado(){
        return Selector('#ctrMontoFactura_lblTotAsociado')
    }

    getSaldoPorAsociar(){
        return Selector('#ctrMontoFactura_lblSaldoXAsociar')
    }

    getTipoDocumento(tipo){
        return Selector('option').withText(tipo)
    }
}

export default new SCMSolicitarNotaCorreccionPage();

export async function seleccionarTipoDocumento(SCMSolicitarNotaCorreccionPage, tipo){
    let subTotalFactura = await SCMSolicitarNotaCorreccionPage.getSubTotalFactura().textContent
    let totalAsociado = await SCMSolicitarNotaCorreccionPage.getTotalAsociado().textContent
    let saldoPorAsociar = await SCMSolicitarNotaCorreccionPage.getSaldoPorAsociar().textContent
    let valor = utils.convertDecimal(saldoPorAsociar)
    let num = "10"
    let saldo = valor - num
    let montoNeto = saldo.toString().replace(".", ",")
    let subTotal = subTotalFactura.replace(".", "")
    if(parseInt(subTotal) > parseInt(totalAsociado)){
        //se realiza Nota de Credito
        await t
            .click(SCMSolicitarNotaCorreccionPage.tipoDocumentoDrp)
            .click(SCMSolicitarNotaCorreccionPage.getTipoDocumento(tipo))
        await clearTextInput(SCMSolicitarNotaCorreccionPage.montoNetoInput, montoNeto.toString())    
        await t
            .typeText(SCMSolicitarNotaCorreccionPage.motivoInput, "Prueba Automatizada QA")
            .click(SCMSolicitarNotaCorreccionPage.enviarProveedorBtn)
            .expect(SCMSolicitarNotaCorreccionPage.solicitudCorreccionGrilla.visible).ok("No se añadió la solicitud en la grilla de Solicitud de Notas de Corrección")
    }
    else{
        throw new Error("No se ha automatizado la opcion de nota de debito")
    }

}