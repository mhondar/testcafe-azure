import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts";

class SCMCargosOrdenCompraModal{
    constructor(){
        this.titleCargoLabel = Selector('td.titulopagina2').withText("Cargos sobre la orden de compra")
        this.nuevoBtn = Selector("#lnkNuevo")
        this.descripcionInput = Selector("#descripcion_1")
        this.valorInput = Selector("#valor_1")
        this.guardarBtn = Selector('#lnkGrabar')
        this.volverBtn = Selector('#lnkVolver')  
    }
}

export default new SCMCargosOrdenCompraModal();

export async function aplicarCargos(SCMCargosOrdenCompraModal, cargo){
    await t
        .expect(SCMCargosOrdenCompraModal.titleCargoLabel.visible).ok("No se visualiza pagina de Cargos sobre la orden de Compra")
        .click(SCMCargosOrdenCompraModal.nuevoBtn)
        .typeText(SCMCargosOrdenCompraModal.descripcionInput, "Otros Cargos")
    await clearTextInput(SCMCargosOrdenCompraModal.valorInput, cargo)
    await t
        .click(SCMCargosOrdenCompraModal.guardarBtn)
        .click(SCMCargosOrdenCompraModal.volverBtn)
}