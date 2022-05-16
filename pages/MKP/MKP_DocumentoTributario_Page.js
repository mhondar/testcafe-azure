import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"
import Util from "../../helpers/utils"
class MKPDocumentoTributarioPage {
    constructor(){
        this.docTributarioIFrame = Selector('#frame')
        this.titleDocumento = Selector('h2')
        this.documentosTab = Selector('#TabDte')
        this.limpiarBtn = Selector('#btnLimpiar')
        this.filtrosRapidosSelect = Selector("button").withAttribute("data-id", "dropFiltrosRapidos")
        this.buscarBtn = Selector("#btnBuscar")
        this.fechaEmisionInput = Selector("#drpFechaEmision")
        this.resultList = Selector("tr.btop")
        this.detalleDocumentoTitle = Selector("div#modalGeneral").find("h4")
        this.infoConciliacionTabPage = Selector("div.panel-heading").withText("Información de conciliación")
        this.documentoIframe = Selector("#frame")
        this.pagoTab = Selector("div#modalGeneral").find("a").withText("Pago")
        this.pagoTabTitle = Selector("span").withText("Pagos")
        this.historialTab = Selector("div#modalGeneral").find("a").withText("Historial")
        this.historialCont = Selector("div#historial")
        this.descargarExcelBtn = Selector("a#btnToExcel")
    }

    getRazonSocial(empresa) {
        //button[@data-id="sltEmpresas" and @title="NELSON ANDRES LORCA GONZALEZ"]
        return Selector("button").withAttribute("data-id", "sltEmpresas").withAttribute("title",empresa)
    }

    getFiltroRapidoOption(filtro) {
        //button[@data-id="dropFiltrosRapidos"]/following-sibling::div//span[text()="Documentos Cedidos"]
        return Selector("button").withAttribute("data-id","dropFiltrosRapidos").nextSibling("div").find("span").withText(filtro)
    }

    getFechaEmisionRow(row) {
         //tbody[3]//tr[@class="btop"]//small[contains(text(), "Fecha Emisión")]
         return Selector("tbody").nth(row).find("tr.btop").find("small").withText("Fecha Emisión")
    }

    getDocumentoRow(row) {
        //tbody[3]//tr[@class="btop"]//a
        return Selector("tbody").nth(row).find("tr.btop").find("a")
    }

    getTitleDocumentoRow(row) {
        //tbody[3]//tr[@class="btop"]//a
        return Selector("tbody").nth(row).find("tr.btop").find("a").child("strong")
    }


}
export default new MKPDocumentoTributarioPage();

export async function validarPaginaDocumentoTributarioPresente(MKPDocumentoTributarioPage) {
    await t
        .switchToIframe(MKPDocumentoTributarioPage.docTributarioIFrame)
        .expect(MKPDocumentoTributarioPage.titleDocumento.visible).ok("Pagina de Documento Tributario No Visible")
    let title = await MKPDocumentoTributarioPage.titleDocumento.textContent;
    await t.expect(title).eql("Documentos Tributarios")
 }

 export async function buscarPorFiltroRapido(MKPDocumentoTributarioPage, filtro) {
    await t    
        .click(MKPDocumentoTributarioPage.limpiarBtn)
        .click(MKPDocumentoTributarioPage.filtrosRapidosSelect)
        .click(MKPDocumentoTributarioPage.getFiltroRapidoOption(filtro))
        .click(MKPDocumentoTributarioPage.buscarBtn)
 }

 export async function buscarValidarPorFechaEmision(MKPDocumentoTributarioPage, fechaInicial, fechaFinal) {
    let texto = fechaInicial + " hasta " + fechaFinal
    await t.click(MKPDocumentoTributarioPage.limpiarBtn)
    await t.wait(2000)
    await clearTextInput(MKPDocumentoTributarioPage.fechaEmisionInput, texto)
    await t.click(MKPDocumentoTributarioPage.buscarBtn)
    let cant = await MKPDocumentoTributarioPage.resultList.count 
    await t.expect(cant).gte(1, "No se arrojaron resultados de búsqueda")
    for(let i=0; i<cant; i++) {
        let fechaEmision = await MKPDocumentoTributarioPage.getFechaEmisionRow(i).textContent
        let fechaLimpia = fechaEmision.substring(15,25).replace("-","/").replace("-","/")
        let result = Util.dateCheck(fechaInicial,fechaFinal,fechaLimpia)
        await t.expect(result).ok("El resultado de búsqueda de la fila " + i + "posee una fecha de emisión ")
    }
 }

 export async function clickValidarDocumentoRandom(MKPDocumentoTributarioPage) {
    let cant = await MKPDocumentoTributarioPage.resultList.count 
    let random = await Util.between(1,cant)
    let title = await MKPDocumentoTributarioPage.getTitleDocumentoRow(random).textContent
    await t.click(MKPDocumentoTributarioPage.getDocumentoRow(random))
    let titleDetallePage = await MKPDocumentoTributarioPage.detalleDocumentoTitle.textContent
    await t.click(MKPDocumentoTributarioPage.detalleDocumentoTitle)
    await t.expect(title.replace(" »","")).eql(titleDetallePage, "El título en la página de detalles no coincide con el documento seleccionado")
 }

