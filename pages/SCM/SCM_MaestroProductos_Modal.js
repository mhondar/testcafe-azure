import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class SCMMaestroProductosModal {
    constructor(){
        this.title = Selector("#hedEncabezado").withText("Maestro de productos")
        this.filtroCodigoInput = Selector('#txtCodigo')
        this.filtroDescripcionInput = Selector("#txtDescripcion")
        this.buscarBtn = Selector('#lnkBuscar')
        this.seleccionarBtn = Selector('#lnkSeleccionar')
        this.cerrarBtn = Selector('#lnkCerrar')
        this.listaProductosItems = Selector("#tblProductos").child("tbody").child("tr")
    }

    getProductoCheckByItem(item) {
        return Selector("#tblProductos").child("tbody").child("tr").nth(item).child("td").nth(6).child("input")
    }

    getProductoCheck(item, indexInput) {
        return Selector("#tblProductos").child("tbody").child("tr").nth(item).child("td").nth(indexInput).child("input")
    }


}
export default new SCMMaestroProductosModal();

export async function seleccionarProductos(SCMMaestroProductosModal, cant){
    const productosData = require('../../data/GENERIC/productos.json')
    const producto = Util.getRandomValueFromJson(productosData)
    await t
        .expect(SCMMaestroProductosModal.title.visible).ok("No se visualiza el maestro de productos")
        .typeText(SCMMaestroProductosModal.filtroDescripcionInput, producto)
        .click(SCMMaestroProductosModal.buscarBtn)
    let cantidadProductos = await SCMMaestroProductosModal.listaProductosItems.count - 1
    if(cant > cantidadProductos) {
        cant = cantidadProductos
        for(let i=1; i<=cant; i++) {
            await t.click(SCMMaestroProductosModal.getProductoCheckByItem(i))
        }
    } else {
        let selectedProductsItem = []
        for(let i=1; i<=cant; i++) {
            let randomNumber = Util.between(1,cantidadProductos)
            if(selectedProductsItem.includes(randomNumber)) {
                i--;
                continue;
            }
            selectedProductsItem.push(randomNumber)
            await t.click(SCMMaestroProductosModal.getProductoCheckByItem(randomNumber))
        }
    }
    await t
        .setNativeDialogHandler(() => true)
        .click(SCMMaestroProductosModal.seleccionarBtn)
        .click(SCMMaestroProductosModal.cerrarBtn)
};

export async function seleccionarProductosParaSubcontrato(SCMMaestroProductosModal, cant, indexInput){
    const productosData = require('../../data/GENERIC/productos.json')
    const producto = Util.getRandomValueFromJson(productosData)
    await t
        .expect(SCMMaestroProductosModal.title.visible).ok("No se visualiza el maestro de productos")
        .typeText(SCMMaestroProductosModal.filtroDescripcionInput, producto)
        .click(SCMMaestroProductosModal.buscarBtn)
    let cantidadProductos = await SCMMaestroProductosModal.listaProductosItems.count - 1
    if(cant > cantidadProductos) {
        cant = cantidadProductos
        for(let i=1; i<=cant; i++) {
            await t.click(SCMMaestroProductosModal.getProductoCheck(i, indexInput))
        }
    } else {
        let selectedProductsItem = []
        for(let i=1; i<=cant; i++) {
            let randomNumber = Util.between(1,cantidadProductos)
            if(selectedProductsItem.includes(randomNumber)) {
                i--;
                continue;
            }
            selectedProductsItem.push(randomNumber)
            await t.click(SCMMaestroProductosModal.getProductoCheck(randomNumber, indexInput))
        }
    }
    await t
        .setNativeDialogHandler(() => true)
        .click(SCMMaestroProductosModal.seleccionarBtn)
        .click(SCMMaestroProductosModal.cerrarBtn)
};