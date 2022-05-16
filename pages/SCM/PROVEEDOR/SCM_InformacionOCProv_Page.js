import { Selector,t } from "testcafe";
import Util from "../../../helpers/utils";
import { clearTextInput } from "../../../helpers/shortcuts"

class SCMInformacionOCProvPage{
    constructor(){ 
        this.codigoProvInput = Selector('#tblLineas').find('tr').find('input')
        this.numeroReferenciaInput = Selector('#txtReferencia')
        this.observacionesInput = Selector('#txtObservaciones')
        this.aceptarBtn = Selector('#btnAceptar')
    }

    getNumeroOC(){
        return Selector('#lblNroOrden')
    }
    
    async setCodigoProveedor(){
        let cant = await this.codigoProvInput.count
        console.log(cant)
        for (let i = 2; i <= cant+1; i++) {
           let randomNumber = Util.between(100,1000)
            this.codigoInput = Selector('#tblLineas > tbody > tr:nth-child('+i+')> td:nth-child(9) > input');
            await clearTextInput(this.codigoInput, randomNumber.toString());
        }
    }
}

export default new SCMInformacionOCProvPage();

export async function completarDatosAprobacion(SCMInformacionOCProvPage){
        let randomNumber = Util.between(1,100)
        await t
             .typeText(SCMInformacionOCProvPage.numeroReferenciaInput, randomNumber.toString())
             .typeText(SCMInformacionOCProvPage.observacionesInput, "Prueba Automatizada")
             .setNativeDialogHandler(() => true)
             .click(SCMInformacionOCProvPage.aceptarBtn)
}
