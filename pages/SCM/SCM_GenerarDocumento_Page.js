import { Selector,t } from "testcafe";

class SCMGenerarDocumentoPage{
    constructor(){
        this.titleGenerarDocumentoLabel = Selector('#hedInicio')
        this.nombreOrdenInput = Selector('#txtNombre')
        this.generarBtn = Selector('#btnGenerar')
        this.grillaProductos = Selector('#tblLineasPedido').find('tr')
    }
}

export default new SCMGenerarDocumentoPage();

