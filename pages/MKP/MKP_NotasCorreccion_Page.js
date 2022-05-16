import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class MKPNotasCorreccionPage {
    constructor(){
        this.iframeNotas = Selector("#frame")
        this.titleLabel = Selector('h2').withText("Solicitudes de Notas de Corrección")
        this.clienteFilterCombo = Selector("select#spEmpresas").sibling("button").find("div").withText("Escriba para buscar")
        //select[@id="spEmpresas"]/parent::div//input
        this.clienteFilterInput = Selector("select#spEmpresas").parent("div").find("input")
        this.buscarBtn = Selector("a#btnBuscar")
        this.limpiarBtn = Selector("a#btnLimpiar")
        //select[@id="Estado"]/following-sibling::button//div[text()="Selecciona..."]
        this.estadoFilterSelect = Selector("select#Estado").sibling("button").find("div").withText("Selecciona...")
    }

    getClienteTag(name) {
        return Selector("span").withText(name)
    }

    getEstadoFiltro(estado) {
        return Selector("span").withText(estado)
    }


}
export default new MKPNotasCorreccionPage();

export async function validarPaginaNotasCorreccionPresente(MKPNotasCorreccionPage) {
    await t
        .wait(2000)
        .switchToIframe(MKPNotasCorreccionPage.iframeNotas)
        .click(MKPNotasCorreccionPage.titleLabel)
        .expect(MKPNotasCorreccionPage.titleLabel.visible).ok("No se visualiza página de Negocios Anticipados") 
 }

 export async function buscarNotaCorreccionPorEstado(MKPNotasCorreccionPage, estado) {
    await t
        .click(MKPNotasCorreccionPage.limpiarBtn)
        .click(MKPNotasCorreccionPage.estadoFilterSelect)
        .click(MKPNotasCorreccionPage.getEstadoFiltro(estado))
        .click(MKPNotasCorreccionPage.buscarBtn)
 }

 export async function buscarNotaCorreccionPorCliente(MKPNotasCorreccionPage, cliente) {
    await t
        .click(MKPNotasCorreccionPage.limpiarBtn)
        .click(MKPNotasCorreccionPage.clienteFilterCombo)
        .typeText(MKPNotasCorreccionPage.clienteFilterInput, cliente.rut)
        .expect(MKPNotasCorreccionPage.getClienteTag(cliente.nombre).visible).ok()
        .click(MKPNotasCorreccionPage.getClienteTag(cliente.nombre))
        .click(MKPNotasCorreccionPage.buscarBtn)
 }

