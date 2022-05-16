import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class MKPConsultaObrasPage {
    constructor(){
        this.consultaObrasIFrame = Selector('#frame')
        this.consultaObrasMigaPan = Selector('li').withText("Consulta de Obras")
        this.rubroObraFiltroSelect = Selector("label").withText("Rubro de Obra").sibling("multiselect-object-referencia").find("span").withAttribute("class","filter-option pull-left")
        this.rubrObraFiltroSelectListVisible = Selector("label").withText("Rubro de Obra").sibling("multiselect-object-referencia").find("div").withAttribute("class","dropdown-menu open").child("ul").withAttribute("aria-expanded","true")
        this.regionFiltroSelect = Selector("label").withText("Región").sibling("multiselect-object-referencia").find("span").withAttribute("class","filter-option pull-left")
        this.buscarButton = Selector("a").withText("Buscar")
        this.proyectosList = Selector("div").withAttribute("class","panel panel-default panel-obras").find("div").withAttribute("class","id-class-ubicacion-mobile col-sm-2")
        this.constructoraFiltroSelect = Selector("label").withText("Constructora").sibling("div").find("span").withAttribute("class","filter-option pull-left")
        this.buscarConstructoraInput = Selector("input").withAttribute("aria-label","Search")
        this.limpiarButton = Selector("a").withText("Limpiar")
        this.descargarExcelLink = Selector("a").withAttribute("class","btn btn-link btn-md pull-right btnExcel")
    }

    getRegionSelector(region) {
        return Selector("label").withText("Región").sibling("multiselect-object-referencia").find("div").withAttribute("class","dropdown-menu open").child("ul").withAttribute("aria-expanded","true").find("span").withText(region)
    }

    getProyectosListadosPorRegion(region) {
        //div[@class="panel panel-default panel-obras"]//div[contains(text(), "Región Metropolitana de Santiago")]
        return Selector("div").withAttribute("class","panel panel-default panel-obras").find("div").withAttribute("class","id-class-ubicacion-mobile col-sm-2").withText(region)
    }

    getConstructoraLink(rut) {
        //small[text()="76168618-6"]/parent::a
        return Selector("small").withText(rut).parent("a")
    }

    getProyectosListadosPorConstructora(constructoraName) {
        //a[text()="Constructora Magna Limitada"]
        return Selector("a").withText(constructoraName)
    }

    getProyectByNum(num) {
        return Selector("div").withAttribute("class"," f12 col-sm-12").child("div").withAttribute("class","row id-class-row-table").nth(num).child("div").child("a")
    }

    getProyectNameByNum(num) {
        return Selector("div").withAttribute("class"," f12 col-sm-12").child("div").withAttribute("class","row id-class-row-table").nth(num).child("div").child("a").child("strong")
    }

}
export default new MKPConsultaObrasPage();

export async function buscarObraPorRegion(MKPConsultaObrasPage,region) {
    await t
        .click(MKPConsultaObrasPage.regionFiltroSelect)
        .click(MKPConsultaObrasPage.getRegionSelector(region))
        .click(MKPConsultaObrasPage.buscarButton)
        .wait(2000)
 }

 export async function validarListaObrasPorRegion(MKPConsultaObrasPage,region) {
    let cantObrasRegion = await MKPConsultaObrasPage.getProyectosListadosPorRegion(region).count
    let cantProyectosTotal = await MKPConsultaObrasPage.proyectosList.count
    if(cantObrasRegion == cantProyectosTotal) {
        return true
    } else {
        return false
    }
 }

 export async function buscarObraPorConstructora(MKPConsultaObrasPage,constructoraData) {
    await t
        .click(MKPConsultaObrasPage.constructoraFiltroSelect)
        .typeText(MKPConsultaObrasPage.buscarConstructoraInput,constructoraData.nombre)
        .click(MKPConsultaObrasPage.getConstructoraLink(constructoraData.rut))
        .click(MKPConsultaObrasPage.buscarButton)
        .wait(2000)
 }

 export async function validarListaObrasPorConstructora(MKPConsultaObrasPage,constructoraData) {
    let cantObrasConstructora = await MKPConsultaObrasPage.getProyectosListadosPorConstructora(constructoraData.nombreCompleto).count
    let cantProyectosTotal = await MKPConsultaObrasPage.proyectosList.count
    if(cantObrasConstructora == cantProyectosTotal) {
        return true
    } else {
        return false
    }
 }

 export async function validarFiltrosVacios(MKPConsultaObrasPage) {
     let text = await MKPConsultaObrasPage.regionFiltroSelect.textContent
    await t.expect(text).eql("Todas...")
 }

 export async function clickRandomProyectReturnName(MKPConsultaObrasPage) {
    await t.expect(MKPConsultaObrasPage.proyectosList.visible).ok()
    let cantProyectosTotal = await MKPConsultaObrasPage.proyectosList.count
    let randomNumber = Util.between(0,cantProyectosTotal)
    let constructoraName = await MKPConsultaObrasPage.getProyectNameByNum(randomNumber).textContent
    await t.click(MKPConsultaObrasPage.getProyectByNum(randomNumber)).wait(2000)
    return constructoraName
}