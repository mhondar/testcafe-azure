import { Selector,t } from "testcafe";

class SCMSeleccionarCentroGestionPage{
    constructor(){
        this.titleLabel = Selector('.titulopagina2')
        this.detallesIframe = Selector('#ventana')

    }

    getCentroGestion(nombreCentro){
        return Selector('a').withText(nombreCentro)
    }
}

export default new SCMSeleccionarCentroGestionPage();

export async function seleccionarCentroGestion(SCMSeleccionarCentroGestionPage, nombreCentro){
    await t
        .switchToIframe(SCMSeleccionarCentroGestionPage.detallesIframe)
        .expect(SCMSeleccionarCentroGestionPage.titleLabel.visible).ok("No se visualiza la página de Seleccionar Centro de gestión en que se trabajará")
        .click(SCMSeleccionarCentroGestionPage.getCentroGestion(nombreCentro))
}