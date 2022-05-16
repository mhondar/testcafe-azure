import { Selector,t } from "testcafe";

class MKPOfertaCotizacionPage {
    constructor(){
        this.descargarPlanillaLabel = Selector('a').withText("Descargar plantilla (.xlsx)")
        this.miCodigoInputItems = Selector('label').withText("Mi código").sibling('input')
        this.miDescripcionInputItems = Selector('label').withText("Mi descripción").sibling('input')
        this.informacionAddInputItems = Selector('label').withText("Información adicional").sibling('input')
        this.enviarOfertaBtn = Selector('a').withText("Enviar Oferta")
        this.cantidadUnidadesLineaItems = Selector('td').withAttribute('class','text-right').nextSibling('td').withExactText('UN').prevSibling('td').withAttribute('class','text-right')
        //label[text()="Precio Unitario (*)"]/parent::div/following-sibling::div/input
        this.precioUnitarioLineaItems = Selector('label').withExactText('Precio Unitario (*)').parent('div').nextSibling('div').child('input')
        // this.descuentoLineaItems = 
        this.totalNetoLineaItems = Selector('div').withAttribute('class','total-in-table-offer')
        this.totalNetoOferta = Selector('span.versalita').sibling('strong')
        this.nombreOfertaLabel = Selector('#inputNombreOferta')
    }

}
export default new MKPOfertaCotizacionPage();


export async function completarOferta(MKPOfertaCotizacionPage, ofertaData) {
    let cantOferta = await MKPOfertaCotizacionPage.miCodigoInputItems.count;
    for(let i=0; i<cantOferta; i++){ 
        await t
            .typeText(MKPOfertaCotizacionPage.miCodigoInputItems.nth(i),ofertaData[i].codigo) 
            .typeText(MKPOfertaCotizacionPage.miDescripcionInputItems.nth(i),ofertaData[i].descripcion)
            .typeText(MKPOfertaCotizacionPage.informacionAddInputItems.nth(i),ofertaData[i].adicional)
    }      
 }
