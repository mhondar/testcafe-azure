import { Selector,t } from "testcafe";

class MKPOrdenesCompraPage {
    constructor(){
        this.ordenesCompraIFrame = Selector('#frame')
        this.descargarExcelLink = Selector('#btnExportarExcel')
        this.limpiarBtn = Selector('#btnLimpiar')
        //button[@data-id="EstadoOC"]//div[@class="filter-option-inner-inner"]
        this.estadoCombo = Selector("button").withAttribute("data-id", "EstadoOC")
        this.noOrdenCompraInput = Selector("#tfNumeroOC")
        this.buscarBtn = Selector("#btnBuscar") 
    }

    getEstadoOption(opcion) {
        return Selector("option").withText(opcion)
    }

    getOrdenCompraSelector(id){
        return Selector("#lnkDetalle").withExactText(id)
    }
  
}
export default new MKPOrdenesCompraPage();

export async function buscarOrdenCompra(MKPOrdenesCompraPage,estado,ordenCompra) {
    await t
        .switchToIframe(MKPOrdenesCompraPage.ordenesCompraIFrame)
        .click(MKPOrdenesCompraPage.limpiarBtn)
        .click(MKPOrdenesCompraPage.estadoCombo)
        .wait(2000)
        .click(MKPOrdenesCompraPage.getEstadoOption(estado))
        .typeText(MKPOrdenesCompraPage.noOrdenCompraInput, ordenCompra)
        .click(MKPOrdenesCompraPage.buscarBtn)
        .expect(MKPOrdenesCompraPage.getOrdenCompraSelector(ordenCompra).visible).ok()
 }