import { Selector, t} from "testcafe";
import Util from "../../helpers/utils";
import { clearTextInput } from "../../helpers/shortcuts"

class SCMCrearPedidoMaterialesPage{
    constructor(){
        this.iFrame = Selector('#ventana')
        this.tituloPaginaLabel = Selector('#tdTituloPagina')
        this.nombrePedidoInput = Selector('#txtNomPM')
        this.comentariosPedidoInput = Selector('#txtComentarios')
        this.codigoLupaImg = Selector('img').withAttribute('title', 'Buscar código producto')
        this.maestroBtn = Selector('#ctrLineaPedido_lnkMaestro')
        this.productosAnnadidosGrilla = Selector('#tblLineas').child('tbody').child('tr')
        this.editarLineasBtn = Selector('#btnEditarLineas')
        this.verificarBtn = Selector('#btnEnviarPedido')

        //Maestro de pedidos
        this.filtroDescripcionInput = Selector('input').withAttribute('name', 'txtDescripcion')
        this.buscarProductoBtn = Selector('a#btnBuscar')
        this.productosMaestro = Selector('#tblProductos').find('tr')
        
        this.descripcionProducto = Selector('#ctrLineaPedido_lblLINDesc')
        this.cantidadProductoInput = Selector('input#ctrLineaPedido_txtLINCantidad')
        this.glosaInput = Selector('#ctrLineaPedido_txtLINGlosa')
        this.diasDespachoRadioBtn = Selector('input#ctrLineaPedido_rdbVerDiasDespacho')
        this.diasDespachoLabel = Selector('input#ctrLineaPedido_txtDiasDespacho')
        this.comentarioInput = Selector('textarea#ctrLineaPedido_txtLINComentario')
        this.distribuirBtn = Selector('#ctrLineaPedido_lnkDistribucion')
        this.agregarBtn = Selector('#ctrLineaPedido_btnAgregarLinea')
        this.cuentaCostoInput = Selector('#ctrLineaPedido_txtCCosto')

        //Distribucion
        this.buscarCCBtn = Selector('#btnBuscar')
        this.grillaCuentasCostos = Selector('#tblResultado').child('tbody').child('tr')
        this.pruebaCC28Check = Selector('#ctrAcumulador_idccosto_item_28')
        this.pruebaCC555Check = Selector('#ctrAcumulador_idccosto_item_555')
        this.seleccionarBtn = Selector('#btnSeleccionar')
        this.porcentajeValor1Label = Selector('input#valor_1')
        this.porcentajeValor2Label = Selector('input#valor_2')
        this.guardarBtn = Selector('#btnGrabar')
        this.cerrarBtn = Selector('#lnkCerrar')
        this.titleLabel = Selector('td').withText('Distribución de Cuenta de Costos')
        this.form = Selector('#Form1')
        this.guardarProductoBtn = Selector('#btnGrabarPedido')
    }

    getProducto(num){
        return Selector('#tblProductos > tbody > tr:nth-child('+num+') > td:nth-child(7) > a:nth-child(1) > img')
    }

    getNombreProducto(num){
        return Selector('#tblProductos > tbody > tr:nth-child('+num+') > td:nth-child(2)')
    }

    getDescripcionProducto(){
        return Selector('#ctrLineaPedido_lblLINDesc')
    }

    getProductoAnnadido(){
        return Selector('#tblLineas > tbody > tr:nth-child(2) > td:nth-child(3)')
    }

}

export default new SCMCrearPedidoMaterialesPage();

export async function clickRandomProducto(SCMCrearPedidoMaterialesPage) {
    let cantProductos = await SCMCrearPedidoMaterialesPage.productosMaestro.count
    let randomNumber = Util.between(2,cantProductos)
    let nombreProducto = await SCMCrearPedidoMaterialesPage.getNombreProducto(randomNumber).textContent
    await t.click(SCMCrearPedidoMaterialesPage.getProducto(randomNumber)).wait(2000)
    return nombreProducto;
}  

export async function seleccionarCuentasCosto(SCMCrearPedidoMaterialesPage){
    //let cantidad = await SCMCrearPedidoMaterialesPage.grillaCuentasCostos.count
    await t
          .click(SCMCrearPedidoMaterialesPage.pruebaCC28Check)
          .click(SCMCrearPedidoMaterialesPage.pruebaCC555Check)      
}

export async function agregarNombreYComentarioPedido(SCMCrearPedidoMaterialesPage, nombre, nota){
    await t
          .switchToIframe(SCMCrearPedidoMaterialesPage.iFrame)
          .expect(SCMCrearPedidoMaterialesPage.tituloPaginaLabel.visible).ok()
          .typeText(SCMCrearPedidoMaterialesPage.nombrePedidoInput, nombre)
          .typeText(SCMCrearPedidoMaterialesPage.comentariosPedidoInput, nota)
}

export async function editarPedido(SCMCrearPedidoMaterialesPage, cantid, glosa, dias, cuentaCosto){
    let cant = await SCMCrearPedidoMaterialesPage.productosAnnadidosGrilla.count
    for (let i = 2; i < cant + 1; i++) {
        let editarIcono = Selector(('#tblLineas > tbody > tr:nth-child('+i+') > td:nth-child(8) > a:nth-child(1) > img'))
        await t
            .click(editarIcono)
            .typeText(SCMCrearPedidoMaterialesPage.cantidadProductoInput, cantid)
            .typeText(SCMCrearPedidoMaterialesPage.glosaInput, glosa)
            .click(SCMCrearPedidoMaterialesPage.diasDespachoRadioBtn)
            .typeText(SCMCrearPedidoMaterialesPage.diasDespachoLabel, dias)
            .typeText(SCMCrearPedidoMaterialesPage.cuentaCostoInput, cuentaCosto)
            .click(SCMCrearPedidoMaterialesPage.agregarBtn)
    }
}


    