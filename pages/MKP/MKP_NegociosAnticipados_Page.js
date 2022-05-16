import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class MKPNegociosAnticipadosPage {
    constructor(){
        this.iframeNegocios = Selector("#frame")
        this.titleLabel = Selector('h2').withText("Negocios Anticipados")
        this.productoFiltroInput = Selector("#palabraClave")
        this.buscarBtn = Selector("#btnBuscar")
        this.negociosList = Selector("#GridPanel").find("tbody").child("tr")
        //button//div[text()="Escriba para buscar"]
        this.clienteFiltroBtn = Selector("button").find("div").withText("Escriba para buscar")
        //label[text()="Cliente "]/following-sibling::div//input
        this.buscarClienteInput = Selector("label").withText("Cliente ").sibling("div").find("input")
    }

    getListaByProducto(producto) {
        //a[contains(text(),'Flete')]
        return Selector("a").withText(producto)
    }

    getListaByCliente(cliente) {
        //strong[text()="CONSTRUCTORA DE VICENTE SA"]
        return Selector("strong").withText(cliente)
    }

    getClienteBuscado(cliente) {
        //span[text()="CONSTRUCTORA DE VICENTE SA"]
        return Selector("span").withText(cliente)
    }

    getDetalleProductoLink(num) {
        //tr[10]//a[@id="lnkDetalle"]
        return Selector("tr").nth(num).find("a#lnkDetalle")
    }

    getEmpresaProductByNum(num) {
        //tr[10]//strong
        return Selector("tr").nth(num).find("strong")
    }

}
export default new MKPNegociosAnticipadosPage();

export async function validarPaginaNegociosPresente(MKPNegociosAnticipadosPage) {
    await t
        .switchToIframe(MKPNegociosAnticipadosPage.iframeNegocios)
        .click(MKPNegociosAnticipadosPage.titleLabel)
        .expect(MKPNegociosAnticipadosPage.titleLabel.visible).ok("No se visualiza página de Negocios Anticipados") 
 }

export async function validarBusquedaPorProducto(MKPNegociosAnticipadosPage, producto) {
    await t
        .typeText(MKPNegociosAnticipadosPage.productoFiltroInput, producto)
        .click(MKPNegociosAnticipadosPage.buscarBtn)
    let cantidadLista = await MKPNegociosAnticipadosPage.negociosList.count
    console.log("Monitoreo Script 58831. Cantidad de elementos en Lista: " + cantidadLista)
    let productoMayuscula = Util.getStringCapitalized(producto)
    let cantidadMay = await MKPNegociosAnticipadosPage.getListaByProducto(productoMayuscula).count
    console.log("Monitoreo Script 58831. Cantidad de elementos en Lista en mayusculas: " + cantidadMay)
    let cantidadCap = await MKPNegociosAnticipadosPage.getListaByProducto(producto.toUpperCase()).count
    console.log("Monitoreo Script 58831. Cantidad de elementos en Lista en capitalized: " + cantidadCap)
    await t.expect(cantidadLista-1).eql(cantidadMay + cantidadCap)
}

export async function validarBusquedaPorCliente(MKPNegociosAnticipadosPage, cliente) {
    await t
        .click(MKPNegociosAnticipadosPage.clienteFiltroBtn)
        .click(MKPNegociosAnticipadosPage.buscarClienteInput)
        .typeText(MKPNegociosAnticipadosPage.buscarClienteInput,cliente)
        .expect(MKPNegociosAnticipadosPage.getClienteBuscado(cliente.toUpperCase()).visible).ok("No se muestra el cliente buscado")
        .click(MKPNegociosAnticipadosPage.getClienteBuscado(cliente.toUpperCase()))
        .click(MKPNegociosAnticipadosPage.buscarBtn)
    let cantidadLista = await MKPNegociosAnticipadosPage.negociosList.count
    let cantidadCliente = await MKPNegociosAnticipadosPage.getListaByCliente(cliente.toUpperCase()).count
    await t.expect(cantidadLista-1).eql(cantidadCliente)
}

export async function seleccionarRandomNegocioAnticipado(MKPNegociosAnticipadosPage) { 
    let cantidadLista = await MKPNegociosAnticipadosPage.negociosList.count
    let randomNum = Util.between(1, cantidadLista-1)
    await t.click(MKPNegociosAnticipadosPage.getDetalleProductoLink(randomNum))
    let producto = await MKPNegociosAnticipadosPage.getDetalleProductoLink(randomNum).textContent
    let empresa = await MKPNegociosAnticipadosPage.getEmpresaProductByNum(randomNum).textContent
    return [producto,empresa]
}