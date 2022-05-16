import { Selector,t } from "testcafe";

class SCMAdministracionPedidoAdquisicionPage{
    constructor(){
        this.titleAdministracionPM = Selector('#lblNroPedido')
        this.designadoDrp = Selector('#lstDesignado')
        this.designarBtn = Selector('#btnFiltrar')
        this.primerProductoCheck = Selector('#tblLineas').find('tr:nth-child(2)').child('td:nth-child(9)').child('input')
        this.tercerProductoCheck = Selector('#tblLineas').find('tr:nth-child(4)').child('td:nth-child(9)').child('input')
        this.comprarBtn = Selector('#lnkComprar')
        this.checkbox = Selector('input').withAttribute('type', 'checkbox')
        this.segundoProductoCheck = Selector('#tblLineas').find('tr:nth-child(3)').child('td:nth-child(9)').child('input')
        this.cuartoProductoCheck = Selector('#tblLineas').find('tr:nth-child(5)').child('td:nth-child(9)').child('input')
        this.cotizarBtn = Selector('#lnkCotizar')
        this.volverBtn = Selector('a').withText('Volver')
    }

    getNumeroPM(){
        return Selector('span#lblNumero')
    }

    getDesignado(opcion){
        return Selector('option').withText(opcion)
    } 
}

export default new SCMAdministracionPedidoAdquisicionPage();

export async function seleccionarDesignado(SCMAdministracionPedidoAdquisicionPage, opcion){
    await t
         .click(SCMAdministracionPedidoAdquisicionPage.designadoDrp)
         .click(SCMAdministracionPedidoAdquisicionPage.getDesignado(opcion))
         .click(SCMAdministracionPedidoAdquisicionPage.designarBtn)
};

export async function seleccionarCheckParaCotizar(SCMAdministracionPedidoAdquisicionPage){
    let cant = await SCMAdministracionPedidoAdquisicionPage.checkbox.count
    if(count >= 2){
       await t.click(SCMAdministracionPedidoAdquisicionPage.checkbox)
    }
          
}