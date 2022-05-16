import { Selector, t} from "testcafe";
class SCMInformacionOrdenCompraPage{
    constructor(){
        this.iframe = Selector('#ventana') 
        this.titleInformacionLabel = Selector('#ctrOrden_lblTitulo')
        this.mensajeExitoLabel = Selector('.exito')
        this.comentariosInput = Selector('#ctrOrden_txtComentarios')
        this.enviarBtn = Selector('input#btnEnviarOC')
        this.dialogoPopUp = Selector('div#divMsgAlertaEnviarNormal')
        this.aceptarBtn = Selector('#btnGuardarJs')
        this.modificarFlujoBtn = Selector('#ctrOrden_lnkModifcarFlujo')
        //td[text()="Se agregó un Aprobador al flujo de aprobación"]
        this.flujoAprobacionMsg = Selector('td').withText("Se agregó un Aprobador al flujo de aprobación")
        this.comentariosInput2 = Selector('#ctrOrden_txtComentarios')
    }
}

export default new SCMInformacionOrdenCompraPage();

export async function validarPaginaInformacionOrdenCompra(SCMInformacionOrdenCompraPage){
    await t
        .switchToIframe(SCMInformacionOrdenCompraPage.iframe)
        .expect(SCMInformacionOrdenCompraPage.titleInformacionLabel.visible).ok("No se visualiza página de Información de Orden de Compra")
};

export async function modificarFlujoAprobador(SCMInformacionOrdenCompraPage){
    await t.click(SCMInformacionOrdenCompraPage.modificarFlujoBtn)
}

export async function enviarInformacion(SCMInformacionOrdenCompraPage){
    await t
        .expect(SCMInformacionOrdenCompraPage.titleInformacionLabel.visible).ok("No se visualiza página de Información de Orden de Compra")
        //  .expect(SCMInformacionOrdenCompraPage.mensajeExitoLabel.visible).ok("No se visualiza el mensaje de éxito")
        .typeText(SCMInformacionOrdenCompraPage.comentariosInput2, "Prueba QA Automatizada")
        .click(SCMInformacionOrdenCompraPage.enviarBtn)
        .expect(SCMInformacionOrdenCompraPage.dialogoPopUp.visible).ok("No se visualiza el pop up")
        .click(SCMInformacionOrdenCompraPage.aceptarBtn)
        
}