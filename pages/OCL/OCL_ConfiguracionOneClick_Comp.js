import { Selector,t } from "testcafe";

class OCLConfiguracionOneClickComp{
    constructor(){
        this.titlePage = Selector('#lblLinkPaginas')
        this.UsuarioIcons = Selector('i').withAttribute('class', 'fal fa-users fa-4x')
    }
}

export default new OCLConfiguracionOneClickComp();