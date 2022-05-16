import { Selector,t } from "testcafe";

class MKPObraProyectoPage {
    constructor(){
        this.obraProyectoIFrame = Selector('#frame')
        this.obraProyectoMigaPan = Selector('li').withText("Obra/Proyecto")
        this.obraProyectoTitle = Selector("h2").child("strong")
        this.enviarMensajeList = Selector("div#collapse-contactos").child("div").child("div").find("a").withAttribute("class","btn btn-sm contactar")
        this.verMasProyectosButton = Selector('a').withText("Ver más Proyectos")
        this.constructoraLabel = Selector("strong").withText("Constructora:").sibling("a")
    }
}
export default new MKPObraProyectoPage();

export async function validarComponentesContactoVisibles(MKPObraProyectoPage) {
    await t
        .expect(MKPObraProyectoPage.obraProyectoMigaPan.visible).ok()
        .wait(2000)
    let cant = await MKPObraProyectoPage.enviarMensajeList.count
    for(let i = 0; i < cant ; i++) {
        await t
            .click(Selector("div#collapse-contactos").child("div").child("div").nth(i).find("a").withAttribute("class","btn btn-sm contactar"))
            .expect(Selector("div#collapse-contactos").child("div").child("div").nth(i).find("label").withText("Motivo del Contacto").sibling("input").visible).ok()
            .expect(Selector("div#collapse-contactos").child("div").child("div").nth(i).find("label").withText("Mensaje").sibling("input").visible).ok()
            .expect(Selector("div#collapse-contactos").child("div").child("div").nth(i).find("label").withText("Adjuntar Archivo").sibling("input").visible).ok()
            .expect(Selector("div#collapse-contactos").child("div").child("div").nth(i).find("a").withText("Enviar").visible).ok()
    }
 }


