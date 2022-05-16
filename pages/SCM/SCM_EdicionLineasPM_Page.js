import { Selector, t} from "testcafe";
import Util from "../../helpers/utils";
import { clearTextInput } from "../../helpers/shortcuts"

class SCMEdicionLineasPMPage{
    constructor(){
         this.titleEdicionLineasLabel = Selector('td').withText('Edición de Lineas de Pedido de Materiales') 
         this.productosGrilla = Selector('#tblLineas > tbody > tr')
         this.guardarBtn = Selector('a#btnGrabar')
         this.cerrarBtn = Selector('a#btnVolver')
    }
         getCostoCC(num){
             return Selector('#tblLineas > tbody > tr:nth-child('+num+') > td:nth-child(8) > input')
         }
    
}

export default new SCMEdicionLineasPMPage();

export async function agregarCantidad(SCMEdicionLineasPMPage){
    let cant = await SCMEdicionLineasPMPage.productosGrilla.count
    for (let i = 2; i < cant+1; i++) {
        let randomNumber = Util.between(1,5)
        let cantidad = Selector('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(2) > input');
        await t
            .selectText(cantidad)
            .pressKey('delete')
            .wait(1000)
            .typeText(cantidad,randomNumber.toString(),{replace: true, speed: 0.5})
            .click(SCMEdicionLineasPMPage.titleEdicionLineasLabel)
    }
} 

export async function agregarDiasDespacho(SCMEdicionLineasPMPage){
    let cant = await SCMEdicionLineasPMPage.productosGrilla.count
         for (let i = 2; i < cant + 1; i++) { 
            let dias = Selector('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(6) > input');
            await t
                .selectText(dias)
                .pressKey('delete')
                .wait(1000)
                .typeText(dias,'5',{replace: true, speed: 0.5})
                .click(SCMEdicionLineasPMPage.titleEdicionLineasLabel)
      }       
}

 export async function agregarGlosa(SCMEdicionLineasPMPage){
    let cant = await SCMEdicionLineasPMPage.productosGrilla.count
    for (let i = 2; i < cant + 1; i++) {
        let glosa = Selector('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(7) > input');
        await t
                .selectText(glosa)
                .wait(1000)
                .typeText(glosa,'glosa PA',{replace: true, speed: 0.5})
                .click(SCMEdicionLineasPMPage.titleEdicionLineasLabel)
    }
} 

export async function agregarCuentasCosto(SCMEdicionLineasPMPage){
    let cant = await SCMEdicionLineasPMPage.productosGrilla.count
    for (let i = 2; i < cant + 1; i++) {
        let costo = await SCMEdicionLineasPMPage.getCostoCC(i)
        await t
                .selectText(costo)
                .wait(1000)
                .typeText(costo,'28',{replace: true, speed: 0.5})
                .click(SCMEdicionLineasPMPage.titleEdicionLineasLabel)
    }
}    

   