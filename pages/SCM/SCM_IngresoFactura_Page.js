import { Selector,t } from "testcafe";
import Utils from "../../helpers/utils";

class SCMIngresoFactura{
    constructor(){
        this.titleLabel = Selector('#Header1')
        this.proveedorInput = Selector('#txtRutProveedor')
        this.lupaImg = Selector('#imgRutProveedor')
        this.sucursalDrp = Selector('#lstSucursal')
        this.tipoFacturaDrp = Selector('select#lstTipoFactura')
        this.numeroFacturaInput = Selector('input#txtNumFactura')
        this.folioUnicoInput = Selector('input#txtFolioUnico')
        this.fechaEmisionInput = Selector('input#txtFecEmiFacturaFECHA')
        this.totalNetoInput = Selector('input#txtMontoAfecto')
        this.ivaInput = Selector('input#txtMontoIVA')
        this.aceptarBtn = Selector('a#btnAceptar1')
        

    }

    getRazonSocial(){
        return Selector('#lblRazonSocialProv')
    }

    getSucursal(name){
        return Selector('option').withText(name)
    }

    getTipoFactura(name){
        return Selector('option').withText(name)
    }
}

export default new SCMIngresoFactura();

export async function ingresarDatosProveedor(SCMIngresoFactura, rutProv, sucursal){
        await t
            .typeText(SCMIngresoFactura.proveedorInput, rutProv)
            .click(SCMIngresoFactura.lupaImg)
        let razon = await SCMIngresoFactura.getRazonSocial().textContent
        await t     
            .expect(razon).contains(rutProv)
            .click(SCMIngresoFactura.sucursalDrp)
            .click(SCMIngresoFactura.getSucursal(sucursal))
}

export async function ingresarDatosFactura(SCMIngresoFactura, tipofactura, noFactura, folio, fecha){
    await t
        .click(SCMIngresoFactura.tipoFacturaDrp)    
        .click(SCMIngresoFactura.getTipoFactura(tipofactura))
        .typeText(SCMIngresoFactura.numeroFacturaInput, noFactura)
        .typeText(SCMIngresoFactura.folioUnicoInput, folio)
        .typeText(SCMIngresoFactura.fechaEmisionInput, fecha)
}

export async function ingresarMontosFactura(SCMIngresoFactura, totalNetoValor, ivaValor){
    let monto =  Utils.between(6050, 7000)
    let iva = monto * 19 / 100
    // if(iva % 1 == 0){
    //     console.log("Iva valor no decimal")
    // }
    // else {
    //     var valor = iva.toString.split(".")
    //     var valorIva = valor[0];
    //     }
    
    await t
        .typeText(SCMIngresoFactura.totalNetoInput, totalNetoValor)
        .typeText(SCMIngresoFactura.ivaInput, ivaValor)
}