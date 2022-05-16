import { Selector,t } from "testcafe";

class SCMAsociacionFacturaYDocumentosAsociados{
    constructor(){
            this.asociacionFacturaTab = Selector('td').withText('Asociación de Facturas')
            this.facturaGrilla = Selector('#tblDocumentos > tbody > tr')
            this.seleccionarBtn = Selector('#btnSeleccionar')
            this.documentosAsociadosTab = Selector('td').withText('Documentos Asociados')
            this.aceptarBtn = Selector('#btnAceptar')
            this.numeroFacturaInput = Selector('#txtNumeroFactura')
            this.solicitudesDrp = Selector('#lstSolicitudes')
            this.buscarBtn = Selector('#btnBuscar')
    }

    getCheckSolicitud(){
        return Selector('#tblDocumentos > tbody > tr:nth-child(2) > td:nth-child(13) > input')
    }

    getMontoPorCorregir(){
        return Selector('#tblDocumentos > tbody > tr:nth-child(2) > td:nth-child(14) > input')
    }

    getSolicitudesList(opcionList){
        return Selector('option').withText(opcionList)
    }

    getNumeroFacturaGrilla(num){
        return Selector('a').withText(num)
    }
}

export default new SCMAsociacionFacturaYDocumentosAsociados();

export async function seleccionarFacturaPorNumero(SCMAsociacionFacturaYDocumentosAsociados, numero, optionList){
    await t
        .expect(SCMAsociacionFacturaYDocumentosAsociados.asociacionFacturaTab.visible).ok("No se visualiza el tab Asociación de Factura")
        .click(SCMAsociacionFacturaYDocumentosAsociados.asociacionFacturaTab)
        .typeText(SCMAsociacionFacturaYDocumentosAsociados.numeroFacturaInput, numero)
        .click(SCMAsociacionFacturaYDocumentosAsociados.solicitudesDrp)
        .click(SCMAsociacionFacturaYDocumentosAsociados.getSolicitudesList(optionList))
        .click(SCMAsociacionFacturaYDocumentosAsociados.buscarBtn)
    let count = await SCMAsociacionFacturaYDocumentosAsociados.facturaGrilla.count
    if(count < "2") throw new Error("No hay facturas para seleccionar")  
    await t
        .expect(SCMAsociacionFacturaYDocumentosAsociados.getNumeroFacturaGrilla(numero).visible).ok("No se coincide el número de la factura")
        .click(SCMAsociacionFacturaYDocumentosAsociados.getCheckSolicitud())
        .click(SCMAsociacionFacturaYDocumentosAsociados.seleccionarBtn)
}

// export async function montoPorCorregir(SCMAsociacionFacturaYDocumentosAsociados){
//     let monto = await SCMAsociacionFacturaYDocumentosAsociados.getMontoPorCorregir().textContent
    
// }



