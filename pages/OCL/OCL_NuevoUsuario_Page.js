import { Selector,t } from "testcafe";

class OCLNuevoUsuarioPage{
    constructor(){
        this.titlePage = Selector('strong').withText('¿Qué tipo de creación deseas realizar?')
        this.copiarUsuarioExistenteIcons = Selector('h3').withText('Copiar usuario existente')
        this.crearUsuarioReemplazoDefinitivoIcons = Selector('h3').withText('Crear usuario de reemplazo definitivo')
    }
}

export default new OCLNuevoUsuarioPage();