import { Selector,t } from "testcafe";

class SCMControlDeRecepcionesPage{
    constructor(){
        this.titleLabel = Selector('#Header1')
        this.estadoDocumentoDrp = Selector('#lstEstadoIngreso')
        this.buscarBtn = Selector('#btnBuscar')
        this.estadoAsociacionDrp = Selector('#lstEstadoAsociacion')
        this.cantFilasGrilla = Selector('#tblDetalle > tbody > tr')
        this.numeroTransporteInput = Selector('#txtNumDocResp')

    }

    getOptionEstado(option){
        return Selector('option').withText(option)
    }

    getEstadoDocumento(num){
        return Selector('#tblDetalle > tbody > tr:nth-child('+num+') > td:nth-child(12)')
    }

    getEstadoAsociacion(num){
        return Selector('#tblDetalle > tbody > tr:nth-child('+num+') > td:nth-child(13)')
    }

    getVerDocumento(num){
        return Selector('#tblDetalle > tbody > tr:nth-child('+num+') > td:nth-child(14) > a:nth-child(1)')
    }

    getNumeroDocuemntoTransporte(num){
        return Selector('#tblDetalle > tbody > tr:nth-child('+num+') > td:nth-child(1)')
    }

}

export default new SCMControlDeRecepcionesPage();

export async function buscarDocumentoPorEstadoYEstadoAsociacion(SCMControlDeRecepcionesPage, option, optionAsocion){
    await t
        .click(SCMControlDeRecepcionesPage.estadoDocumentoDrp)
        .click(SCMControlDeRecepcionesPage.getOptionEstado(option))
        .click(SCMControlDeRecepcionesPage.estadoAsociacionDrp)
        .click(SCMControlDeRecepcionesPage.getOptionEstado(optionAsocion))
        .click(SCMControlDeRecepcionesPage.buscarBtn)  
}

export async function validarBusquedaDocumentoPorEstadoYAsociacion(SCMControlDeRecepcionesPage, option, optionAsocion){
    let cant = await SCMControlDeRecepcionesPage.cantFilasGrilla.count 
    if(cant >= 10){
        cant = 10
    }   
    for (let i = 2; i <= cant; i++) {
        let estadoDoc = await SCMControlDeRecepcionesPage.getEstadoDocumento(i).textContent
        let estadoAsoc = await SCMControlDeRecepcionesPage.getEstadoAsociacion(i).textContent
        await t
            .expect(estadoDoc.trim()).eql(option)
            .expect(estadoAsoc.trim()).eql(optionAsocion)  
    }
}

export async function seleccionarGuia(SCMControlDeRecepcionesPage){
    let numeroGuia = await SCMControlDeRecepcionesPage.getNumeroDocuemntoTransporte(2).textContent
    await t.click(SCMControlDeRecepcionesPage.getVerDocumento(2))
    return numeroGuia;
}

export async function buscarDocumentoPorNumeroTransporte(SCMControlDeRecepcionesPage, numeroDoc, estadoDoc){
    await t
        .typeText(SCMControlDeRecepcionesPage.numeroTransporteInput, numeroDoc)
        .click(SCMControlDeRecepcionesPage.buscarBtn)  
    let num = await SCMControlDeRecepcionesPage.getNumeroDocuemntoTransporte(2).textContent  
    let estado = await SCMControlDeRecepcionesPage.getEstadoDocumento(2).textContent 
    await t
        .expect(num.toString().trim()).eql(numeroDoc)
        .expect(estado.trim()).eql(estadoDoc)
}



