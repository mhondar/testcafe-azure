import { Selector,t } from "testcafe";

class SCMHeaderComp {
    constructor(){
        this.iFrame = Selector('#ventana')

        //Menú Compras
        this.comprasMenu= Selector('span').withText('Compras')
        this.crearOrdenCompraSubMenu = Selector('#ControlMenu1_sec span').withText('Crear Orden de Compra')
        this.consultarEstadoOrdenSubmenu = Selector('#ControlMenu1_sec span').withText('Consultar Estado de Orden')
        
        //Menú Pedido de Materiales
        this.pedidoMaterialesMenu = Selector('span').withText('Pedido Materiales')
        this.crearPedidoMaterialesSubMenu = Selector('span').withText('Crear Pedido de Materiales')
        this.adminPedidosSubMenu = Selector('span').withText('Administración de Pedidos')
        this.editarPMSubMenu = Selector('span').withText('Editar Pedido de materiales')
        this.consultarPMSubMenu = Selector('span').withText('Consultar Estado de Pedidos')

        //Menú Cotizaciones
        this.cotizacionesMenu = Selector('span').withText('Cotizaciones')
        this.consultarEstadoCotizacionesSubMenu = Selector('span').withText('Consultar Estado de Cotizaciones')
   
        //Menú Facturación
        this.facturacionMenu = Selector('div').withAttribute('class', 'VertMenu SubMenuParent').find('span').withText('Facturación')
        this.ingresoFacturaSubMenu = Selector('span').withAttribute('title', 'Ingreso de Facturas')
        this.controlDocumentosSinAsociarSubMenu = Selector('span').withText('Control de Documentos Sin Asociar')
        this.ingresoNotaCorreccionSubMenu = Selector('span').withText('Ingreso de Notas de Corrección')
        this.controlDocumentosSubMenu = Selector('span').withText('Control de Documentos')
    
        //menú Bodega
        this.submenuIngresoOC = Selector('#ControlMenu1_sec > div > div > div > table > tbody > tr > td:nth-child(6) > div.SubMenu > div > table > tbody > tr:nth-child(1) > td > div.SubMenu > div > table > tbody > tr:nth-child(1) > td > div > a > span > span')
    
    }

    getMenu(menu) {
        return Selector('div#secondMenu').find('div').withAttribute("class", "VertMenu SubMenuParent").find('span').withText(menu)
    }

    getSubMenu(submenu) {
        return Selector('div#secondMenu').find('div').withAttribute("class", "VertMenu SubMenuParent active").nextSibling("div").withAttribute("class", "SubMenu ").find('span').withAttribute("title", submenu)
    }

    getSubMenuHoriz(submenuHoriz) {
        return Selector('div#secondMenu').find('div').withAttribute("class", "VertMenu SubMenuParent active").nextSibling("div").withAttribute("class", "SubMenu ").find('div').withAttribute("class", "HorzMenu SubMenuParent active").nextSibling("div").withAttribute("class", "SubMenu ").find('span').withAttribute("title", submenuHoriz)
    }

}
export default new SCMHeaderComp();

export async function clickMenuSubmenu(SCMHeaderComp, menu, submenu){
    let menuSelector = await SCMHeaderComp.getMenu(menu)
    await t.expect(menuSelector.visible).ok("No se muestra el Menu " + menu)
    await t.hover(menuSelector)
    let submenuSelector = await SCMHeaderComp.getSubMenu(submenu)
    await t.expect(submenuSelector.visible).ok("No se muestra el SubMenu " + submenu)
    await t.click(submenuSelector)
} 

//funcion para cuando hay más de un subMenú
export async function clickSubMenuHoriz(SCMHeaderComp, menu, submenu){
    let menuSelector = await SCMHeaderComp.getMenu(menu)
    await t.expect(menuSelector.visible).ok("No se muestra el Menu " + menu)
    await t.hover(menuSelector)
    let submenuSelector = await SCMHeaderComp.getSubMenu(submenu)
    await t.expect(submenuSelector.visible).ok("No se muestra el SubMenu " + submenu)
    await t
        .hover(submenuSelector)
        .click(SCMHeaderComp.submenuIngresoOC) 
}


