import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class MKPModalDetalleSubcontrato {
    constructor(){
        this.titleSubcontratoNumeroLabel = Selector('#breadcrumb-contrato-folio')
        //pestaña Ver estado de Pago
        this.pestanaVerEstadoPagoMenu = Selector('a').withText('Ver estado de pago')
        this.estadoDePagoLabel = Selector('th').withText('Estado de Pago')
        this.descargaPdfLink = Selector('a').withText('Descargar pdf')
        this.sinEstadoPagoLabel = Selector('p').withText('Sin estados de pago asociado')
        //pestaña Ver Sc y Anexo
        this.pestanaVerScyAnexoMenu = Selector('a#tabVerScAnexos')
        this.nombreVerScyAnexoLabel = Selector('#divVerScAnexoPdf').find('strong').withText('Nombre:')
        this.fechaCreacionVerScyAnexoLabel = Selector('#divVerScAnexoPdf').find('strong').withText('Fecha creación:')
        this.montoVerScyAnexoLabel = Selector('#divVerScAnexoPdf').find('strong').withText('Monto:')
        //pestaña Garantias
        this.pestanaGarantiasMenu = Selector('a').withText('Garantías')
        this.tipoGrarantiaLabel = Selector('th').withText('Tipo de garantía')
        this.tipoDocumentoGarantiaLabel = Selector('th').withText('Tipo de documento')
        this.fechaCreacionGarantiasLabel = Selector('th').withText('Fecha creación')
        this.fechaVencimientoGarantiasLabel = Selector('th').withText('Fecha vencimiento')
        this.montoGarantiasLabel = Selector('th').withText('Monto')



    }

    getDocumentoPdf(num){
        //a[text() = 'Descargar pdf']
        return Selector('a').withText('Descargar pdf').nth(num)
    }

    getNumeroDocumento(num){
        //div[@id ='resultado-grid-estadosPagos']//tr[8]//li[1]//strong
        return Selector("div#resultado-grid-estadosPagos").find('tr').nth(num).find('li:first-child').find('strong')
    }


}
export default new MKPModalDetalleSubcontrato();

export async function clickRandomDescargaPdfByNum(MKPModalDetalleSubcontrato) {
        let cantDocumTotal = await MKPModalDetalleSubcontrato.descargaPdfLink.count
        //console.log(cantDocumTotal)
        let randomNumber = Util.between(2,cantDocumTotal+1)
        //console.log(randomNumber)
        let descargaPdf = await MKPModalDetalleSubcontrato.getNumeroDocumento(randomNumber).textContext
        let numeroPdf = descargaPdf
        //console.log("el documento descargado es Documento " + numeroPdf + ".pdf")
        await t.click(MKPModalDetalleSubcontrato.getDocumentoPdf(randomNumber-1)).wait(2000)
        return numeroPdf;
}