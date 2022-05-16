import { Selector,t } from "testcafe";

class SCMBuscarSubcontratoPage{
    constructor(){
        this.buscarSubcontratoTitle = Selector('.fondotituloarea')
        this.numeroSubcontratoInput = Selector('#txtNumSC')
        this.buscarBtn = Selector('#btnBuscar')
    }

    getNumeroSubcontrato(){
        return Selector('#tblSubcontratos > tbody > tr.fila1 > td:nth-child(3)')
    }

    getEstado(){
        return Selector('#tblSubcontratos > tbody > tr.fila1 > td:nth-child(16)')
    }
}

export default new SCMBuscarSubcontratoPage();

export async function buscarSubcontratoPorNuemro(SCMBuscarSubcontratoPage, numero, estado){
    await t
        .expect(SCMBuscarSubcontratoPage.buscarSubcontratoTitle.visible).ok("No se visualiza la página de Buscar Subcontrato")
        .typeText(SCMBuscarSubcontratoPage.numeroSubcontratoInput, numero)
        .click(SCMBuscarSubcontratoPage.buscarBtn)
    let numeroSub = await SCMBuscarSubcontratoPage.getNumeroSubcontrato().textContent
    let estadoSub = await SCMBuscarSubcontratoPage.getEstado().textContent
    await t
        .expect(numeroSub.trim()).eql(numero, "No coincide le número de Subcontrato")
        .expect(estadoSub.trim()).eql(estado, "No coincide el estado del Subcontrato")
}