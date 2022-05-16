import { Selector,t } from "testcafe";

class SCMControlDocumentoYNotaCorrecion{
    constructor(){
        this.controlFacturaTab = Selector('td').withText('Control de Facturas')
        this.numeroFacturaInput = Selector('#txtNumFactura')
        this.buscarBtn = Selector('#btnBuscar')
    }

    getNumeroDocumentoGrilla(){
        return Selector('#tblFacturas > tbody > tr:nth-child(2) > td:nth-child(1)')
    }
}

export default new SCMControlDocumentoYNotaCorrecion();

export async function buscarDocumentoPorNumero(SCMControlDocumentoYNotaCorrecion, numero){
    await t 
        .click(SCMControlDocumentoYNotaCorrecion.controlFacturaTab)
        .typeText(SCMControlDocumentoYNotaCorrecion.numeroFacturaInput, numero)
        .click(SCMControlDocumentoYNotaCorrecion.buscarBtn)
    let num = await SCMControlDocumentoYNotaCorrecion.getNumeroDocumentoGrilla().textContent 
    await t.expect(numero).eql(num.trim())   

}