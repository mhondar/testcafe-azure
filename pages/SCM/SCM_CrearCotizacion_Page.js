import { Selector,t } from "testcafe";
import SCMHeaderComp from "../../pages/SCM/SCM_Header_Comp"
import Shortcuts, { clearTextInput } from "../../helpers/shortcuts";

class SCMCrearCotizacionPage{
    constructor(){
         this.iFrame = Selector('#ventana')
         this.title = Selector('#lblTitulo')
         this.descripcionInput = Selector('#txtComentarios')
         this.fechaCierre = Selector('#ctrFechaCierre_I')
         this.fechaAdjudicacion = Selector('#ctrFechaDecision_I')
         this.seleccionProveedorLabel = Selector('#Label1')
         this.invitarBtn = Selector('#btnInvitar')
         this.lupaIcono = Selector('#ctrLineaCotizacion_lnkCodigo')
         this.cantidadInput = Selector('input#ctrLineaCotizacion_txtLINCantidad')
         this.glosaInput = Selector('#ctrLineaCotizacion_txtLINGlosa')
         this.fechaEntregaInput = Selector('#ctrLineaCotizacion_txtLINFechaEntrega')
         this.cuentasCostoInput = Selector('#ctrLineaCotizacion_txtCCosto')
         this.agregarBtn = Selector('#ctrLineaCotizacion_btnAgregarLinea')
         this.verificarBtn = Selector('#btnEnviarCotizacion') 
         this.codigoInput = Selector('#ctrLineaCotizacion_txtBuscarCodigo')
         this.productosGrilla = Selector('#TblLineas').child('tbody').child('tr')

    }

    getNumeroProveedor(){
        return Selector('span#lblNumeroProveedores')
    }

    getCodigoProductoAgregadoLabel(){
        return Selector('#ctrLineaCotizacion_lblLINCodigo')
    }

    getCodigoProductoGrilla(num){
       return Selector('#TblLineas > tbody > tr:nth-child(' + num + ') > td:nth-child(1)')
    }
}

export default new SCMCrearCotizacionPage();

export async function ingresarDescripcionFecha(SCMCrearCotizacionPage, descripcion, fechaCierre, fechaAdjud){
    await t
         .expect(SCMCrearCotizacionPage.title.visible).ok("No se visualiza página Crear Cotización")
         .typeText(SCMCrearCotizacionPage.descripcionInput, descripcion)
    await clearTextInput(SCMCrearCotizacionPage.fechaCierre, fechaCierre)
    await clearTextInput(SCMCrearCotizacionPage.fechaAdjudicacion, fechaAdjud)    
}

export async function clickBtnInvitar(SCMCrearCotizacionPage){
    await t
         .expect(SCMCrearCotizacionPage.seleccionProveedorLabel.visible).ok("No se visualiza la sección Selección de Proveedor")
         .click(SCMCrearCotizacionPage.invitarBtn)
}

export async function validarNumeroProveedor(SCMCrearCotizacionPage){
    let num = await SCMCrearCotizacionPage.getNumeroProveedor().textContent
    await t.expect(num).eql("1")
}

export async function agregarDetalleProducto(SCMCrearCotizacionPage,cant, glos, fechaEntreg, cuentaCC){
     await t
           .typeText(SCMCrearCotizacionPage.cantidadInput, cant)        
           .typeText(SCMCrearCotizacionPage.glosaInput, glos)
           .typeText(SCMCrearCotizacionPage.fechaEntregaInput, fechaEntreg) 
           .typeText(SCMCrearCotizacionPage.cuentasCostoInput, cuentaCC)
           .click(SCMCrearCotizacionPage.agregarBtn)      
}

export async function agregarPorCodigoProd(SCMCrearCotizacionPage, codigo){
     await t
         .typeText(SCMCrearCotizacionPage.codigoInput, codigo)
         .click(SCMCrearCotizacionPage.lupaIcono)
     let result = await SCMCrearCotizacionPage.getCodigoProductoAgregadoLabel().textContent
     await t.expect(codigo.trim()).eql(result)    
}

export async function validarProductoAgregado(SCMCrearCotizacionPage, codigoData){
    let cant = await SCMCrearCotizacionPage.productosGrilla.count
    let i = 2
    do {
        let codigo = await SCMCrearCotizacionPage.getCodigoProductoGrilla(i).textContent
        if(codigo.trim() == codigoData) {
            console.log("Se valida Producto Agregado en la grilla de Líneas de producto/Servicios")
            await t.click(SCMCrearCotizacionPage.verificarBtn)
            break;
        }
        else 
           i++; 
    } while (i <= cant + 1)
}
      
      


