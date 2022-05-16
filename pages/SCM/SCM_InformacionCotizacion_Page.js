import { Selector,t } from "testcafe";

class SCMInformacionCotizacionPage{
    constructor(){
          this.title = Selector('#ctrCotizacion_Label1')
          this.enviarBtn = Selector('#btnEnviar')

    }
}

export default new SCMInformacionCotizacionPage();