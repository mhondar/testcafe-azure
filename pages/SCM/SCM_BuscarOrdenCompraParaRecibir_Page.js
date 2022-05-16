import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"

class SCMBuscarOrdenCompraParaRecibir{
    constructor(){
        this.titleBuscarOrdenParaRecibir = Selector('td').withAttribute('class', 'titulopagina2').withText("Búsqueda de Ordenes de Compra").withText("para Recibir")
        this.iframe = Selector('#ventana')
        this.nombreProveedorInput = Selector('#txtNombreProveedor')
        this.buscarBtn = Selector('#btnBuscar')
        this.grillaOrdenes = Selector('#tblOrdenes').find('tr').child('td.celdascampos').parent("tr")
        this.numeroOCFiltroInput = Selector('#txtNumeroOC') 
        this.estadoRecepcionSelect = Selector('#lstEstadoOC')
        //table[@id="tblOrdenes"]//tr/td[@class="celdascampos"][13]
        this.estadoRecepcionGrilla = Selector("table#tblOrdenes").find("tr").child("td.celdascampos")
        this.chech24 = Selector('#chk24hrs')
        
    }

    getListaPorProveedor(proveedor){
        return Selector('td').withText(proveedor)
    }

    getNumeroOCSelector(num) {
        //table[@id="tblOrdenes"]//tr[2]/td[@class="celdascampos"]/parent::tr//a[@title="Ver detalle Orden Compra"]
        return Selector("table#tblOrdenes").find("tr").nth(num).child("td.celdascampos").parent("tr").find("a").withAttribute("title","Ver detalle Orden Compra")
    }

    getEstadoOptionSelector(option) {
        return Selector("option").withText(option)
    }

    getListGrillaPorEstado(estado) {
        //td[@class="celdascampos" and text()="Sin Recepciones"]
        return Selector("td").withText(estado)
    }

    getRecibirProductosBtnSegunEstado(estadoOC, estadoRecepcion) {
        //tr[1]/td[text()="Aceptada"]//following-sibling::td[text()="Sin Recepciones"]/following-sibling::td/a[@title="Recibir Recursos"]
        return Selector("tr").child("td").withText(estadoOC).sibling("td").withText(estadoRecepcion).nextSibling("td").child("a").withAttribute("title","Recibir Recursos")
    }

    getNumeroOCByEstados(estadoOC, estadoRecepcion) {
        //tr/td[text()="Aceptada"]//following-sibling::td[text()="Sin Recepciones"]/preceding-sibling::td/a[@title="Ver detalle Orden Compra"]
        return Selector("tr").child("td").withText(estadoOC).sibling("td").withText(estadoRecepcion).prevSibling("td").child("a").withAttribute("title","Ver detalle Orden Compra")
    }

    getEstadoRecepcionSelector(estado) {
        //tr/td//following-sibling::td[text()="Recepción Completa"]
        return Selector("tr").child("td").withText(estado)
    }

    getFecha(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(8)')
    }

    getIconoHistorial(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(14) > a:nth-child(3) > img')
    }

    getNumeroOCGrilla(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(1) > a')
    }

    getIconoRecibirRecurso(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(14) > a:nth-child(1) > img')
    }

    getEstadoOC(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(3)')
    }

    getNumeroOC(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(1) > a')
    }
}

export default new SCMBuscarOrdenCompraParaRecibir();

export async function validarPaginaBuscarOrdenCompraParaRecibir(SCMBuscarOrdenCompraParaRecibir){
    await t
          .switchToIframe(SCMBuscarOrdenCompraParaRecibir.iframe)
          .click(SCMBuscarOrdenCompraParaRecibir.titleBuscarOrdenParaRecibir)
          .expect(SCMBuscarOrdenCompraParaRecibir.titleBuscarOrdenParaRecibir.visible).ok("No se visualiza la página de Buscar Orden De Compra para Recibir")
}

export async function buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir, proveedor){
    await t
         .typeText(SCMBuscarOrdenCompraParaRecibir.nombreProveedorInput, proveedor)
         .click(SCMBuscarOrdenCompraParaRecibir.buscarBtn)
    let cantEnListPorProveedor = await SCMBuscarOrdenCompraParaRecibir.getListaPorProveedor(proveedor).count
    let cantLista = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    await t.expect(cantEnListPorProveedor).eql(cantLista, "No todos los elementos mostrados en la lista pertenecen al Proveedor indicado " + proveedor) 
}

