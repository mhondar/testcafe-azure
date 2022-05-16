import { Selector,t } from "testcafe";

class MKPMenuComp {
    constructor(){
        this.menuCotizaciones = Selector('#CZ')
        this.menuOrdenesCompra = Selector('a').withText("Órdenes de Compra")
        this.menuMonitorObra = Selector('a').withText("Monitor de Obra")
        this.menuSubcontratos = Selector('a').withText("Subcontratos")
        this.menuDespachos = Selector('a').withText("Despachos")
        this.menuNegociosAnticipados = Selector('a').withText("Negocios Anticipados")
        this.menuNotasCorreccion = Selector('a').withText("Solicitud Nota Corrección")
        this.menuDocumentoTributario = Selector('a').withText("Documento Tributario")
    }

}
export default new MKPMenuComp();

export async function clickMenu(MKPHeaderComp,MKPMenuComp, menu) {
    await t.click(MKPHeaderComp.menuBtn);
    switch (menu) {
        case "cotizaciones":
            await t.click(MKPMenuComp.menuCotizaciones);
            break;
        case "ordenesCompra":
            await t.click(MKPMenuComp.menuOrdenesCompra);
            break;
        case "monitorObra":
            await t.click(MKPMenuComp.menuMonitorObra);
            break;
        case "subcontratos":
            await t.click(MKPMenuComp.menuSubcontratos);
            break;   
        case "despachos":
            await t.click(MKPMenuComp.menuDespachos);
            break;      
        case "negocios":
            await t.click(MKPMenuComp.menuNegociosAnticipados);
            break;   
        case "notas":
            await t.click(MKPMenuComp.menuNotasCorreccion);
            break; 
        case "documentoTributario":
            await t.click(MKPMenuComp.menuDocumentoTributario);
            break; 
    }
 }