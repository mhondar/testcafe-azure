import { Selector,t } from "testcafe";

class SCMFlujoAprobacionModal{
    constructor(){
        this.flujoAprobacionTitle = Selector('.titulopagina2').withText("Flujo de aprobación")
        this.agregarAprobadorDespuesBtn = Selector('#lnkDespues')
        this.aprobadorSelect = Selector("#lstAprobadores")
        this.comentarioInput = Selector('#txtComentarios')
        this.agregarBtn = Selector('#lnkAgregar')
        this.flujoAprobacionMsg = Selector('td').withText("Se agregó un Aprobador al flujo de aprobación")
        this.cerrarBtn = Selector("#lnkSalir")
    }

    getAprobadorOption(aprobador) {
        return Selector("#lstAprobadores").find("option").withAttribute("value", aprobador)
    }
}

export default new SCMFlujoAprobacionModal();

export async function agregarAprobador(SCMFlujoAprobacionModal, aprobador){
    await t
        .expect(SCMFlujoAprobacionModal.flujoAprobacionTitle.visible).ok("No se visualiza el modal de Flujo de Aprobación")
        .click(SCMFlujoAprobacionModal.agregarAprobadorDespuesBtn)
        .click(SCMFlujoAprobacionModal.aprobadorSelect)
        .click(SCMFlujoAprobacionModal.getAprobadorOption(aprobador))
        .typeText(SCMFlujoAprobacionModal.comentarioInput, "Prueba QA Aprobacion Mobile")
        .click(SCMFlujoAprobacionModal.agregarBtn)
        .expect(SCMFlujoAprobacionModal.flujoAprobacionMsg.visible).ok("No se muestra Flujo de Aprobación con aprobador agregado")
        .click(SCMFlujoAprobacionModal.cerrarBtn)
}