import { Selector,t } from "testcafe";
import Util from "./../../helpers/utils"
import Shortcuts, { clearTextInput } from "../../helpers/shortcuts";

class SCMGenerarOrdenCompraModal{
    constructor(){
        this.titleModal = Selector('h4').withText("Generar Orden de compra")
        this.generarCompraBtn = Selector("#GenerarCompra")
        //div[@id="contenedorOCs"]/input
        this.ingresarNombreOrdenInput = Selector("div#contenedorOCs").child("input")
    }




}

export default new SCMGenerarOrdenCompraModal();

export async function generarOrdenCompra(SCMGenerarOrdenCompraModal){
    await t.expect(SCMGenerarOrdenCompraModal.titleModal.visible).ok("No se visualiza Modal de Generar Orden de Compra")
    await t.click(SCMGenerarOrdenCompraModal.generarCompraBtn)
}