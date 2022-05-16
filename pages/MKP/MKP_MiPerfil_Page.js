import { Selector, t} from "testcafe";
import { editarPerfil } from "../../pages/MKP/MKP_EditarPerfil_Comp"

class MKPMiPerfilPage {
    constructor(){
        this.usuarioNameLabel = Selector('h4').child("strong")
        this.editarBtn = Selector('span.icon-circle-lg')
        this.telefonoLabel = Selector("li").child("strong").withText("Teléfono").parent("li")
    }

}
export default new MKPMiPerfilPage();

export async function changeProfileAndCheck(MKPMiPerfilPage, MKPEditarPerfilComp, MKPNotificacionPopup, nombre, apellido, phone) {
    await t
            .click(MKPMiPerfilPage.editarBtn)
            .expect(MKPEditarPerfilComp.titleLabel.visible).ok()
        await editarPerfil(MKPEditarPerfilComp, nombre, apellido, phone)
        await t.expect(MKPNotificacionPopup.notifyMessage.visible).ok()
        let message = await MKPNotificacionPopup.notifyMessage.textContent
        let telefono = await MKPMiPerfilPage.telefonoLabel.textContent
        let usuarioName = await MKPMiPerfilPage.usuarioNameLabel.textContent
        await t
            .expect(message).eql("Los datos del usuario " + nombre + " " + apellido + " se han modificado correctamente.")
            .expect(usuarioName).eql(nombre + " " + apellido)
            .expect(telefono).contains(phone)
}