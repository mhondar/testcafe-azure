import { Selector,t } from "testcafe";

class SCMIngresoNotaCorreccionPage{
    constructor(){
        this.titleLabel = Selector('span').withText('Ingreso de Nota de Corrección')
        this.proveedorInput = Selector('#txtRutProveedor')
        this.lupaImg = Selector('#imgRutProv')
        this.sucursalDrp = Selector('#lstSucursal')
        this.tipoDocDrp = Selector('select#lstTipoNota')
        this.numeroInput = Selector('input#txtNumDoc')
        this.folioUnicoInput = Selector('input#txtFolioUnico')
        this.fechaEmisionInput = Selector('input#txtFecEmiDocumentoFECHA')
        this.totalNetoInput = Selector('#txtMontoNeto')
        this.ivaInput = Selector('input#txtMontoIVA')
        this.ivaNoRecuperableInput = Selector('input#txtIVANoRecuperable')
        this.aceptarBtn = Selector('#btnAceptar1')
        this.asociarDocumentoBtn = Selector('#ctrCorreccionVista_btnAsociar')
        this.aceptarMontoBtn = Selector('#btnAceptar')
        this.facturaGrilla = Selector('#ctrCorreccionVista_ctrDetalle_tblDocumentos > tbody > tr:nth-child(2)')
        this.documentosAsociadosGrilla = Selector('#ctrCorreccionVista_ctrDetalle_tblDocumentos > tbody > tr')
        this.volverBtn = Selector('#btnVolver')
    }

    getRazonSocialLabel(){
        return Selector('#lblRazonSocialProv')
    }

    getOption(name){
        return Selector('option').withText(name)
    }

    getMontoPorCorregir(){
        return Selector('#ctrCorreccionVista_ctrDetalle_tblDocumentos > tbody > tr:nth-child(2) > td:nth-child(10)')
    }

    getOpcionesEliminar(num){
        return Selector('#ctrCorreccionVista_ctrDetalle_tblDocumentos > tbody > tr:nth-child('+num+') > td:nth-child(11) > a')
    }
  
}

export default new SCMIngresoNotaCorreccionPage();

export async function ingresarDatosProveedor(SCMIngresoNotaCorreccionPage, rutProv, prov, sucursal){
    await t
        .typeText(SCMIngresoNotaCorreccionPage.proveedorInput, rutProv)
        .click(SCMIngresoNotaCorreccionPage.lupaImg)
    let razon = await SCMIngresoNotaCorreccionPage.getRazonSocialLabel().textContent
    await t     
        .expect(razon).contains(prov)
        .click(SCMIngresoNotaCorreccionPage.sucursalDrp)
        .click(SCMIngresoNotaCorreccionPage.getOption(sucursal))
}

export async function ingresarDatosNota(SCMIngresoNotaCorreccionPage, tipofactura, noDoc, folio, fecha){
    await t
        .click(SCMIngresoNotaCorreccionPage.tipoDocDrp)    
        .click(SCMIngresoNotaCorreccionPage.getOption(tipofactura))
        .typeText(SCMIngresoNotaCorreccionPage.numeroInput, noDoc)
        .typeText(SCMIngresoNotaCorreccionPage.folioUnicoInput, folio)
        .typeText(SCMIngresoNotaCorreccionPage.fechaEmisionInput, fecha)
}

export async function ingresarMontosNota(SCMIngresoNotaCorreccionPage, totalNetoValor, ivaValor){
    await t
        .typeText(SCMIngresoNotaCorreccionPage.totalNetoInput, totalNetoValor)
        .typeText(SCMIngresoNotaCorreccionPage.ivaInput, ivaValor)
        .typeText(SCMIngresoNotaCorreccionPage.ivaNoRecuperableInput, ivaValor)
}

export async function validarMontoPorCorregir(SCMIngresoNotaCorreccionPage){
    let monto = await SCMIngresoNotaCorreccionPage.getMontoPorCorregir().textContent
    await t
        .expect(monto).eql("0,00", "El monto por corregir es diferente a cero")
        .click(SCMIngresoNotaCorreccionPage.aceptarMontoBtn)
}

export async function validarGrillaDocumentosAsociadosYEliminarDoc(SCMIngresoNotaCorreccionPage){
    await t.expect(SCMIngresoNotaCorreccionPage.facturaGrilla.visible).ok("No se visualiza la grilla con Documentos Asociados")
    let cant = await SCMIngresoNotaCorreccionPage.documentosAsociadosGrilla.count 
    for (let i = 2; i <= cant; i++) {
        await t
            .setNativeDialogHandler(() => true)
            .click(SCMIngresoNotaCorreccionPage.getOpcionesEliminar(i))  
    }
    let cantFactura = await SCMIngresoNotaCorreccionPage.documentosAsociadosGrilla.count 
    await t
        .expect(cantFactura).eql(1, "No se eliminaron las facturas asociadas a la nota de corrección")
        .click(SCMIngresoNotaCorreccionPage.volverBtn)
}

