import { Selector,t } from "testcafe";
import { clearTextInput } from "../../helpers/shortcuts"

class SCMCreacionSubcontratoPage{
    constructor(){
        //datos Generales Subcontrato
        this.creacionSubcontratoTitle = Selector('#lblTitulo')
        this.nombreSubcontratoInput = Selector('#txtNombreSC')
        this.numeroSubcontratoInput = Selector('#txtNumeroSC')
        //Datos Comercial
        this.formaDePagoDrp = Selector('#lstFormaPago')
        this.periodicidadInput = Selector('#txtPeriodicidad')
        this.fechaFirmaInput = Selector('#txtFechaFirmaFECHA')
        this.fechaInicioInput = Selector('#txtFechaInicioFECHA')
        this.fechaTerminoInput = Selector('#txtFechaTerminoFECHA')
        this.comentariosInput = Selector('#txtComentarios')
        this.ingresarClausulaBtn = Selector('#lnkClausula')
        this.sinIvaRbn = Selector('input#rbnSinIVA')
        this.conIvaRbn = Selector('input#rbnConIVA')
        //datos Subcontratista
        this.buscarSubcontratistaBtn = Selector('#lnkProveedor')
        this.sucursalDrp = Selector('#lstSucursal')
        this.listarBtn = Selector('#lnkListarRepresentatesLegales')
        //Montos Netos
        this.monedaDrp = Selector('select#lstMoneda')
        this.anticipoDrp = Selector('select#lstAnticipoNeto')
        this.anticipoInput = Selector('#txtMontoAnticipoNeto')
        this.porcentajeRetencion = Selector('#txtMontoRetencionNeta')
        //Garantias
        this.garantiasAnticipoInput = Selector('#txtMontoGarantiaAnticipo')
        this.garantiaFielCumplimientoInput = Selector('#txtMontoGarantiaFielCumplimiento')
        this.garantiasRetencionesInput = Selector('#txtMontoGarantiaRetencion')
        this.tipoDocGarantiaDrp = Selector('#lstTipoDocAnticipo')
        this.tipoDocGarantiaFielCumpDrp = Selector('#lstTipoDocFielCumplimiento')
        this.tipoDocGarantiaRetDrp = Selector('#lstTipoDocRetenciones')
        this.fechaVencimientoGarantiaInput = Selector('#txtAnticipoGtiaFECHA')
        this.fechaVencimientoGarantiaFienInput = Selector('#txtFielGtiaFECHA')
        this.fechaVencimientoGarantiaRetencionesInput = Selector('#txtRetencionGtiaFECHA')
        //Servicios y Actividades
        this.ingresarPorMaestroBtn = Selector('#CtrLinea_lnkMaestro')
        this.cantLineasTabla = Selector('table#tblLineas > tbody > tr')
        this.editarLineasBtn = Selector('#btnEditarLineas')
        this.descuentoIcon = Selector('#tblLineas > tbody > tr:nth-child(7) > td:nth-child(3) > a')
        this.verificarBtn = Selector('#btnVerificar')
        this.buscarBtn = Selector('#CtrLinea_lnkCodigo')
        this.glosaServicioInput = Selector('#CtrLinea_txtLINGlosa')
        this.cantidadInput = Selector('#CtrLinea_txtLINCantidad')
        this.precioUnitarioInput = Selector('#CtrLinea_txtLINPrecioUnit')
        this.cuentasCostoInput = Selector('#CtrLinea_txtCCosto')
        this.ingresarLineaBtn = Selector('#CtrLinea_btnAgregarLinea')
        this.guardarSubcontratoLink = Selector('#btnGuardar')
    }

    getSucursal(nameSucursal){
        return Selector('option').withText(nameSucursal)
    }

    getSubcontratistaEmiteFactura(option){
        //input[@name = 'rbtEmiteFactura']/following-sibling::label[text() = 'No']
        return Selector('input').withAttribute('name', 'rbtEmiteFactura').nextSibling('label').withText(option)
    }

    getNombreRepresentante(){
        return Selector('#ctrRepresentantesLegalesSC_tbLista > tbody > tr.celdastextoblanco > td:nth-child(2)')
    }

    getMoneda(optionMoneda){
        return Selector('option').withText(optionMoneda)
    }

    getAnticipo(optionAnt){
        return Selector('option').withText(optionAnt)
    }

    getTipoAnticipo(optionAnticipo){
        return Selector('select#lstTipoDocAnticipo').find('option').withExactText(optionAnticipo)
    }

    getTipoFiel(optionTipoDocFiel){
        return Selector('select#lstTipoDocFielCumplimiento').find('option').withExactText(optionTipoDocFiel)
    }

    getTipoRetenciones(optionTipoDocRetenciones){
        return Selector('select#lstTipoDocRetenciones').find('option').withExactText(optionTipoDocRetenciones)
    }


    getDescuento(){
        return Selector('td#totalDescuentoSC').find('b')
    }

    getValorIva(){
        return Selector('#lblPorcImp')
    }

