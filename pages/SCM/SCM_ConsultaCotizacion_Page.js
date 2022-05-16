import { Selector,t } from "testcafe";
import SCMHeaderComp from "../../pages/SCM/SCM_Header_Comp"
import Util from "./../../helpers/utils"
import CotizacionTempData from "../../temp/SCM/CotizacionTempData"
class SCMConsultaCotizacionPage{
    constructor(){
        this.titleLabel = Selector('#lblTitulo')
        this.consultaCotizacionDocumentoMenu = Selector('td').withText('Consultar Cotizaciones por Documento')
        this.cotizacionesGrilla = Selector('#tblCotizaciones').child('tbody').child('tr')
        this.estadoCotizacionFiltroSelect = Selector("#lstEstadoCotizacion")
        this.buscarBtn = Selector("#btnBuscar")
        this.numeroCotizacionInput = Selector("#txtNumeroCotizacion")
        this.nombreCotInput = Selector('#txtNombreCotizacion')
        this.centroGestionDrp = Selector('#lstCentroGestion')
    }

    getNombre(num){
        return Selector('#tblCotizaciones > tbody > tr:nth-child(' + num + ') > td:nth-child(2)')
    }

    getSolicitante(num){
        return Selector('#tblCotizaciones > tbody > tr:nth-child(' + num + ') > td:nth-child(4)')
    }

    getEstado(num){
        return Selector('#tblCotizaciones > tbody > tr:nth-child(' + num + ') > td:nth-child(8)')
    }

    getIconoEditar(num){
        return Selector('#tblCotizaciones > tbody > tr:nth-child(' + num + ') > td:nth-child(10) > a:nth-child(1)')
    }

    getEstadoOption(estado){
        return Selector("option").withText(estado)
    }

    getCotizacionesListPorEstado(estado){
        return Selector("table#tblCotizaciones").find("tr").find("td").withText(estado)
    }

    getOfertasRecibidasIndexEstadoCant(index,estado){
        //table[@id="tblCotizaciones"]//tr[3]/td[text()="COT Abierta"]/preceding-sibling::td[@class="ofertaLabel"]/b
        return Selector("table#tblCotizaciones").find("tr").nth(index).child("td").withText(estado).prevSibling("td.ofertaLabel").child("b")
    }

    getNumeroCotizacionPorIndexPorEstado(index,estado){
        //table[@id="tblCotizaciones"]//tr[3]/td[text()="COT Abierta"]/parent::tr/td
        return Selector("table#tblCotizaciones").find("tr").nth(index).child("td").withText(estado).parent("tr").child("td").withText("F")
    }

    getVerOfertaButtonPorIndexPorEstado(index,estado) {
        //table[@id="tblCotizaciones"]//tr[3]/td[text()="COT Abierta"]/parent::tr/td/a[@title="Ver Ofertas"]
        return Selector("table#tblCotizaciones").find("tr").nth(index).child("td").withText(estado).parent("tr").child("td").child("a").withAttribute("title","Ver Ofertas")
    }

    getEstadoCotizacion(estado) {
         //table[@id="tblCotizaciones"]//tr/td[text()="COT Enviada a Compra"]
         return Selector("table#tblCotizaciones").find("tr").child("td").withText(estado)

    }

    getCentroGestion(centro){
        return Selector('option').withText(centro)
    }

}

export default new SCMConsultaCotizacionPage();

export async function validarPageConsultaCotizacion(SCMConsultaCotizacionPage){
    await t
          .switchToIframe(SCMHeaderComp.iFrame)
          .expect(SCMConsultaCotizacionPage.titleLabel.visible).ok("No se visualiza la página Consulta Cotización")
}

export async function seleccionarCotizacion(SCMConsultaCotizacionPage, estadoCot, solicitName, nombreCot){
    await t
          .click(SCMConsultaCotizacionPage.consultaCotizacionDocumentoMenu)
          .expect(SCMConsultaCotizacionPage.cotizacionesGrilla.visible).ok("No se visualiza grilla con las cotizaciones")
    let count = await SCMConsultaCotizacionPage.cotizacionesGrilla.count
    let i = 2
    do {
        let nombre = await SCMConsultaCotizacionPage.getNombre(i).textContent
        let estado = await SCMConsultaCotizacionPage.getEstado(i).textContent
        let solicitante = await SCMConsultaCotizacionPage.getSolicitante(i).textContent
        if(estado.trim() == estadoCot && solicitante.trim() == solicitName) {
           await t.click(SCMConsultaCotizacionPage.getIconoEditar(i))
           return nombre;
        }
        else 
           i++; 
    } while (i <= count + 1) 
}

export async function buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage, estado){
    await t
        .click(SCMConsultaCotizacionPage.estadoCotizacionFiltroSelect)    
        .click(SCMConsultaCotizacionPage.getEstadoOption(estado))
        .click(SCMConsultaCotizacionPage.buscarBtn)
        .expect(SCMConsultaCotizacionPage.cotizacionesGrilla.visible).ok("No se visualiza grilla con las cotizaciones")
    let count = await SCMConsultaCotizacionPage.cotizacionesGrilla.count
    let countEstado = await SCMConsultaCotizacionPage.getCotizacionesListPorEstado(estado).count
    await t.expect(count-1).eql(countEstado, "Algún resultado de búsqueda no coincide con el criterio de Estado " + estado)
}

export async function seleccionarCotizacionPorEstadoYOfertasRandom(SCMConsultaCotizacionPage, estado, ofertas){
    let count = await SCMConsultaCotizacionPage.getCotizacionesListPorEstado(estado).count
    let indexCotizacionesOK = []
    for(let i = 1; i <= count; i++) {
        let ofertasRecibidasLabel = await SCMConsultaCotizacionPage.getOfertasRecibidasIndexEstadoCant(i,estado).textContent
        if(ofertasRecibidasLabel == ofertas) {
            indexCotizacionesOK.push(i)
        }
    }
    let randomNum = Util.between(0,indexCotizacionesOK.length-1)
    let numeroCotizacion = await SCMConsultaCotizacionPage.getNumeroCotizacionPorIndexPorEstado(indexCotizacionesOK[randomNum],estado).textContent
    await CotizacionTempData.setNumeroCotizacion(numeroCotizacion)  
    await t.click(SCMConsultaCotizacionPage.getVerOfertaButtonPorIndexPorEstado(indexCotizacionesOK[randomNum],estado))
}

export async function buscarCotizacionPorNoYValidar(SCMConsultaCotizacionPage,estado){
    let numero = await CotizacionTempData.getNumeroCotizacion()
    await t
        .typeText(SCMConsultaCotizacionPage.numeroCotizacionInput, numero)
        .wait(2000)
        .click(SCMConsultaCotizacionPage.buscarBtn)
    let cantCotizaciones = await SCMConsultaCotizacionPage.cotizacionesGrilla.count
    await t.expect(cantCotizaciones).eql(2,"Se muestra más de una cotización en el resultado")
    let numeroCotizacion = await SCMConsultaCotizacionPage.getNumeroCotizacionPorIndexPorEstado(1,estado).textContent
    await t.expect(numeroCotizacion).eql(numero, "No se muestra la Cotización buscada")
}

export async function buscarCotPorNombre(SCMConsultaCotizacionPage, nombre){
     await t
        .typeText(SCMConsultaCotizacionPage.nombreCotInput, nombre)
        .click(SCMConsultaCotizacionPage.buscarBtn)
        .expect(SCMConsultaCotizacionPage.getNombre(2).textContent).eql(nombre, "No se visualiza la cotización creada")
}
