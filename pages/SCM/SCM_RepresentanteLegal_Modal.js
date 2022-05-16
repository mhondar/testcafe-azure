import { Selector,t } from "testcafe";

class SCMRepresentanteLegalModal{
    constructor(){
        this.check = Selector('#tblRegistros > tbody > tr:nth-child(2) > td:nth-child(1) > input')
        this.guardarBtn = Selector('#btnGrabar')
    }

    getNombreRepresentante(){
        return Selector('#tblRegistros > tbody > tr:nth-child(2) > td:nth-child(3)')
    }
}

export default new SCMRepresentanteLegalModal();

export async function seleccionarRepresentante(SCMRepresentanteLegalModal){
    await t
        .click(SCMRepresentanteLegalModal.check)
    let nombre = await SCMRepresentanteLegalModal.getNombreRepresentante().textContent    
    await t.click(SCMRepresentanteLegalModal.guardarBtn)
    return nombre;
}