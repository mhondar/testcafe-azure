import { Selector,t } from "testcafe";

class MKPImprimirCotizacionPage {
    constructor(){
        this.iFrame = Selector('#frame')
        this.downloadBtn = Selector('i').withAttribute("class","fa fa-download")
        this.volverLink = Selector('body > app-root > app-imprimir-cotizacion > div.page-header.m10top > div > ul > li:nth-child(1) > a')
    }

}
export default new MKPImprimirCotizacionPage();

export async function imprimirCotizacion(MKPDetalleCotizacionPage,MKPImprimirCotizacionPage) {
    await t
        .click(MKPDetalleCotizacionPage.imprimirBtn)
        .click(MKPImprimirCotizacionPage.downloadBtn)
 }