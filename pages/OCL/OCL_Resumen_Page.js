import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class OCLResumenPage{
    constructor(){
        this.atributosUsuariosLabel = Selector('strong').withText('Atributos de los usuarios')
        this.finalizarBtn = Selector('#btnFinalizar')
        this.descargaLink = Selector('#btnDescargarExcel')
        this.editarUsuarioIcons = Selector('i.fa.fa-pencil')
     
    }
}

export default new OCLResumenPage();

export async function validarDescargaExcel(OCLResumenPage){
    await t.click(OCLResumenPage.descargaLink)
    await t.wait(7000)
    let result = await Util.findFileOnDownloadDirectory("ExcelResumen")
    await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
}

