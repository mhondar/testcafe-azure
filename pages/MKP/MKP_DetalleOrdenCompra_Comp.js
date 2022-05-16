import { Selector,t } from "testcafe";

class MKPDetalleOrdenCompraComp {
    constructor(){
        this.numeroDocumentoLabel = Selector('#spNumeroDocumento1')
        this.descargarPdfBtn = Selector('#btnImprimirDetalle')
        this.cajaPrecioOcultarBtn = Selector("#iconDetalleOcPrecio")
        this.cajaPrecioVisibleTable = Selector("#collapseDetalleOcPrecio").withAttribute("aria-expanded", "true")
        this.historicoList = Selector("a").withAttribute("class", "small lnkHistorico")
        this.historialTab = Selector("a").withText("Historial")
        this.historyResultTable = Selector("#HistoryResult")
        this.verOCTab = Selector("a").withText("Ver OC")
        this.pdfPrintView = Selector("div#IdViewPDFFile").parent("div").withAttribute("class", "tab-pane active")
    }
  
}
export default new MKPDetalleOrdenCompraComp();

export async function validarInformacionOculta(label,cantClicks) {
    let ocultarButton = Selector("h3").withText(label).child("i")
    let cajaVisible = Selector("h3").withText(label).withAttribute("aria-expanded", "true")
    for(let i=0; i<cantClicks; i++) {
        await t.click(ocultarButton)
    }
    await t.expect(cajaVisible.exists).notOk()
 }

export async function validarInformacionVisible(label,cantClicks) {
    let ocultarButton = Selector("h3").withText(label).child("i")
    let cajaVisible = Selector("h3").withText(label).withAttribute("aria-expanded", "true")
    for(let i=0; i<cantClicks; i++) {
        await t.click(ocultarButton)
    }
    await t.expect(cajaVisible.exists).ok()
}

export async function validarHistoricoLineas(MKPDetalleOrdenCompraComp) {
    let cantidadLineas = await MKPDetalleOrdenCompraComp.historicoList.count;
    await t.expect(cantidadLineas).gte(1)
    for(let i=0; i<cantidadLineas; i++){
        await t
            .click(MKPDetalleOrdenCompraComp.historicoList.nth(i))
            .expect(MKPDetalleOrdenCompraComp.historicoList.nth(i).child("div").withAttribute("class", "popover fade top in").exists).ok();
    }
}

export async function validarHistorialTab(MKPDetalleOrdenCompraComp) {
    await t
        .click(MKPDetalleOrdenCompraComp.historialTab)
        .expect(MKPDetalleOrdenCompraComp.historyResultTable.visible).ok()
}

export async function validarVerOCTab(MKPDetalleOrdenCompraComp) {
    await t
        .click(MKPDetalleOrdenCompraComp.verOCTab)
        .expect(MKPDetalleOrdenCompraComp.pdfPrintView.visible).ok()
 }
