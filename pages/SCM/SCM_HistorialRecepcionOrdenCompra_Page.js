import { Selector,t } from "testcafe";

class SCMHistorialRecepcionOrdenCompraPage{
    constructor(){
        this.titlePage = Selector('#lblTitulo')
        this.historialBtn = Selector('#lnkHistorial')

    }

    getNumeroOC(){
        return Selector('#lblNumOC')
    }
}

export default new SCMHistorialRecepcionOrdenCompraPage();


