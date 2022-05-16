import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"
import Util from "../../helpers/utils"
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"
import ProductoTempData from "../../temp/SCM/ProductoTempData"
class SCMOrdenCompraPage{
    constructor(){
       this.iframe = Selector('#ventana') 
       this.titleOrdenCompra = Selector('td').withAttribute('class', 'titulopagina2')
       this.proveedorInput = Selector('#IdBuscadorProveedores > div > button > div > div > div > input')
       this.elementoProveedorInput= Selector("div#IdBuscadorProveedores").find("input").withAttribute("placeholder","Nombre proveedor o rut")
       this.escribirProveedorInput= Selector("div").withAttribute("class","bs-searchbox").find("input").withAttribute("placeholder","Nombre proveedor o rut")
       this.sucursalDrp = Selector('#lstSucursal')
       this.notasInput = Selector('#txtComentarios')
       this.codigoLupa = Selector('#ctrLineaOrdenCompra_lnkCodigo')
       this.cantidadInput = Selector('#ctrLineaOrdenCompra_txtLINCantidad')
       this.diasDespachoRButton = Selector('#ctrLineaOrdenCompra_rdbTextoCalendario')
       this.diasDespachoInput = Selector('#ctrLineaOrdenCompra_txtDiasDespacho')
       this.comentariosInput = Selector('#ctrLineaOrdenCompra_txtLINComentario')
       this.cuentasCostoInput = Selector('#ctrLineaOrdenCompra_txtCCosto')
       this.precioInput = Selector('#ctrLineaOrdenCompra_txtLINPrecioUnit')
       this.agregarBtn = Selector('#ctrLineaOrdenCompra_btnAgregarLinea')
       this.editarLineasBtn = Selector('#btnEditarLineas')
       this.descuentoImg = Selector('a').withAttribute('title', 'Aplicar descuento a la orden de compra')
       this.verificarBtn = Selector('a#btnEnviar')
       this.productoGrilla = Selector('#tblLineas').child('tbody').child('tr').child('td').nth(4)
       this.nombreOcInput= Selector("#txtNomOc")
       this.codigoRecursoInput= Selector("#ctrLineaOrdenCompra_txtBuscarCodigo")
       this.botonEnviar= Selector("input#btnEnviarOC")
       this.otroImpuestosBtn = Selector("a").withAttribute("title", "Otros Impuestos la orden de compra")
       this.otroImpuestosLabel = Selector("td").withText("Otros Impuestos").nextSibling("td.celdastotales")
       this.monedaSelect = Selector("#lstMoneda")
       this.glosaInput = Selector("#ctrLineaOrdenCompra_txtLINGlosa")
       this.verCalendarioRButton = Selector("#ctrLineaOrdenCompra_rdbVerCalendario")
       this.fechaCalendarioInput = Selector("#ctrLineaOrdenCompra_txtLINFechaEntrega")
       this.distribuirCuentaCosto = Selector("#ctrLineaOrdenCompra_lnkDistribucion")
       this.listaProductosAgregados = Selector("#tblLineas").child("tbody").child("tr")
       this.descuentoLineaProductoBtn = Selector("#ctrLineaOrdenCompra_lnkDescuento")
       this.maestroBtn = Selector("#ctrLineaOrdenCompra_lnkMaestro")
       this.editarLineasBtn = Selector('#btnEditarLineas')
       this.cargosBtn = Selector("a").withAttribute("title", "Aplicar Cargo a la orden de compra")
       this.otrosCargosLabel = Selector("td").withText("Cargos").nextSibling("td.celdastotales")
    }

    getRutProveedor(rut){
        return Selector('span').withText(rut)    
    }  
    
    getSucursal(nombre){
        return Selector('option').withText(nombre)
    }

    getRut(){
        return Selector('#lblRutProveedor')
    }

    getDescripcionProductoAgregado(num){
        //*[@id="tblLineas"]/tbody/tr/td[4]
        return Selector('#tblLineas').child('tbody').child('tr').nth(num).child('td').nth(4)
    }
    getCodigoAgregado(){
        return Selector('#ctrLineaOrdenCompra_lblLINCodigo')
    }

    getCodigoGrilla(index){
        //table[@id="tblLineas"]//tr[2]/td[1]
        return Selector('#tblLineas').find("tr").nth(index).child('td').nth(0)
    }

    getMonedaOption(moneda) {
        return Selector("#lstMoneda").find("option").withExactText(moneda)
    }

}

export default new SCMOrdenCompraPage();

