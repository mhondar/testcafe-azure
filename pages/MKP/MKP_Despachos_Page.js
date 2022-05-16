import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";
import { clearTextInput } from "../../helpers/shortcuts"


class MKPDespachosPage{
    constructor(){
        this.titleDespachosLabel = Selector('h2').withText('Despachos')
        this.fechaRecepcionInput = Selector('input#FechaRecepcion')
        this.fechaRecepcionInicialInput = Selector('input').withAttribute('name', 'daterangepicker_start')
        this.fechaRecepcionFinalInput = Selector('input').withAttribute('name', 'daterangepicker_end')
        this.buscarBtn = Selector('a#btnBuscar')
        this.grillaDespachos = Selector('#GridPanel')
        this.guiaDespachoLink = Selector('div#GridPanel').find('a').withAttribute('data-url').find('strong')
        this.descargarExcelLink = Selector('a#btnExportarExcel')
    }
    
    getGuiaDespacho(){
        return Selector('div#GridPanel').find('a').withAttribute('data-url').find('strong')
    }

}

export default new MKPDespachosPage();

export async function buscarPorFechaRecepcion(MKPDespachosPage, fechaInicio, fechaFinal){
    await t.click(MKPDespachosPage.fechaRecepcionInput) 
    await clearTextInput(MKPDespachosPage.fechaRecepcionInicialInput, fechaInicio)
    await clearTextInput(MKPDespachosPage.fechaRecepcionFinalInput, fechaFinal)
}

export async function clickBotonBuscarYValidarGrilla(MKPDespachosPage){
    await t  
          .click(MKPDespachosPage.buscarBtn)
          .expect(MKPDespachosPage.grillaDespachos.visible).ok();
}

export async function clickLinkDocumentoTransporte(MKPDespachosPage){
       await t.expect(MKPDespachosPage.guiaDespachoLink.visible).ok("Guia Despacho no visible")
       let nombreGuiaDespacho = await MKPDespachosPage.getGuiaDespacho().textContent
       await t.click(MKPDespachosPage.guiaDespachoLink)
       return nombreGuiaDespacho;
}