export async function buscarOrdenCompraPorNumeroOCRandom(SCMBuscarOrdenCompraParaRecibir){
    await t.click(SCMBuscarOrdenCompraParaRecibir.buscarBtn)
    let cant = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    let randomNumber = Util.between(1,cant-1)
    let numeroOCRandom = await SCMBuscarOrdenCompraParaRecibir.getNumeroOCSelector(randomNumber).textContent
    await t.typeText(SCMBuscarOrdenCompraParaRecibir.numeroOCFiltroInput,numeroOCRandom)
    let compararData = numeroOCRandom
    await t.click(SCMBuscarOrdenCompraParaRecibir.buscarBtn)
    let cant2 = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    await t.expect(cant2).eql(2, "Se muestra más de una Orden de Compra por el Criterio de búsqueda ingresado ")
    let numeroOC= await SCMBuscarOrdenCompraParaRecibir.getNumeroOCSelector(1).textContent
    await t.expect(numeroOC).eql(compararData, "La Orden de Compra Mostrada no es la Buscada " + compararData)
}

export async function buscarOrdenCompraPorNumeroOC(SCMBuscarOrdenCompraParaRecibir, criterio){
    let compararData = criterio
    await t.typeText(SCMBuscarOrdenCompraParaRecibir.numeroOCFiltroInput,criterio)
    await t.click(SCMBuscarOrdenCompraParaRecibir.buscarBtn)
    let cant = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    await t.expect(cant).eql(2, "Se muestra más de una Orden de Compra por el Criterio de búsqueda ingresado " + criterio)
    let numeroOC= await SCMBuscarOrdenCompraParaRecibir.getNumeroOCSelector(1).textContent
    await t.expect(numeroOC).eql(compararData, "La Orden de Compra Mostrada no es la Buscada " + compararData)
}

export async function buscarOrdenCompraPorEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, estado, estadoGrilla){
    await t
        .click(SCMBuscarOrdenCompraParaRecibir.estadoRecepcionSelect)
        .click(SCMBuscarOrdenCompraParaRecibir.getEstadoOptionSelector(estado))
        .click(SCMBuscarOrdenCompraParaRecibir.buscarBtn)
    let cant = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    let cantEstado = await SCMBuscarOrdenCompraParaRecibir.getListGrillaPorEstado(estadoGrilla).count
    await t.expect(cant).eql(cantEstado, "No todas las OC mostradas estan en Estado de Recepción " + estadoGrilla)
}

export async function seleccionarRecibirProductosDeOCPorEstados(SCMBuscarOrdenCompraParaRecibir, estadoOC, estadoRecepcion) {
    let cant = await SCMBuscarOrdenCompraParaRecibir.getRecibirProductosBtnSegunEstado(estadoOC, estadoRecepcion).count
    let randomNumber = Util.between(1,cant)
    let numeroOCSeleccionada = await SCMBuscarOrdenCompraParaRecibir.getNumeroOCByEstados(estadoOC, estadoRecepcion).nth(randomNumber).textContent
    await OrdenCompraTempData.setNumeroOC(numeroOCSeleccionada)  
    await t.click(SCMBuscarOrdenCompraParaRecibir.getRecibirProductosBtnSegunEstado(estadoOC, estadoRecepcion).nth(randomNumber))
}

export async function validarEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, estado){  
    let estadoMostrado = await SCMBuscarOrdenCompraParaRecibir.getEstadoRecepcionSelector(estado)
    await t.expect(estadoMostrado.visible).ok("La Orden de Compra no está en el estado esperado " + estado)
}

export async function validarFiltroCheck(SCMBuscarOrdenCompraParaRecibir, fechaData, fechaDataAyer){
    let cant = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    for (let i = 2; i < cant; i++) {
        let fechaGrilla = await SCMBuscarOrdenCompraParaRecibir.getFecha(i).textContent
        if(!fechaGrilla.trim() == fechaData || !fechaGrilla.trim() == fechaDataAyer) throw new Error ("No")
    }
}

export async function seleccionarIconoHistorialRandom(SCMBuscarOrdenCompraParaRecibir){
    let cant = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    let randomNumber = Util.between(2,cant)
    let numeroOC = await SCMBuscarOrdenCompraParaRecibir.getNumeroOCGrilla(randomNumber).textContent
    await t.click(SCMBuscarOrdenCompraParaRecibir.getIconoHistorial(randomNumber))
    return numeroOC;
}

export async function seleccionarRecibirRecurso(SCMBuscarOrdenCompraParaRecibir,estado, estadoRecep){
    let cant = await SCMBuscarOrdenCompraParaRecibir.grillaOrdenes.count
    for (let i = 2; i < cant; i++) {
        let estadoRecepcion = await SCMBuscarOrdenCompraParaRecibir.getEstadoRecepcionSelector(estadoRecep).nth(i-1).textContent
        let estadoOc =await SCMBuscarOrdenCompraParaRecibir.getEstadoOC(i).textContent
        let numeroOC = await SCMBuscarOrdenCompraParaRecibir.getNumeroOC(i).textContent
        if(estadoRecepcion.trim() == estadoRecep && estadoOc == estado){
            await t.click(SCMBuscarOrdenCompraParaRecibir.getIconoRecibirRecurso(i))
            await OrdenCompraTempData.setNumeroOC(numeroOC)
            break;
        } 
    }
}