    getFormaDePago(pago){
        return Selector('option').withText(pago)
    }
}

export default new SCMCreacionSubcontratoPage();

export async function ingresarDatosGeneralesSubcontrato(SCMCreacionSubcontratoPage, nombreSub, numeroSub){
    await t
        .typeText(SCMCreacionSubcontratoPage.nombreSubcontratoInput, nombreSub)
        .typeText(SCMCreacionSubcontratoPage.numeroSubcontratoInput, numeroSub)
}

export async function ingresarFormaDePago(SCMCreacionSubcontratoPage, pago){
    await t
        .click(SCMCreacionSubcontratoPage.formaDePagoDrp)
        .click(SCMCreacionSubcontratoPage.getFormaDePago(pago))
}

export async function ingresarDatosComercial(SCMCreacionSubcontratoPage, periocidadDias, fechaFirma, fechaInicio, fechaTermino, comentario){
    
        await clearTextInput(SCMCreacionSubcontratoPage.periodicidadInput, periocidadDias)
        await t
            .typeText(SCMCreacionSubcontratoPage.fechaFirmaInput, fechaFirma)
            .typeText(SCMCreacionSubcontratoPage.fechaInicioInput, fechaInicio)
            .typeText(SCMCreacionSubcontratoPage.fechaTerminoInput, fechaTermino)
            .typeText(SCMCreacionSubcontratoPage.comentariosInput, comentario)
        
}

export async function ingresarDatosSubcontratista(SCMCreacionSubcontratoPage, nameSucursal, option){
    await t
        .click(SCMCreacionSubcontratoPage.sucursalDrp)
        .click(SCMCreacionSubcontratoPage.getSucursal(nameSucursal))
        .click(SCMCreacionSubcontratoPage.getSubcontratistaEmiteFactura(option))
}

export async function ingresarMontosNetos(SCMCreacionSubcontratoPage, optionMoneda, optionAnt, valorData, porcenatajeData){
    await t
        .click(SCMCreacionSubcontratoPage.monedaDrp)
        .click(SCMCreacionSubcontratoPage.getMoneda(optionMoneda))
        .click(SCMCreacionSubcontratoPage.anticipoDrp)
        .click(SCMCreacionSubcontratoPage.getAnticipo(optionAnt))
        .typeText(SCMCreacionSubcontratoPage.anticipoInput, valorData)
        .typeText(SCMCreacionSubcontratoPage.porcentajeRetencion, porcenatajeData)
}

export async function ingresarGarantias(SCMCreacionSubcontratoPage, garantiaAnticipoData, garantiaFielCumplData, garantiasRetencionesData, optionAnticipo, optionTipoDocFiel, optionTipoDocRetenciones, fecha){
    await clearTextInput(SCMCreacionSubcontratoPage.garantiasAnticipoInput, garantiaAnticipoData )
    await clearTextInput(SCMCreacionSubcontratoPage.garantiaFielCumplimientoInput, garantiaFielCumplData)
    await clearTextInput(SCMCreacionSubcontratoPage.garantiasRetencionesInput, garantiasRetencionesData)
    await t
        .click(SCMCreacionSubcontratoPage.tipoDocGarantiaDrp)
        .click(SCMCreacionSubcontratoPage.getTipoAnticipo(optionAnticipo))
        .click(SCMCreacionSubcontratoPage.tipoDocGarantiaFielCumpDrp)
        .click(SCMCreacionSubcontratoPage.getTipoFiel(optionTipoDocFiel))
        .click(SCMCreacionSubcontratoPage.tipoDocGarantiaRetDrp)
        .click(SCMCreacionSubcontratoPage.getTipoRetenciones(optionTipoDocRetenciones))
        .typeText(SCMCreacionSubcontratoPage.fechaVencimientoGarantiaInput, fecha)
        .typeText(SCMCreacionSubcontratoPage.fechaVencimientoGarantiaFienInput, fecha)
        .typeText(SCMCreacionSubcontratoPage.fechaVencimientoGarantiaRetencionesInput, fecha)
}

export async function validarCantidadLineasAgregadas(SCMCreacionSubcontratoPage, cantProd){
    let cant = await SCMCreacionSubcontratoPage.cantLineasTabla.count
    console.log(cant)
    await t.expect(cant - 6).eql(cantProd)
}

export async function ingresarDatosProducto(SCMCreacionSubcontratoPage, glosa, cantidad, precioProd, cuenta){
    await t
        .setTestSpeed(0.9)
        .typeText(SCMCreacionSubcontratoPage.glosaServicioInput, glosa)
        .wait(1000)
    await clearTextInput(SCMCreacionSubcontratoPage.cantidadInput, cantidad)
    await t.wait(1000)
    await clearTextInput(SCMCreacionSubcontratoPage.precioUnitarioInput, precioProd)
    await t
        .wait(1000)
        .typeText(SCMCreacionSubcontratoPage.cuentasCostoInput, cuenta)
        .click(SCMCreacionSubcontratoPage.ingresarLineaBtn)
}



