import { Selector } from 'testcafe'
import xPathToCss from 'xpath-to-css'


class SCMHomePage {
    constructor(){
        // this.welcomeLabel = Selector(xPathToCss('//h5/strong'))
        // this.detallesIframe = Selector(xPathToCss('//iframe[@id="ventana"]'))
        this.detallesIframe = Selector('#ventana')
        this.welcomeLabel = Selector('h5 > strong')
        this.miEscritorioIcons = Selector('img#Image1')
        this.cerrarSesionIcons = Selector('img#Image4')  
        this.bienvenidoLabel = Selector('strong').withText('Bienvenido a Su Escritorio Sr(a). Nelson Lorca')
        this.centroGestionIcons = Selector('img#Image5')
    }

    getCentroGestionLabel(){
        return Selector('#ControlMenu1_lblusername')
    }

}
export default new SCMHomePage();