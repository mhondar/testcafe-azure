import { Selector,t } from "testcafe";

class OCLASignarCentrosGestionPage{
    constructor(){
        this.titlePage = Selector('#AsignarCg')
        this.checkbox = Selector('#cg_60800')
        this.chechkBoxTodos = Selector('#chkMarcarTodos')
        this.siguienteBtn = Selector('#btnSiguiente')
        this.mensajeSeleccionTodos = Selector('span').withAttribute('data-seleccion', 'Todos')
    }
}

export default new OCLASignarCentrosGestionPage();

export async function seleccionarCentroGestion(OCLASignarCentrosGestionPage){
    await t
        .expect(OCLASignarCentrosGestionPage.titlePage.visible).ok("No se visualiza la página de Seleccionar Centro de Gestión")
        .click(OCLASignarCentrosGestionPage.checkbox)
        .click(OCLASignarCentrosGestionPage.siguienteBtn)
}

export async function seleccionarTodosLosCentroGestion(OCLASignarCentrosGestionPage){
    await t
        .expect(OCLASignarCentrosGestionPage.titlePage.visible).ok("No se visualiza la página de Seleccionar Centro de Gestión")
        .click(OCLASignarCentrosGestionPage.chechkBoxTodos)
      //  .expect(OCLASignarCentrosGestionPage.mensajeSeleccionTodos.visible).ok("No se visualiza el mensaje de Selección")
        .click(OCLASignarCentrosGestionPage.siguienteBtn)
}



