import { Selector, t} from "testcafe";

class SCMInformacionPMGuardadoPage{
    constructor(){
        this.titleInformacionPMLabel = Selector('#ctrPedido_tdTitulo')
        this.comentariosInput = Selector('#ctrPedido_txtComentarios')
        this.enviarBtn = Selector('#btnEnviar')
    }
}

export default new SCMInformacionPMGuardadoPage();