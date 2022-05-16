import { Selector,t } from "testcafe";

class MKPCotizacionesPage {
    constructor(){
        this.cotizacionesFiltrosIFrame = Selector('#frame')
        this.filtroClienteInput = Selector('span').withText("Escriba para buscar")
        this.filtroClienteSearchInput = Selector('input').withAttribute("aria-label","Search")
        this.buscarBtn = Selector('a').withText("Buscar")
        this.tablaCotizaciones = Selector('table').withAttribute("class","table table-condensed table-docs ts-table-section f12 ").child("tbody").child("tr") 
        this.ofertarBtn = Selector('a').withText("Ofertar")
        this.confirmacionOfertaPopup = Selector('div').withAttribute('class',"jq-toast-single jq-has-icon jq-icon-success").withText("Se ha enviado oferta ")
    }

    getClienteLabel(nombre){
        return Selector('a').withText(nombre)
    }

    getClienteTag(cliente){
        //strong[text()="PATRICIA ALEJANDRA LLANO RECABAL"]
        return  Selector('strong').withText(cliente)
    }

    seleccionarCotizacion(num){
        return Selector('strong').withExactText(num);
    }

    getOfertarBtn(num){
        return Selector('strong').withExactText(num).parent('a').parent('li').parent('ul').parent('td').parent('tr').find('a').withText('Ofertar')
    }
}
export default new MKPCotizacionesPage();

export async function buscarCotizaciones(MKPCotizacionesPage, clienteData) {
    await t
        .switchToIframe(MKPCotizacionesPage.cotizacionesFiltrosIFrame)
        .click(MKPCotizacionesPage.filtroClienteInput)
        .typeText(MKPCotizacionesPage.filtroClienteSearchInput, clienteData.rut)
        .wait(3000)
        .click(MKPCotizacionesPage.getClienteLabel(clienteData.nombre))
        .click(MKPCotizacionesPage.buscarBtn);
 }

 export async function validarCotizaciones(MKPCotizacionesPage, clienteData) {
    let totalCotizaciones = await MKPCotizacionesPage.tablaCotizaciones.count;
    let cotizacionCliente = await MKPCotizacionesPage.getClienteTag(clienteData.nombre).count;
    if((totalCotizaciones - 1) == cotizacionCliente) {
        return true;
    } else {
        return false;
    }
 }