export async function validarPaginaOrdenCompra(SCMOrdenCompraPage){
    await t
        .switchToIframe(SCMOrdenCompraPage.iframe)
        .expect(SCMOrdenCompraPage.titleOrdenCompra.visible).ok("No se visualiza la página orden de Compra")
};

export async function ingresarNombreOC(SCMOrdenCompraPage, name){
    let randomNumber = Util.between(100000000,999999999)
    let nombre = name + randomNumber
    await t  
        .click(SCMOrdenCompraPage.nombreOcInput)
        .typeText(SCMOrdenCompraPage.nombreOcInput, nombre.toString())
    OrdenCompraTempData.setNumeroOC(nombre)  
};

export async function seleccionarProveedor(SCMOrdenCompraPage, proveedor){
     await t
           .click(SCMOrdenCompraPage.elementoProveedorInput)
           .typeText(SCMOrdenCompraPage.escribirProveedorInput, proveedor)
           .click(SCMOrdenCompraPage.getRutProveedor(proveedor))
};

export async function seleccionarSucursal(SCMOrdenCompraPage, nombre){
    await t
          .click(SCMOrdenCompraPage.sucursalDrp)
          .click(SCMOrdenCompraPage.getSucursal(nombre))
}

export async function seleccionarMoneda(SCMOrdenCompraPage, moneda){
    await t
        .click(SCMOrdenCompraPage.monedaSelect)
        .click(SCMOrdenCompraPage.getMonedaOption(moneda))
}

export async function buscarProductoPorCodigo(SCMOrdenCompraPage, codigo){
    await t
        .typeText(SCMOrdenCompraPage.codigoRecursoInput, codigo)
        .click(SCMOrdenCompraPage.codigoLupa)
        .wait(2000)
    let codigoAgregado = await SCMOrdenCompraPage.getCodigoAgregado().textContent
    await t.expect(codigoAgregado).eql(codigo, "No coinciden los codigos")
};

export async function ingresarDatosLineaDeProducto(SCMOrdenCompraPage, cantidad, precio, glosa, entrega, comentarios, cuentaCosto){
    let cant = cantidad
    if(cantidad == "cantRandom"){
        cant = Util.between(2,10)   
    }
    ProductoTempData.setCantidad(cant) 
    await t.typeText(SCMOrdenCompraPage.cantidadInput, cant.toString())
    await clearTextInput(SCMOrdenCompraPage.precioInput, precio)
    await t.typeText(SCMOrdenCompraPage.glosaInput, glosa) 
    switch(entrega) {
        case "Ver Calendario":
            let date = Util.getDate(5)
            await t
                .click(SCMOrdenCompraPage.verCalendarioRButton)
                .typeText(SCMOrdenCompraPage.fechaCalendarioInput, date)
          break;
        case "Dias de Despacho":
            await t
                .click(SCMOrdenCompraPage.diasDespachoRButton)
                .typeText(SCMOrdenCompraPage.diasDespachoInput, "5")
            break;
    } 
    await t.typeText(SCMOrdenCompraPage.comentariosInput, comentarios)
    if(cuentaCosto == "distribuida") {
        await t.click(SCMOrdenCompraPage.distribuirCuentaCosto)
    } else {
        await t.typeText(SCMOrdenCompraPage.cuentasCostoInput, cuentaCosto)
    }
       
}

export async function agregarProducto(SCMOrdenCompraPage, codigo){
    await t
        .click(SCMOrdenCompraPage.agregarBtn)
    let cod = codigo
    if(codigo == "seleccionado") {
        cod = ProductoTempData.getCodigo() 
    } 
    let cant = await SCMOrdenCompraPage.listaProductosAgregados.count - 8
    let result = await SCMOrdenCompraPage.getCodigoGrilla(cant).textContent
    await t.expect(result).eql(cod, "No coinciden los codigos")  
}

export async function validarImpuestoAplicado(SCMOrdenCompraPage, impuesto){
    await t.switchToIframe(SCMOrdenCompraPage.iframe)
        let impuestoAplicado = await SCMOrdenCompraPage.otroImpuestosLabel.textContent
        await t
            .expect(impuestoAplicado).eql(impuesto)
}

export async function validarCargoAplicado(SCMOrdenCompraPage, cargo){
    await t.switchToIframe(SCMOrdenCompraPage.iframe)
        let cargoAplicado = await SCMOrdenCompraPage.otrosCargosLabel.textContent
        await t
            .expect(cargoAplicado).eql(cargo)
}










       

