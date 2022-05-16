import { Selector,t } from "testcafe";

class SCMControlFacturaYNotaPage{
    constructor(){
        //tab Control de facturas
        this.controlFacturaTab = Selector('td').withText('Control de Facturas')
        this.folioUnicoInput = Selector('#txtFolioUnico')
        this.buscarBtn = Selector('input#btnVerificaBuscar')
        this.estadoFactura = Selector('#lstEstadoFactura')
        this.facturaGrilla = Selector('table#gridResultados_DXMainTable').child('tbody').child('tr')
        this.volverBtn = Selector('#btnVolver')
        this.excelBtn = Selector('a#btn').withText('Excel')
        
        //tab Control de Notas de Corrección
        this.controlNotasCorreccionTab = Selector('a').withText('Control Notas de Corrección')
        this.tipoNotaCorreccionLabel = Selector('td').withText('Tipo Nota de Corrección')
        this.estadoDocumentoNotaDrp = Selector('select#lstEstadoCorreccion')
        this.buscarNotaBtn = Selector('a#btnBuscar')
        this.grillaNotas = Selector('#gridResultados_DXMainTable > tbody > tr')
        //*[@id = 'gridResultados_cell0_15_lblOpciones']/a/img[@alt = 'Ver Documento']
        this.opcionesVerDocumentoImg = Selector('span#gridResultados_cell0_15_lblOpciones').child('a').child('img').withAttribute('alt', 'Ver Documento')
        this.opcionesCancelarImg = Selector('#gridResultados_cell0_15_lblOpciones > a:nth-child(1) > img')
    }

    getFolioUnicoGrilla(){
        return Selector('#gridResultados_DXDataRow0 > td:nth-child(3)')
    }
   
    getEstadoDocumento(num){
        return Selector('#gridResultados_cell'+num+'_17_lblEstadoDoc')
    }

    getEstadoFacturaList(estado){
          return Selector('option').withExactText(estado)  
    }

    getVerDocumento(num){
        //table[@id = 'gridResultados_DXMainTable']/tbody/tr//img[@src = '../../images/ic_alarmapreciohistorico.gif']
        return Selector('img').withAttribute('src', '../../images/ic_lupa.gif').nth(num)
    }

    getMontoPendienteSNCLabel(){
        return Selector('#lblSolicitudNC')
    }

    getEstadoAsociacionGrilla(num){
        return Selector('#gridResultados_cell'+num+'_14_lblEstadoAsoc')
    }

    getEstadoNotaCorreccion(){
        return Selector('#gridResultados_DXDataRow0 > td:nth-child(14)')
    }

    getRevertirImg(num){
        return Selector('#gridResultados_cell'+num+'_20_lblOpciones > a:nth-child(4) > img')
    }

    getCancelarImg(num){
        return Selector('#gridResultados_cell'+num+'_20_lblOpciones > a:nth-child(2) > img')
    }

    getFolioUnico(){
        return Selector('#EncabezadoFactura_lblFolio')
    }

}

export default new SCMControlFacturaYNotaPage();

export async function buscarFactura(SCMControlFacturaYNotaPage, folio,estadoLista, estadoFactura){
    await t
        .expect(SCMControlFacturaYNotaPage.controlFacturaTab.visible).ok("No se visualiza página Control de Factura")
        .click(SCMControlFacturaYNotaPage.controlFacturaTab)
        .typeText(SCMControlFacturaYNotaPage.folioUnicoInput, folio)
        .click(SCMControlFacturaYNotaPage.estadoFactura)
        .click(SCMControlFacturaYNotaPage.getEstadoFacturaList(estadoLista))
        .click(SCMControlFacturaYNotaPage.buscarBtn)
    let valor = await SCMControlFacturaYNotaPage.getFolioUnicoGrilla().textContent
    let estado = await SCMControlFacturaYNotaPage.getEstadoDocumento(0).textContent
    await t
        .expect(valor).eql(folio) 
        .expect(estado.trim()).eql(estadoFactura)
}

