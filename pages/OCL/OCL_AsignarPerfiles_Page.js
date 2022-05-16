import { Selector,t } from "testcafe";

class OCLASignarPerfilesPage{
    constructor(){
        this.titlePage = Selector('strong').withText('Asignar Perfiles')
        this.siguienteBtn = Selector('#btnSiguiente')
        this.usuarioLabelModal = Selector('#NombreUsuarioOrigen')
        this.checkboxAcepto = Selector('input#acepto-msj')
        this.aceptarButton = Selector('button#aceptar-btn')
        this.finalizarBtn = Selector('#btnFinalizar')
    }
}

export default new OCLASignarPerfilesPage();


export async function validarModal(OCLASignarPerfilesPage){
    await t
        .expect(OCLASignarPerfilesPage.usuarioLabelModal.visible).ok("No se visualiza el modal")
        .click(OCLASignarPerfilesPage.checkboxAcepto)
        .click(OCLASignarPerfilesPage.aceptarButton)
}