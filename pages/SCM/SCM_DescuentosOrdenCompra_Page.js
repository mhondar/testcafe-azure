import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts";

class SCMDescuentosOrdenCompraPage{
    constructor(){
        this.titleDescuentosLabel = Selector('td.titulopagina2')
        this.nuevoBtn = Selector('#lnkNuevo')
        this.descripcionInput = Selector('#descripcion_1')
        this.tipoDescuentoDrp = Selector('#tipo_1')
        this.formatoDrp = Selector('#formato_1')
        this.valorInput = Selector('#valor_1')
        this.guardarBtn = Selector('#btnGrabar')
        this.volverBtn = Selector('#lnkVolver')
    }

    getTipoDescuento(desc){
        return Selector('option').withText(desc)
    }

    getFormato(formato){
        return Selector('option').withText(formato)
    }
}

export default new SCMDescuentosOrdenCompraPage();

export async function aplicarDescuentos(SCMDescuentosOrdenCompraPage, descripcion, tipoDto, format, valor){
    await t
          .expect(SCMDescuentosOrdenCompraPage.titleDescuentosLabel.visible).ok("No se visualiza Modal de Descuentos sobre la orden de Compra")
          .click(SCMDescuentosOrdenCompraPage.nuevoBtn)
          .typeText(SCMDescuentosOrdenCompraPage.descripcionInput, descripcion)
          .click(SCMDescuentosOrdenCompraPage.tipoDescuentoDrp)
          .click(SCMDescuentosOrdenCompraPage.getTipoDescuento(tipoDto))
          .click(SCMDescuentosOrdenCompraPage.formatoDrp)
          .click(SCMDescuentosOrdenCompraPage.getFormato(format))
    await clearTextInput(SCMDescuentosOrdenCompraPage.valorInput, valor) 
    await t
          .click(SCMDescuentosOrdenCompraPage.guardarBtn)    
}