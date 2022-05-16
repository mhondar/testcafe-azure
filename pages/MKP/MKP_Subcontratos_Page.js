import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class MKPSubcontratosPage {
    constructor(){   
        this.iFrame = Selector('#frame')
        this.titleSubcontratosLabel = Selector('h2').withText("Subcontratos")
        //button[@data-id="dropEstadoContrato"]//div[@class="filter-option-inner-inner"]
        this.estadoContratoDrp = Selector('button').withAttribute('data-id', 'dropEstadoContrato').find('div.filter-option-inner-inner')
        this.buscarBtn = Selector('a#btnBuscar')
        //table[@id="tblDocumentos"]//tbody/tr
        this.totalEstadoContratoGrilla = Selector('table').withAttribute('id', 'tblDocumentos').child('tbody').child('tr')
        this.numeroFolioInput = Selector('#txtFolio')
        this.numeroFolioLink = Selector('a#lnkDetalle')
        this.descargarExcelLink = Selector('a#btnToExcel')
        //a[text() = 'E001-590']
        this.numeroContratoLink = Selector('a#lnkDetalle').withText('E001-590')
    }

    getOptionEstadoContrato(estado){
        return Selector('span').withText(estado)
    }

    getOptionEstadoContratoGrilla(estadoGrilla){
        //small[text()="En Ejecución"]
        return Selector('small').withText(estadoGrilla)
    }

    getContratoNumero(num){
        //a[@id = 'lnkDetalle']
        return Selector('a#lnkDetalle').nth(num)
    }

}
export default new MKPSubcontratosPage();

//funcion para validar estado "En ejecucion" en la grilla
export async function validarEstadoContrato(MKPSubcontratosPage) {
    let totalEstadoContratoGrilla = await MKPSubcontratosPage.totalEstadoContratoGrilla.count;
    let estadoEnEjecucion = await MKPSubcontratosPage.getOptionEstadoContratoGrilla("En Ejecución").count;
    if(totalEstadoContratoGrilla == estadoEnEjecucion) {
        return true;
        
    } else {
        return false;
    }

}

export async function clickRandomContratoByNum(MKPSubcontratosPage) {
    let cantContratosTotal = await MKPSubcontratosPage.numeroFolioLink.count
    let randomNumber = Util.between(0,cantContratosTotal-1)
    let contratoNumero = await MKPSubcontratosPage.getContratoNumero(randomNumber).textContent
    await t.click(MKPSubcontratosPage.getContratoNumero(randomNumber)).wait(2000)
    return contratoNumero;
}





