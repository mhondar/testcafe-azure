import { Selector,t } from "testcafe";

class SCMCrearOrdenPage {
    constructor(){
        this.crearOrdenFormIframe = Selector('#ventana')
        this.titleLabel = Selector('.titulopagina2').withText('Orden de compra')
        this.proveedorInputText = Selector('div[class="filter-option-inner-inner"] > .form-control')
        this.proveedorSearchInputText = Selector('div[class="bs-searchbox"] > .form-control')
        this.nombreOrdenInputText = Selector('#txtNomOc')
        this.maestroButton = Selector('#ctrLineaOrdenCompra_lnkMaestro')
    }

    getSeleccionarProveedor(proveedor){
        return Selector('span[title="' + proveedor + '"]');
    }


}
export default new SCMCrearOrdenPage();