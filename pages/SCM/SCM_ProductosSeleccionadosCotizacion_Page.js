import { Selector,t } from "testcafe";
import Util from "./../../helpers/utils"

class SCMProductosSeleccionadosCotizacionPage{
    constructor(){
        this.titleLabel = Selector('#lblTitulo').withText("Productos Seleccionados")
        this.seleccionarOpcionSelect = Selector("button").withAttribute("title","Selecciona una opción")
        this.optionsList = Selector("ul").find("li")
        this.comprarBtn = Selector("#btnComprar")
    }

    getSeleccionaOpcionOption(index) {
        return Selector("ul").find("li").nth(index)
    }


}

export default new SCMProductosSeleccionadosCotizacionPage();

export async function seleccionarOpcionYComprar(SCMProductosSeleccionadosCotizacionPage){
    await t
        .expect(SCMProductosSeleccionadosCotizacionPage.titleLabel.visible).ok("No se visualiza Productos Seleccionados")
        .click(SCMProductosSeleccionadosCotizacionPage.seleccionarOpcionSelect)
    let cant = await SCMProductosSeleccionadosCotizacionPage.optionsList.count
    let random = Util.between(1,cant)
    await t.click(SCMProductosSeleccionadosCotizacionPage.getSeleccionaOpcionOption(random))
    await t.click(SCMProductosSeleccionadosCotizacionPage.titleLabel)
    await t.click(SCMProductosSeleccionadosCotizacionPage.comprarBtn)
}