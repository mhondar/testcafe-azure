import { Selector,t } from "testcafe";

class SCMHistoricoDeOrdenCompraPage{
    constructor(){
        this.titlePage = Selector('.titulopagina2')
        this.grillaEstado = Selector('#tblHistorico > tbody > tr:nth-child(1) > td')
    }
}

export default new SCMHistoricoDeOrdenCompraPage();


