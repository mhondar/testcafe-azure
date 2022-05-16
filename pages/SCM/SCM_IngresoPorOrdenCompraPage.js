import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"
import { clearTextInput } from "../../helpers/shortcuts"

class SCMIngresoPorOrdenCompra{
    constructor(){
        this.titleIngresoOrdenCompra = Selector('span#Header1')
        this.numeroOCLabel = Selector("a#ctrRecepcionOC_lnkOrdenCompra")
        this.numeroDocTransporteInput = Selector("input#ctrRecepcionOC_txtNumeroDocumento")
        this.rutChoferInput = Selector("#ctrRecepcionOC_txtRutChofer")
        this.nombreChoferInput = Selector("#ctrRecepcionOC_txtChofer")
        this.patenteInput = Selector("#ctrRecepcionOC_txtPatente")
        this.calificacionSelect = Selector("#ctrRecepcionOC_LstCalificacion")
        this.motivoSelect = Selector("#ctrRecepcionOC_lstMotivo")
        this.comentariosText = Selector("#ctrRecepcionOC_txtComentariosCalificacion")
        this.listProductos = Selector("#tblDetalleRecepcion").find("tr")
        this.confirmarRecepcionBtn = Selector("#btnRecepcionar")
        this.volverBtn = Selector("#lnkVolver")
        this.bodegaRecepcionDrp = Selector('#ctrRecepcionOC_lstBodegaRecepcion')
    }

    getCalificacionOption(option) {
        return Selector("#ctrRecepcionOC_LstCalificacion").child("option").withText(option)
    }

    getMotivoOption(option) {
        return Selector("#ctrRecepcionOC_lstMotivo").child("option").withText(option)
    }

    getSaldoPendienteProductoIndex(index) {
        //table[@id="tblDetalleRecepcion"]//tr[3]/td[@class="celdascampos"][10]
        return Selector("#tblDetalleRecepcion").find("tr").nth(index).child("td.celdascampos").nth(9)
    }

    getCantidadRecibidaConformeInput(index) {
        return Selector("#tblDetalleRecepcion").find("tr").nth(index).child("td.celdascampos").nth(11).child("input")
    }

    getOptionBodegaRecepcion(bodega){
        return Selector('option').withText(bodega)
    }

}

export default new SCMIngresoPorOrdenCompra();

export async function validarPaginaIngresoPorOrdenCompraPorNumOC(SCMIngresoPorOrdenCompra, num){  
    await t.expect(SCMIngresoPorOrdenCompra.titleIngresoOrdenCompra.visible).ok("No se visualiza la pagina Ingreso por Orden de Compra")
    let numeroOC = await SCMIngresoPorOrdenCompra.numeroOCLabel.textContent
    await t.expect(num).eql(numeroOC, "La Pagina de Ingreso de Orden de Compra no coincide con el numero de OC seleccionado " + num)
}

export async function completarDatosOrdenCompra(SCMIngresoPorOrdenCompra, calificacion, motivo){  
    let numTransporte = Util.between(100000,999999)
    await t.typeText(SCMIngresoPorOrdenCompra.numeroDocTransporteInput,numTransporte.toString())
    const rutData = require('../../data/GENERIC/rut.json');
    const rut = Util.getRandomValueFromJson(rutData)
    await t.typeText(SCMIngresoPorOrdenCompra.rutChoferInput,rut)
    const nombre = require('../../data/GENERIC/nombres.json');
    const apellido = require('../../data/GENERIC/apellidos.json');
    const nombreCompleto = Util.getRandomValueFromJson(nombre) + " " + Util.getRandomValueFromJson(apellido)
    await t.typeText(SCMIngresoPorOrdenCompra.nombreChoferInput,nombreCompleto)
    const patente = Util.getPatente()
    await t.typeText(SCMIngresoPorOrdenCompra.patenteInput,patente)
    const ordenCompra = await OrdenCompraTempData.getNumeroOC()
    await t
        .click(SCMIngresoPorOrdenCompra.calificacionSelect)
        .click(SCMIngresoPorOrdenCompra.getCalificacionOption(calificacion))
        .click(SCMIngresoPorOrdenCompra.motivoSelect)
        .click(SCMIngresoPorOrdenCompra.getMotivoOption(motivo))
        .typeText(SCMIngresoPorOrdenCompra.comentariosText, "Prueba Automatizada " + ordenCompra + " " + numTransporte)
}

export async function realizarRecepcionCompletaOrdenCompra(SCMIngresoPorOrdenCompra){  
    let cant = await SCMIngresoPorOrdenCompra.listProductos.count
    for(let i = 1 ; i < cant; i++) {
        let saldoPendiente = await SCMIngresoPorOrdenCompra.getSaldoPendienteProductoIndex(i).textContent
        let selectorCantidadRecibida = await SCMIngresoPorOrdenCompra.getCantidadRecibidaConformeInput(i)
        await clearTextInput(selectorCantidadRecibida, saldoPendiente)
    }
}

export async function realizarRecepcionParcialOrdenCompra(SCMIngresoPorOrdenCompra){  
    let cant = await SCMIngresoPorOrdenCompra.listProductos.count
    for(let i = 1 ; i < cant; i++) {
        let saldoPendiente = await SCMIngresoPorOrdenCompra.getSaldoPendienteProductoIndex(i).textContent
        let selectorCantidadRecibida = await SCMIngresoPorOrdenCompra.getCantidadRecibidaConformeInput(i)
        let saldoParcial = parseInt(saldoPendiente) - 1
        await clearTextInput(selectorCantidadRecibida, saldoParcial.toString())
    }
}

export async function confirmarRecepcion(SCMIngresoPorOrdenCompra){  
    await t
        .setNativeDialogHandler(() => true)
        .click(SCMIngresoPorOrdenCompra.confirmarRecepcionBtn)
        .click(SCMIngresoPorOrdenCompra.volverBtn)
}

