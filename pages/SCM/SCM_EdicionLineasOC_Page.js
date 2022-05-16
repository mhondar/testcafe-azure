import { Selector, t} from "testcafe";
import { clearText, clearTextInput } from "../../helpers/shortcuts"
import Util from "../../helpers/utils";

class SCMEdicionLineasOCPage{
    constructor(){
         //this.titleEdicionLineasLabel = Selector('td').withText('Edición de lineas de orden de compra') 
         this.titleEdicionLineasLabel = Selector('td.titulopagina2')
         this.productosGrilla = Selector('#tblLineas > tbody > tr')
         this.guardarBtn = Selector('a#btnGrabar')
         this.volverBtn = Selector('a#lnkVolver')
    }

    async agregarDiasDespacho(){
        let cant = await this.productosGrilla.count
        for (let i = 2; i < cant + 1; i++) {
            this.valor = await Selector('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(7) > input').textContent
            if(await this.valor == "0"){
                this.dias = Selector('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(7) > input');
                await clearTextInput(this.dias, '5');
            }
        }
    }  

    async eliminarFechaEntrega(){
        let cant = await this.productosGrilla.count
        for (let i = 2; i < cant + 1; i++) {
            this.fecha = Selector('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(6) > input');
            await clearText(this.fecha);
        }
    } 
    
    getDias(num){
        return Selector('#tblLineas > tbody > tr:nth-child('+num+') > td:nth-child(7) > input')
    }

    getCantidadSelectorByIndex(index) {
        return Selector("#cnt_" + index)
    }

    getPrecioUnitarioSelectorByIndex(index) {
        return Selector("#pre_" + index)
    }

    getDiasDespachoSelectorByIndex(index) {
        return Selector("#diaDes_" + index)
    }

    getGlosaSelectorByIndex(index) {
        return Selector("#glo_" + index)
    }

    getCuentaCostoSelectorByIndex(index) {
        return Selector("#dis_" + index)
    }

}

export default new SCMEdicionLineasOCPage();

export async function agregarCantidad(SCMEdicionLineasOCPage){
    await t.expect(SCMEdicionLineasOCPage.titleEdicionLineasLabel.visible).ok("No se visualiza pagina de Edicion de Lineas de OC")
    let cant = await SCMEdicionLineasOCPage.productosGrilla.count
    for (let i = 1; i < cant; i++) {
        let randomNumber = Util.between(1,5)
        let cantidad = SCMEdicionLineasOCPage.getCantidadSelectorByIndex(i)
        await clearTextInput(cantidad, randomNumber.toString())
    }
} 

export async function agregarPrecioUnitario(SCMEdicionLineasOCPage, precio){
    let cant = await SCMEdicionLineasOCPage.productosGrilla.count
    for (let i = 1; i < cant; i++) {
        let precioSelector = await SCMEdicionLineasOCPage.getPrecioUnitarioSelectorByIndex(i)
        await clearTextInput(precioSelector, precio);
    }
}

export async function agregarDiasDespacho(SCMEdicionLineasOCPage){
    let cant = await SCMEdicionLineasOCPage.productosGrilla.count
    for (let i = 1; i < cant; i++) {
        let diasDespachoSelector = await SCMEdicionLineasOCPage.getDiasDespachoSelectorByIndex(i)
        await clearTextInput(diasDespachoSelector, '5');
    }
}  

export async function agregarGlosa(SCMEdicionLineasOCPage){
    let cant = await SCMEdicionLineasOCPage.productosGrilla.count
    for (let i = 1; i < cant; i++) {
        let glosaSelector = await SCMEdicionLineasOCPage.getGlosaSelectorByIndex(i)
        await clearTextInput(glosaSelector, 'glosa PA');
    }
} 

export async function agregarCuentasCosto(SCMEdicionLineasOCPage){
    let cant = await SCMEdicionLineasOCPage.productosGrilla.count
    for (let i = 1; i < cant; i++) {
        let costoSelector = await SCMEdicionLineasOCPage.getCuentaCostoSelectorByIndex(i)
        await clearTextInput(costoSelector, '28');
    }
} 

export async function editarLineasProductos(SCMEdicionLineasOCPage, precio){
    await agregarCantidad(SCMEdicionLineasOCPage)
    await agregarPrecioUnitario(SCMEdicionLineasOCPage, precio)
    await agregarDiasDespacho(SCMEdicionLineasOCPage)
    await agregarGlosa(SCMEdicionLineasOCPage)
    await agregarCuentasCosto(SCMEdicionLineasOCPage)
} 

