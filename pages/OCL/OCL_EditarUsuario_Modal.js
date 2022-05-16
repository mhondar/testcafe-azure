import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"
import Util from "../../helpers/utils";

class OCLEditarUsuarioModal{
    constructor(){
        this.titleModal = Selector('h4').withText('Editar usuario')
        this.rutInput = Selector('#rutEditado')
        this.apellidoMaternoInput = Selector('#apellidoMEditado')
        this.aplicarBtn = Selector('#btnAplicar')
        this.mensaje = Selector('span').withText('La información del usuario se ha modificado correctamente.')
    }
}

export default new OCLEditarUsuarioModal();

export async function editarRutYApellidoUsuario(OCLEditarUsuarioModal){
    const rut = require('../../data/GENERIC/rut.json');
    const rutUser = Util.getRandomValueFromJson(rut)
    await t.typeText(OCLEditarUsuarioModal.rutInput, rutUser)
    await clearTextInput(OCLEditarUsuarioModal.apellidoMaternoInput, "PruebaQA")
    await t.click(OCLEditarUsuarioModal.aplicarBtn)
    await t.expect(OCLEditarUsuarioModal.mensaje.visible).ok("No se visualiza mensaje de éxito al actualizar datos del usuario")
}