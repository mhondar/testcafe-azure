import { Selector,t } from "testcafe";

class SCMConsultarCotizacionesProvPage{
    constructor(){
        this.title = Selector('#lblTitulo')
        this.nombreCotInput = Selector('#txtNombre')
        this.buscarBtn = Selector('#btnBuscar')
        this.resultadoGrilla = Selector('#TblResultados')
        this.filasGrilla = Selector('#TblResultados').child('tbody').child('tr')
        this.numeroCotInput = Selector('#txtNumero')
    }

    getNumeroCot(num){
        return Selector('#TblResultados > tbody > tr:nth-child(' + num + ') > td:nth-child(1)')
    }

    getNombreCot(num){
        return Selector('#TblResultados > tbody > tr:nth-child(' + num + ') > td:nth-child(2)')
    }

    getNombreSolicitante(num){
        return Selector('#TblResultados > tbody > tr:nth-child(' + num + ') > td:nth-child(5)')
    }

    getEstadoCot(num){
        return Selector('#TblResultados > tbody > tr:nth-child(' + num + ') > td:nth-child(11)')
    }

    getIconoPeso(num){
        return Selector('#TblResultados > tbody > tr:nth-child('+num+') > td:nth-child(13) > a:nth-child(1)')
       // return Selector('#TblResultados > tbody > tr:nth-child(' + num + ') > td:nth-child(13) > a:nth-child(1) > img')
    }

    getEstadoOferta(num){
        return Selector('#TblResultados > tbody > tr:nth-child(' + num + ') > td:nth-child(8)')
    }

    getNombreEmpresa(num){
        return Selector('#TblResultados > tbody > tr:nth-child('+num+') > td:nth-child(3) > a')
    }
}

export default new SCMConsultarCotizacionesProvPage();

export async function buscarCotPorNombre(SCMConsultarCotizacionesProvPage, cot){
        await t
              .typeText(SCMConsultarCotizacionesProvPage.nombreCotInput, cot)
              .click(SCMConsultarCotizacionesProvPage.buscarBtn)
              .expect(SCMConsultarCotizacionesProvPage.resultadoGrilla.visible).ok("No se visualiza grilla de resultados de cotizaciones")
}

export async function seleccionarCotPorEstado(SCMConsultaCotizacionPage, cot){
    let count = await SCMConsultaCotizacionPage.filasGrilla.count
    let i = 2
    do {
        let nameEmpresa = await SCMConsultaCotizacionPage.getNombreEmpresa(i).textContent
        let nameSolic = await SCMConsultaCotizacionPage.getNombreSolicitante(i).textContent
        let estadoCot = await SCMConsultaCotizacionPage.getEstadoCot(i).textContent
        let estadoOferta = await SCMConsultaCotizacionPage.getEstadoOferta(i).textContent
        let numeroCot = await SCMConsultaCotizacionPage.getNumeroCot(i).textContent
        if(nameEmpresa.trim() == "CompradorSelenium" &&  nameSolic.trim() == "Nelson Lorca" && estadoCot.trim() == "COT Abierta"  && estadoOferta == "") {
            await t.click(SCMConsultaCotizacionPage.getIconoPeso(i))
            return numeroCot;
            break;
        }
        else 
           i++; 
    } while (i <= count + 1)  
}

export async function buscarCotPorNumero(SCMConsultaCotizacionPage, cot){
    await t
         .typeText(SCMConsultaCotizacionPage.numeroCotInput, cot)
         .click(SCMConsultaCotizacionPage.buscarBtn)
    let numeroCot = await SCMConsultaCotizacionPage.getNumeroCot(2).textContent
    let estOferta = await SCMConsultaCotizacionPage.getEstadoOferta(2).textContent
    await t
          .expect(numeroCot.trim()).eql(cot, "No coinciden los números de la cotizaciones")
          .expect(estOferta.trim()).eql("Enviada")   
}