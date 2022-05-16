import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class OCLAdministracionUsuarioPage{
    constructor(){
      this.titlePage = Selector('h3').withText('Administración de Usuarios')  
      this.nuevoUsuarioBtn = Selector('a').withText('Nuevo usuario')
      this.buscarUsuarioFiltro = Selector('#txtBusquedaRapida')
      this.lupaIcons = Selector('.fal.fa-search')
      this.descargaLink = Selector('#btnDescargarExcel')
    }

    getNombreGrilla(){
      return Selector('#datatable2 > tbody > tr:nth-child(1) > td:nth-child(3) > ul > li:nth-child(1) > span')
    }
}

export default new OCLAdministracionUsuarioPage();

export async function buscarUsuario(OCLAdministracionUsuarioPage, nombreFiltro){
    await t
      .typeText(OCLAdministracionUsuarioPage.buscarUsuarioFiltro, nombreFiltro)
      .click(OCLAdministracionUsuarioPage.lupaIcons)
    let nombre = await OCLAdministracionUsuarioPage.getNombreGrilla().textContent
    console.log(nombre)
    await t.expect(nombre.trim()).eql(nombreFiltro)
}

export async function validarDescargaExcel(OCLAdministracionUsuarioPage){
    await t.click(OCLAdministracionUsuarioPage.descargaLink)
    await t.wait(7000)
    let result = await Util.findFileOnDownloadDirectory("MantenedorDeUsuarios")
    await t.expect(result).ok('No se visualiza el documento descargado', { allowUnawaitedPromise: true })
}