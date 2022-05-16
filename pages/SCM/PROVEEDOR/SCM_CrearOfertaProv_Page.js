import { Selector,t } from "testcafe";

class SCMCrearOfertaProvPage{
    constructor(){
       this.titleLabel = Selector('#lblTituloPagina')
       this.nombreOfertaInput = Selector('#txtNombreOferta')
       this.motivoInput = Selector('#txtMotivoOfertaVacia')
       //*[@id="TblResultados"]//tr/td[7]/input
       this.cantProductosGrilla = Selector('#TblResultados').find('tr').child('td:nth-child(7)').child('input')
       this.respuestaDrp = Selector('#DDL_general')
       this.hayStock = Selector('#DDL_general').child('option:nth-child(3)')
       this.verificarBtn = Selector('#btnEnviar')
    }

    getNombreCot(){
        return Selector('#lblNombreCotizacion')
    }
    
    async agregarPrecio(){
        let cant = await this.cantProductosGrilla.count
        for (let i = 2; i <= cant+1; i++) {
            this.precio = Selector('#TblResultados').find('tr:nth-child(' + i + ')').child('td:nth-child(7)').child('input')
            await t.typeText(this.precio, "20")
        }
    } 

    async agregarDescuento(){
        let cant = await this.cantProductosGrilla.count
        for (let i = 2; i <= cant+1; i++) {
            this.descuento = Selector('#TblResultados').find('tr:nth-child(' + i + ')').child('td:nth-child(8)').child('input')
            await t.typeText(this.descuento, "10")
        }
    }

    async agregarFechaDespachoOferta(){
        let cant = await this.cantProductosGrilla.count
        for (let i = 2; i <= cant+1; i++) {
            this.fecha = Selector('#TblResultados').find('tr:nth-child(' + i + ')').child('td:nth-child(11)').child('input')
            await t.typeText(this.fecha, "28-12-2023")
        }
    }

    async agregarRespuesta(){
        await t
              .click(this.respuestaDrp)
              .click(this.hayStock)
    }  
}

export default new SCMCrearOfertaProvPage();

export async function setNombreYMotivo(SCMCrearOfertaProvPage, cot){
    let nombre = await SCMCrearOfertaProvPage.getNombreCot().textContent
    await t
         .expect(nombre).contains(cot)
         .typeText(SCMCrearOfertaProvPage.nombreOfertaInput, "Prueba QA Automatizada Cotización")
         .typeText(SCMCrearOfertaProvPage.motivoInput, "Motivo Aprobación. Prueba QA Automatizada")
}