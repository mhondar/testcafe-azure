import { Selector,t } from "testcafe";

class SCMConsultarEstadoPMPage{
    constructor(){

        this.titleLabel = Selector('.titulopagina2')
        this.nombrePMInput = Selector('#txtNombre')
        this.buscarBtn = Selector('#btnBuscar')
        this.consultarEstadoPorPedidoTab = Selector('td').withText('Consultar Estado por Pedido')
    }

    getNombrePedido(nombre){
        return Selector('td').withText(nombre)
    }

    getCantidadLineas(num){
        return Selector('span').withText(num)
    }
}

export default new SCMConsultarEstadoPMPage();

export async function validarBusquedaPM(SCMConsultarEstadoPMPage, nombre){
    await t
          .expect(SCMConsultarEstadoPMPage.titleLabel.visible).ok("No se visualiza página Consultar estado por Pedido de Materiales")
          .typeText(SCMConsultarEstadoPMPage.nombrePMInput, nombre)
          .click(SCMConsultarEstadoPMPage.buscarBtn)
          .click(SCMConsultarEstadoPMPage.consultarEstadoPorPedidoTab)
    let name = await SCMConsultarEstadoPMPage.getNombrePedido(nombre) 
    await t.expect(name.visible).ok("No se visualiza el pedido de materiales") 
}