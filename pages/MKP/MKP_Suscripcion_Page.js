import { Selector, t} from "testcafe";

class MKPSuscripcionPage {
    constructor(){

    }

    getProductoSuscrito(name) {
        return Selector("strong").withText(name)
    }

}
export default new MKPSuscripcionPage();

export async function validarProductoSuscrito(MKPSuscripcionPage,producto) {
    await t.expect(MKPSuscripcionPage.getProductoSuscrito(producto).visible).ok("Producto " + producto + " no Visible")
 }