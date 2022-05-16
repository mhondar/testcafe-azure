import { Selector,t } from "testcafe";

class SCMOfertasCotizacionPage{
    constructor(){
        this.titleLabel = Selector('#lblTitulo').withText("Ofertas Cotización")
        this.selectAllOfertasCheck = Selector("#selectall_Ofertas")
        this.compararBtn = Selector("#btnComparativas")
        this.volverBtn = Selector("#btnVolver")
    }

    getTituloCotizacion() {
        return Selector("span#lblTotuloCotizacion")
    }

}

export default new SCMOfertasCotizacionPage();
