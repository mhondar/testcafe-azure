import { Selector, t} from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"

class MKPEmpresaPage {
    constructor(){
        this.empresasTab = Selector("div#tabempresas")
        this.editarEmpresaBtn = Selector('a').withAttribute("data-toggle", "modal")  
        this.informacionGeneralTab = Selector("a").withText("INFORMACIÓN GENERAL").parent("li.active")
        this.editarInformacionGeneralBtn = Selector("div#tabPerfil").find("a").withAttribute("class", "btn-link pull-right m10top")
        this.nombreComercialInput = Selector("input").withAttribute("formcontrolname", "nombrecomercial")
        this.tramoSegunVentasSelect = Selector("label").withText("Tramo según ventas *").sibling("div").find("button")
        this.guardarInformacionGeneralBtn = Selector("div#tabPerfil").find("button").withAttribute("class","btn btn-sm btn btn-success mensaje-edicion-empresa")
        this.nombreComercialLabel = Selector("strong").withText("Nombre Comercial").parent("li")
        this.tramoComercialSegunVentasLabel = Selector("strong").withText("Tramo según ventas").parent("li")
        this.categoriasPalabrasClavesTab = Selector("a").withText("CATEGORÍAS Y PALABRAS CLAVE")
        this.editarCategoriasBtn = Selector("div#tabCatalogo").child("app-info-categorias").find("a").withAttribute("class", "btn-link pull-right")
        this.guardarCategoriaBtn = Selector("a").withAttribute("class", "btn btn-sm btn btn-success confirmacion-categorizacion pull-right")
        this.buscarCategoriaInput = Selector("input").withAttribute("placeholder", " Buscar categorías")
        this.categoriaFiltradaCheck = Selector("tree-node").find("input").withAttribute("type", "checkbox")
        this.editarPalabrasClaveBtn = Selector("div#tabCatalogo").child("app-info-palabrasclave").find("a").withAttribute("class", "btn-link pull-right")
        this.addPalabraClaveInput = Selector("div.mat-chip-list-wrapper")
        this.guardarPalabraClaveBtn = Selector("app-info-palabrasclave").find("button").withAttribute("class", "btn btn-sm btn btn-success mensaje-edicion-empresa")
        this.quitarPalabraClaveIcon = Selector("mat-icon")
    }

    getTramoSegunVentasOption(opcion) {
        return Selector("span").withText(opcion)
    }

    getCategoriaByName(name) {
        return Selector("span").withText(name)
    }

    getCategoriaPageTitle(name) {
        return Selector("strong").withText(name)
    }

    getCategoriaTargetByName(name) {
        return Selector("span").withAttribute("class", "label label-md label-info ng-star-inserted").withText(name)
    }

    getPalabraClaveTag(name) {
        return Selector("span").withText(" " + name + " ")
    }

}
export default new MKPEmpresaPage();

export async function editarInformacionGeneralEmpresaYValidar(MKPEmpresaPage, MKPNotificacionPopup, nombreComercial, tramoVentas, nombreCompletoUsuario) {
    await t 
        .expect(MKPEmpresaPage.informacionGeneralTab.visible).ok()
        .click(MKPEmpresaPage.editarInformacionGeneralBtn)
    await clearTextInput(MKPEmpresaPage.nombreComercialInput, nombreComercial)
    await t
        .click(MKPEmpresaPage.tramoSegunVentasSelect)
        .click(MKPEmpresaPage.getTramoSegunVentasOption(tramoVentas))
        .click(MKPEmpresaPage.guardarInformacionGeneralBtn)
        .expect(MKPNotificacionPopup.notifyMessage.visible).ok()
    let message = await MKPNotificacionPopup.notifyMessage.textContent
    await t
        .expect(message).eql("Los cambios realizados en el perfil de la Empresa " + nombreCompletoUsuario + " se han aplicado correctamente.")
    let nombreComercialLabel = await MKPEmpresaPage.nombreComercialLabel.textContent
    await t 
        .expect(nombreComercialLabel).contains(nombreComercial)
    let tramoComercialLabel = await MKPEmpresaPage.tramoComercialSegunVentasLabel.textContent
    await t 
        .expect(tramoComercialLabel).contains(tramoVentas)
}

