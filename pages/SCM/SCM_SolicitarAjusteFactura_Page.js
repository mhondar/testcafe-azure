import { Selector,t } from "testcafe";

class SCMSolicitarAjusteFactura{
    constructor(){
        this.titleLabel = Selector('#ctrMontoFactura_hAsociacionDocumentos')
        this.motivoInput = Selector('#txtMotivo')
        this.saldoPorAsociar = Selector('#ctrMontoFactura_lblSaldoXAsociar')
        this.motivoInput = Selector('#txtMotivo')
        this.guardarBtn = Selector('#btnGuardarAjuste')
        this.checkVerdeLabel = Selector('#ctrMontoFactura_imgSaldoXAsociar')
        this.volverBtn = Selector('#btnVolver')
    }
    
    getSaldoPorAsociar(){
        return Selector('#ctrMontoFactura_lblSaldoXAsociar')
    } 
}
export default new SCMSolicitarAjusteFactura();

export async function validarSaldoPorAsociarEnFactura(SCMSolicitarAjusteFactura, valorPorAsociar){
        let saldo = await SCMSolicitarAjusteFactura.getSaldoPorAsociar().textContent
        await t.expect(saldo).eql(valorPorAsociar)
}

