import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"

class MKPEditarPerfilComp {
    constructor(){
        this.titleLabel = Selector("h4").withText("Editar Perfil")
        this.nombreInput = Selector("input").withAttribute("formcontrolname","nombre")
        this.apellidoInput = Selector("input").withAttribute("formcontrolname","apellido")
        this.phoneInput = Selector("input#phone")
        this.guardarBtn = Selector("button").withText("Guardar")
    }

}
export default new MKPEditarPerfilComp();

export async function editarPerfil(MKPEditarPerfilComp, nombre, apellido, phone) {
    await clearTextInput(MKPEditarPerfilComp.nombreInput, nombre)
    await clearTextInput(MKPEditarPerfilComp.apellidoInput, apellido)
    await clearTextInput(MKPEditarPerfilComp.phoneInput, phone)
    await t.click(MKPEditarPerfilComp.guardarBtn)
}