export async function agregarCategoriaYValidar(MKPEmpresaPage, MKPNotificacionPopup, categoria, subcategoria, nombreCompletoUsuario) {
    let tabVisible = await MKPEmpresaPage.getCategoriaTargetByName(subcategoria).visible
    if(tabVisible) {
        await quitarCategoriaYValidar(MKPEmpresaPage, MKPNotificacionPopup, categoria, subcategoria, nombreCompletoUsuario)
    }
    await t
        .click(MKPEmpresaPage.editarCategoriasBtn)
        .click(MKPEmpresaPage.getCategoriaByName(categoria))
        .expect(MKPEmpresaPage.getCategoriaPageTitle(categoria).visible).ok()
    await clearTextInput(MKPEmpresaPage.buscarCategoriaInput, subcategoria)
    await t
        .click(MKPEmpresaPage.categoriaFiltradaCheck)
        .click(MKPEmpresaPage.guardarCategoriaBtn)
        .expect(MKPNotificacionPopup.notifyMessage.visible).ok()
    let message = await MKPNotificacionPopup.notifyMessage.textContent
    await t
        .expect(message).eql("Se han modificado las categorias de la empresa " + nombreCompletoUsuario)
        .expect(MKPEmpresaPage.getCategoriaTargetByName(subcategoria).visible).ok()
}

export async function quitarCategoriaYValidar(MKPEmpresaPage, MKPNotificacionPopup, categoria, subcategoria, nombreCompletoUsuario) {
    let tabVisible = await MKPEmpresaPage.getCategoriaTargetByName(subcategoria).visible
    if(!tabVisible) {
        await agregarCategoriaYValidar(MKPEmpresaPage, MKPNotificacionPopup, categoria, subcategoria, nombreCompletoUsuario)
    }
    await t
        .click(MKPEmpresaPage.editarCategoriasBtn)
        .click(MKPEmpresaPage.getCategoriaByName(categoria))
        .expect(MKPEmpresaPage.getCategoriaPageTitle(categoria).visible).ok()
    await clearTextInput(MKPEmpresaPage.buscarCategoriaInput, subcategoria)
    await t
        .click(MKPEmpresaPage.categoriaFiltradaCheck)
        .click(MKPEmpresaPage.guardarCategoriaBtn)
        .expect(MKPNotificacionPopup.notifyMessage.visible).ok()
    let message = await MKPNotificacionPopup.notifyMessage.textContent
    await t.expect(message).eql("Se han modificado las categorias de la empresa " + nombreCompletoUsuario)
    await t.expect(MKPEmpresaPage.getCategoriaTargetByName(subcategoria).exists).notOk('Categoria esta visible', { timeout: 5000 })     
}

export async function agregarPalabraClave(MKPEmpresaPage, MKPNotificacionPopup, palabraClave, nombreCompletoUsuario) {
    await t
        .click(MKPEmpresaPage.editarPalabrasClaveBtn)
        .click(MKPEmpresaPage.addPalabraClaveInput)
    let stringPress = palabraClave.split('').join(' ')
    await t
        .pressKey(stringPress)
        .pressKey('enter')
        .click(MKPEmpresaPage.guardarPalabraClaveBtn)
        .expect(MKPNotificacionPopup.notifyMessage.visible).ok()
    let message = await MKPNotificacionPopup.notifyMessage.textContent
    await t
        .expect(message).eql("Se han actualizado las palabras clave de la Empresa " + nombreCompletoUsuario + ".") 
        .click(MKPEmpresaPage.editarPalabrasClaveBtn)
        .expect(MKPEmpresaPage.quitarPalabraClaveIcon.exists).ok('Palabra Clave no visible', { timeout: 5000 })
        .wait(2000)  
        .click(MKPEmpresaPage.guardarPalabraClaveBtn)
}

export async function quitarPalabraClave(MKPEmpresaPage, MKPNotificacionPopup, nombreCompletoUsuario) {
    await t
        .click(MKPEmpresaPage.editarPalabrasClaveBtn)
        .click(MKPEmpresaPage.quitarPalabraClaveIcon)
        .click(MKPEmpresaPage.guardarPalabraClaveBtn)
        .expect(MKPNotificacionPopup.notifyMessage.visible).ok()
    let message = await MKPNotificacionPopup.notifyMessage.textContent
    await t
        .expect(message).eql("Se han actualizado las palabras clave de la Empresa " + nombreCompletoUsuario + ".") 
        .click(MKPEmpresaPage.editarPalabrasClaveBtn)
        .expect(MKPEmpresaPage.quitarPalabraClaveIcon.exists).notOk('Palabra Clave visible', { timeout: 5000 })
}