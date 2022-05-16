import { Selector,t } from "testcafe";
const clienteData = require('../../data/MKP/clienteData.json');

class MKPDetalleCotizacionPage {
    constructor(){
        this.titleCotizacion = Selector('h2')
        this.ocultarResumenBtn = Selector('i').withAttribute("class","fa fa-angle-double-left")
        this.imprimirBtn = Selector('a').withText("Imprimir")
        this.historialTab = Selector('a').withText("Historial")
        this.historialVisible = Selector('div#historial').withAttribute("class","tab-pane fade historial-detalle active in")
        this.lineasTab = Selector('a').withText("Líneas")
        this.lineasVisible = Selector('div#lineas').withAttribute("class","tab-pane fade active in")
        this.panelCostadoVisible = Selector('nav#id-panel-costado').withAttribute("class","navbar-primary")
        this.panelCostadoOculto = Selector('nav#id-panel-costado').withAttribute("class","navbar-primary collapsed")



    }

}
export default new MKPDetalleCotizacionPage();