export async function buscarFacturaPorEstado(SCMControlFacturaYNotaPage, estado){
    await t
        .click(SCMControlFacturaYNotaPage.controlFacturaTab)
        .click(SCMControlFacturaYNotaPage.estadoFactura)
        .click(SCMControlFacturaYNotaPage.getEstadoFacturaList(estado))
        .click(SCMControlFacturaYNotaPage.buscarBtn)
}

export async function validarFacturaGrillaYMontoPendiente(SCMControlFacturaYNotaPage){
    let cant = await SCMControlFacturaYNotaPage.facturaGrilla.count 
    let arrayMontoYFolio = [] 
    for (let i = 1; i < cant; i++) {
        await t.click(SCMControlFacturaYNotaPage.getVerDocumento(i))
        let montoPendiente = await SCMControlFacturaYNotaPage.getMontoPendienteSNCLabel().textContent
        let monto = montoPendiente.replace(".", "")
        if(parseInt(monto) > "0"){
            let folioUnicoData = await SCMControlFacturaYNotaPage.getFolioUnico().textContent
            arrayMontoYFolio.push(monto)
            arrayMontoYFolio.push(folioUnicoData)
            console.log(arrayMontoYFolio)
            return arrayMontoYFolio;

            //return monto;  
        } else{
            await t.click(SCMControlFacturaYNotaPage.volverBtn)
            i++;
            if(i < cant) throw new Error("No hay facturas con montos asosciados en cero para seleccionar")
        }
    }  
}

export async function buscarDocumentoNotaCorreccion(SCMControlFacturaYNotaPage, estado){
    await t
        .click(SCMControlFacturaYNotaPage.estadoDocumentoNotaDrp)
        .click(SCMControlFacturaYNotaPage.getEstadoFacturaList(estado))
        .click(SCMControlFacturaYNotaPage.buscarNotaBtn)
}

export async function validarGrillaNotas(SCMControlFacturaYNotaPage){
    let cant = await SCMControlFacturaYNotaPage.grillaNotas.count
    for (let i = 0; i <= cant - 2; i++) {
        let estado = await SCMControlFacturaYNotaPage.getEstadoAsociacionGrilla(i).textContent
        await t.expect(estado.trim()).eql("Totalmente Asociada", "No coincide el estado") 
    }
}

export async function buscarNotaCorreccion(SCMControlFacturaYNotaPage, folio,estado, estadoDocumento, estadoAsociacion){
    await t
        .typeText(SCMControlFacturaYNotaPage.folioUnicoInput, folio)
        .click(SCMControlFacturaYNotaPage.estadoDocumentoNotaDrp)
        .click(SCMControlFacturaYNotaPage.getEstadoFacturaList(estado))
        .click(SCMControlFacturaYNotaPage.buscarNotaBtn)
    let folioDoc = await SCMControlFacturaYNotaPage.getFolioUnicoGrilla().textContent
    let estadoDoc = await SCMControlFacturaYNotaPage.getEstadoNotaCorreccion().textContent
    let estadoAsoc = await SCMControlFacturaYNotaPage.getEstadoAsociacionGrilla(0).textContent
    await t
        .expect(folioDoc.trim()).eql(folio, "No coinciden los folios")
        .expect(estadoDoc.trim()).eql(estadoDocumento, "No coinciden el estado del documento")
        .expect(estadoAsoc.trim()).eql(estadoAsociacion, "No coincide el estado de Asociación")
}

export async function validarEstadoFacturaEnGrilla(SCMControlFacturaYNotaPage, estado){
    let cant = await SCMControlFacturaYNotaPage.facturaGrilla.count
    for (let i = 0; i <= cant-2; i++) {
        let estadoFacturaGrilla = await SCMControlFacturaYNotaPage.getEstadoDocumento(i).textContent
        await t.expect(estadoFacturaGrilla.trim()).eql(estado) 
    }
}




    


