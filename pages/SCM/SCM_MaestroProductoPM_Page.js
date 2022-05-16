import { Selector, t} from "testcafe";


class SCMMaestroProductoPMPage{
    constructor(){
        this.titleMaestroLabel = Selector('#hedEncabezado')
        this.filtroDescripcionInput = Selector('#txtDescripcion')
        this.buscarBtn = Selector('#lnkBuscar')
        this.productosGrilla = Selector('#tblProductos').child('tbody').child('tr')
        this.productoACheck = Selector('#ctrAcumulador_111812869')
        this.productoBCheck = Selector('#ctrAcumulador_111997703')
        this.productoCCheck = Selector('#ctrAcumulador_112359518')
        this.productoDCheck = Selector('#ctrAcumulador_112286352')
        this.seleccionarBtn = Selector('a#lnkSeleccionar')
        this.cerrarBtn = Selector('a#lnkCerrar')
    }

    getNombrePrimerProducto(){
        return Selector('#tblProductos > tbody > tr:nth-child(2) > td:nth-child(2)')
    }

    getNombreSegundoProducto(){
        return Selector('#tblProductos > tbody > tr:nth-child(4) > td:nth-child(2)')
    }

    getNombreTercerProducto(){
        return Selector('#tblProductos > tbody > tr:nth-child(7) > td:nth-child(2)')
    }

    getNombreCuartoProducto(){
        return Selector('#tblProductos > tbody > tr:nth-child(16) > td:nth-child(2)')
    }

    getStockProducto(num){
        //*[@id="tblProductos"]/tbody/tr[4]/td[4]
        return Selector('#tblProductos > tbody > tr:nth-child(' + num + ') > td:nth-child(4)')
    }

    getCheckProducto(num){
        //*[@id="tblProductos"]/tbody/tr[2]/td[7]/input
        return Selector('#tblProductos > tbody > tr:nth-child(' + num + ') > td:nth-child(7) > input')
    }
}

export default new SCMMaestroProductoPMPage();

export async function buscarProducto(SCMMaestroProductoPMPage, producto){
    await t
          .expect(SCMMaestroProductoPMPage.titleMaestroLabel.visible).ok("Modal de Maestro de productos no visible")
          .typeText(SCMMaestroProductoPMPage.filtroDescripcionInput, producto)
          .click(SCMMaestroProductoPMPage.buscarBtn)
          .expect(SCMMaestroProductoPMPage.productosGrilla.visible).ok("No se muestran productos en la grilla")
}

// export async function seleccionarPrimerProducto(SCMMaestroProductoPMPage){
//     await t.click(SCMMaestroProductoPMPage.productoACheck)
//     let primerProducto = await SCMMaestroProductoPMPage.getNombrePrimerProducto().textContext
//     return primerProducto;
// }

// export async function seleccionarSegundoProducto(SCMMaestroProductoPMPage){
//     await t.click(SCMMaestroProductoPMPage.productoBCheck)
//     let segundoProducto = await SCMMaestroProductoPMPage.getNombreSegundoProducto.textContext
//     return segundoProducto;
// }

// export async function seleccionarTercerProducto(SCMMaestroProductoPMPage){
//     await t.click(SCMMaestroProductoPMPage.productoCCheck)
//     let tercerProducto = await SCMMaestroProductoPMPage.getNombreTercerProducto.textContext
//     return tercerProducto;
// }

// export async function seleccionarCuartoProducto(SCMMaestroProductoPMPage){
//     await t.click(SCMMaestroProductoPMPage.productoDCheck)
//     let cuartoProducto = await SCMMaestroProductoPMPage.getNombreCuartoProducto.textContext
//     return cuartoProducto;
//}


export async function seleccionarProductos(SCMMaestroProductoPMPage){
    let count = await SCMMaestroProductoPMPage.productosGrilla.count
    let indexProductosStock = []
    let indexCheckProducto = []
    for (let i = 2; i <= count; i++) {
        let stock = await SCMMaestroProductoPMPage.getStockProducto(i).textContent
        let check = await SCMMaestroProductoPMPage.getCheckProducto(i)
        if(stock > "10"){
            indexProductosStock.push(i)
            indexCheckProducto.push(i)
        } 
    }
    if(indexProductosStock.length >= "4"){
        await t.click(SCMMaestroProductoPMPage.getCheckProducto(indexCheckProducto[0]))
        await t.click(SCMMaestroProductoPMPage.getCheckProducto(indexCheckProducto[1]))
        await t.click(SCMMaestroProductoPMPage.getCheckProducto(indexCheckProducto[2]))
        await t.click(SCMMaestroProductoPMPage.getCheckProducto(indexCheckProducto[3]))
    }  
}




