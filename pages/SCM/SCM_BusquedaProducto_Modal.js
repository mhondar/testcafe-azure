import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";
import ProductoTempData from "../../temp/SCM/ProductoTempData"

class SCMBusquedaProductoModal{
    constructor(){
          this.titleBusquedaProducto = Selector('.titulopagina2')
          this.descripcionInput = Selector('#txtDescripcion')
          this.buscarBtn = Selector('#btnBuscar') 
          this.grillaProductos = Selector('#tblProductos').child('tbody').child('tr')
          this.codigoInput = Selector('#txtCodigo')
    }

    getProducto(num, index){
        return Selector('#tblProductos > tbody > tr:nth-child('+num+') > td:nth-child(' + index + ') > a:nth-child(1) > img')
    }

    getNombreProducto(num){
        return Selector('#tblProductos > tbody > tr:nth-child('+num+') > td:nth-child(2)')
    }

    getCodigoProducto(num){
        return Selector('#tblProductos > tbody > tr:nth-child('+num+') > td:nth-child(1)')
    }

    getProductoSeleccionado(){
        return Selector('#ctrLineaOrdenCompra_lblLINDesc')
    }

    getCodigo(codigo){
        return Selector('td').withText(codigo)
    }

    getStock(){
        return Selector('#tblProductos > tbody > tr:nth-child(2) > td:nth-child(4)')
    }

 
}

export default new SCMBusquedaProductoModal();

export async function seleccionarProducto(SCMBusquedaProductoModal, index) {
    const productosData = require('../../data/GENERIC/productos.json');
    const producto = Util.getRandomValueFromJson(productosData)
    await t
        .expect(SCMBusquedaProductoModal.titleBusquedaProducto.visible).ok("No se visualiza el modal de Búsqueda de Productos")
        .typeText(SCMBusquedaProductoModal.descripcionInput, producto)
        .click(SCMBusquedaProductoModal.buscarBtn)
    let product = await clickRandomProducto(SCMBusquedaProductoModal, index)
    let nombreProd = await SCMBusquedaProductoModal.getProductoSeleccionado().textContext
    await t.expect(product).eql(nombreProd)
}

export async function clickRandomProducto(SCMBusquedaProductoModal, index) {
    let cantProductos = await SCMBusquedaProductoModal.grillaProductos.count
    let randomNumber = Util.between(2,cantProductos)
    let nombreProducto = await SCMBusquedaProductoModal.getNombreProducto(randomNumber).textContext
    let codigoProducto = await SCMBusquedaProductoModal.getCodigoProducto(randomNumber).textContent
    ProductoTempData.setCodigo(codigoProducto)
    await t.click(SCMBusquedaProductoModal.getProducto(randomNumber, index)).wait(1000)
    return nombreProducto;
} 

export async function seleccionarProductoPorCodigoYDescripcion(SCMBusquedaProductoModal,codigo, producto, index){
    await t
          .expect(SCMBusquedaProductoModal.titleBusquedaProducto.visible).ok("No se visualiza el modal de Búsqueda de Productos")
          .typeText(SCMBusquedaProductoModal.codigoInput, codigo)
          .typeText(SCMBusquedaProductoModal.descripcionInput, producto)
          .click(SCMBusquedaProductoModal.buscarBtn)
    let cod = await SCMBusquedaProductoModal.getCodigo(codigo)      
    await t.expect(cod.visible).ok("No se visualiza el elemento filtrado")
    let stock = await SCMBusquedaProductoModal.getStock().textContent
    let descripLabel = await SCMBusquedaProductoModal.getNombreProducto(2).textContent
    console.log(stock)
    if(stock > "0"){
        await t.click(SCMBusquedaProductoModal.getProducto(2, index))
        return descripLabel;
    }
    else{
        throw new Error("No hay stock de productos") 
    }
}

