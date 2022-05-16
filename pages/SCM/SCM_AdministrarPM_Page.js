import { Selector,t } from "testcafe";
import { seleccionarCuentasCosto } from "./SCM_CrearPedidoMateriales_Page";

class SCMAdministrarPMPage{
    constructor(){
          this.titleAdministracionPMLabel = Selector('td').withText('Administrar Pedido de Materiales')
          this.iframe = Selector('#ventana')
          this.administrarLineaMenu = Selector('td').withText('Administrar por Líneas')
          this.administrarPedidoMenu = Selector('a').withText('Administrar por Pedido')
          this.grillaPedido = Selector('#tblPedidos > tbody > tr')
          //#tblPedidos > tbody > tr:nth-child(2) > td:nth-child(9) > a:nth-child(1) > img
          this.primerPedidoGrilla = Selector('#tblPedidos').find('tr:nth-child(2)').child('td:nth-child(9)').child('a:nth-child(1)').child('img')
          this.designadoDrp = Selector('#lstDesignado')
          this.designarBtn = Selector('#btnDesignado')
          this.primerProductCheck = Selector('#tblPedidos').find('tr:nth-child(2)').child('td:nth-child(16)').child('input')
          this.tercerProductCheck = Selector('#tblPedidos').find('tr:nth-child(4)').child('td:nth-child(16)').child('input')
          this.comprarBtn = Selector('#lnkComprar')
          this.cotizarBtn = Selector('#lnkCotizar')
          this.numeroPMLabel = Selector('#txtNumero')
          this.buscarBtn = Selector('#btnBuscar')
        }

   getDesignado(opcion){
       return Selector('option').withText(opcion)
   }  
   
   getNombrePrimerProducto(){
       return Selector('#tblPedidos').find('tr:nth-child(2)').child('td:nth-child(7)')
   }

   getNombreTercerProducto(){
       return Selector('#tblPedidos').find('tr:nth-child(4)').child('td:nth-child(7)')
   }

   getEstado(num){
       return Selector('#tblPedidos > tbody > tr:nth-child(' + num + ') > td:nth-child(8)')
   }

   getImgLupa(opcion){
       return Selector('#tblPedidos > tbody > tr:nth-child(' + opcion + ') > td:nth-child(9) > a:nth-child(1) > img')
   }

   getNumeroPedido(num){
      return Selector('#tblPedidos > tbody > tr:nth-child(' + num + ') > td:nth-child(1)') 
   }

   getCantidadLineas(num){
       return Selector('#tblPedidos > tbody > tr:nth-child(' + num + ') > td:nth-child(5) > span:nth-child(1)')
   }
}

export default new SCMAdministrarPMPage();

export async function seleccionarDesignadoA(SCMAdministrarPMPage, opcion){
    await t
         .click(SCMAdministrarPMPage.designadoDrp)
         .click(SCMAdministrarPMPage.getDesignado(opcion))
         .click(SCMAdministrarPMPage.designarBtn)
};

 export async function seleccionarPedidoPorEstado(SCMAdministrarPMPage){
    let count = await SCMAdministrarPMPage.grillaPedido.count
    let i = 2
    do {
        let estado = await SCMAdministrarPMPage.getEstado(i).textContent
        let cantidadLineas = await SCMAdministrarPMPage.getCantidadLineas(i).textContent
        if(estado == "Pedido En Adquisiciones" && cantidadLineas == "4") {
            let numeroPedido = await SCMAdministrarPMPage.getNumeroPedido(i).textContent
            await t.click(SCMAdministrarPMPage.getImgLupa(i))
            return numeroPedido;
            break;
        }
        else 
           i++; 
    } while (i <= count + 1)  
}

export async function seleccionarPedidoMixto(SCMAdministrarPMPage){
    let count = await SCMAdministrarPMPage.grillaPedido.count
    let i = 2
    do {
        let estado = await SCMAdministrarPMPage.getEstado(i).textContent
        let cantLineas = await SCMAdministrarPMPage.getCantidadLineas(i).textContent
        if(estado == "Pedido Mixto" && cantLineas == "4") {
            let numeroPedido = await SCMAdministrarPMPage.getNumeroPedido(i).textContent
            await t.click(SCMAdministrarPMPage.getImgLupa(i))
            return numeroPedido;
            break;
        }
        else 
           i++; 
    } while (i <= count + 1)  
}

export async function buscarPedidoPorNumero(SCMAdministrarPMPage, num, estado){
        await t
            .typeText(SCMAdministrarPMPage.numeroPMLabel, num)
            .click(SCMAdministrarPMPage.buscarBtn)
            .expect(SCMAdministrarPMPage.getNumeroPedido(2).textContent).eql(num)
            .expect(SCMAdministrarPMPage.getEstado(2).textContent).eql(estado)
}




