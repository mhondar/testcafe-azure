import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts";

class SCMImpuestosOrdenCompraPage{
    constructor(){
        this.titleImpuestosLabel = Selector('td.titulopagina2')
        this.montoImpuestoInput = Selector("#txtMonto")
        this.agregarBtn = Selector('#btnAgregar')
        this.volverBtn = Selector('#lnkVolver')  
    }

    getImpuestoAplicado(imp){
        //table[@id="tblImpuestos"]//b[text()="10,00"]
        return Selector('#tblImpuestos').withText(imp)
    }
}

export default new SCMImpuestosOrdenCompraPage();

export async function aplicarImpuestos(SCMImpuestosOrdenCompraPage, impuesto){
    await t
        .expect(SCMImpuestosOrdenCompraPage.titleImpuestosLabel.visible).ok("No se visualiza pagina de Impuestos sobre la orden de Compra")
        .typeText(SCMImpuestosOrdenCompraPage.montoImpuestoInput, impuesto)
        .click(SCMImpuestosOrdenCompraPage.agregarBtn)
    await t
        .expect(SCMImpuestosOrdenCompraPage.getImpuestoAplicado(impuesto).visible).ok("No se muestra impuesto aplicado")
        .click(SCMImpuestosOrdenCompraPage.volverBtn)
}