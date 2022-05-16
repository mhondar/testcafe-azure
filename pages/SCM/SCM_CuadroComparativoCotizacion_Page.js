import { Selector,t } from "testcafe";

class SCMCuadroComparativoCotizacionPage{
    constructor(){
        this.titleLabel = Selector('#lblTitulo').withText("Cuadro comparativo cotización N°")
        this.addToChartList = Selector("table#tblLineas").find("tr").child("td.EstiloComentario").find("span.icon")
        this.comprarBtn = Selector("#iralcarro")
    }

    getAddToChartButtonByIndex(index) {
        return Selector("table#tblLineas").find("tr").nth(index).child("td.EstiloComentario").find("span.icon")
    }

    getChekStatusAddToChart(index) {
        return Selector("table#tblLineas").find("tr").nth(index).child("td.EstiloComentario").find("span.wrapper.active").find("span.icon")
    }

}

export default new SCMCuadroComparativoCotizacionPage();

export async function agregarProductosAlCarro(SCMCuadroComparativoCotizacionPage){
    let cant = await SCMCuadroComparativoCotizacionPage.addToChartList.count
    for(let i=0; i<cant; i++) {
            await t.click(SCMCuadroComparativoCotizacionPage.getAddToChartButtonByIndex(i+2)) 
    }
    await t.click(SCMCuadroComparativoCotizacionPage.comprarBtn)
}