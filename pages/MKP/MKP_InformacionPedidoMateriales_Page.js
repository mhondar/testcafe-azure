import { Selector,t } from "testcafe";

class MKPInformacionPedidoMaterialesPage {
    constructor(){
        //h4[text()="Información pedido de Materiales"]
        this.informacionTitle = Selector("h4").withText("Información pedido de Materiales")
        //strong[text()="Empresa"]/parent::td/following-sibling::td//strong
        this.empresaNameLabel = Selector("strong").withText("Empresa").parent("td").nextSibling("td").find("strong")
       
    }

    getEmpresaLabel() {
        return Selector("strong").withText("Empresa").parent("td").nextSibling("td").find("strong")
    }

    getProductoList(producto) {
        //div[@class="row table-responsive"]//td[text()="Fulminante Calibre 27 Amarillo"]
        return Selector("div").withAttribute("class", "row table-responsive").find("td").withExactText(producto)
    }

}
export default new MKPInformacionPedidoMaterialesPage();

export async function validarEmpresa(MKPInformacionPedidoMaterialesPage, empresa) {
    await t.expect(MKPInformacionPedidoMaterialesPage.informacionTitle.visible).ok("Información pedido de Materiales no es Visible")
    let empresaName = await MKPInformacionPedidoMaterialesPage.getEmpresaLabel().textContent
    await t.expect(empresa).eql(empresaName)
}

export async function validarProductoPresenteEnLista(MKPInformacionPedidoMaterialesPage, producto) {
    console.log("Monitoreo Script TC-58833. Producto Buscado: " + producto)
    await t.expect(MKPInformacionPedidoMaterialesPage.getProductoList(producto).visible).ok("No se muestra el producto seleccionado en la lista")
}

