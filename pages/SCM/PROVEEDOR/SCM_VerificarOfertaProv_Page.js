import { Selector,t } from "testcafe";

class SCMVerificarOfertaProvPage{
    constructor(){
        this.titleLabel = Selector('#lblTitulo')
        this.enviarBtn = Selector('#btnEnviar')
    }

    getNombreCot(){
        return Selector('#ctrVerOferta_lblNombreCotizacion')
    }
}

export default new SCMVerificarOfertaProvPage();

export async function verificarOfertaYEnviar(SCMVerificarOfertaProvPage, cot){
     await t.expect(SCMVerificarOfertaProvPage.titleLabel.visible).ok("No se visualiza la página VerificarOferta")
     let nombre = await SCMVerificarOfertaProvPage.getNombreCot().textContent
     await t
          .expect(nombre).contains(cot)
          .setNativeDialogHandler(() => true)
          .click(SCMVerificarOfertaProvPage.enviarBtn)
}