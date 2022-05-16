import { Selector,t } from "testcafe";

class SCMEdicionLineasSubcontratoPage{
    constructor(){
        this.titleEdicionLineasSubcontrato = Selector('.titulopagina2')
        this.guardarBtn = Selector('#btnGrabar')
        this.volverBtn = Selector('#lnkVolver')
    }
}

export default new SCMEdicionLineasSubcontratoPage();

