import { Selector,t } from "testcafe";

class SCMHeaderProvComp{
    constructor(){
        this.iFrame = Selector('#ventana')
        //menu Cotizaciones
       this.cotizacionesMenu = Selector('div.SecondMenuItem.FirstChild') 
       this.consultarCotSubMenu = Selector('span').withText('Consultar Cotizaciones')

       //menú Ventas
       this.ventasMenu = Selector('span').withText('Ventas')
       this.consultarOCSubMenu = Selector('span').withText('Consultar Ordenes de Compra')
    }
}

export default new SCMHeaderProvComp();

export async function clickMenuCotizaciones(SCMHeaderProvComp, menu){
    await t.hover(SCMHeaderProvComp.cotizacionesMenu)
    switch(menu){
        case "CONSULTAR COTIZACIONES":
            await t
                 .click(SCMHeaderProvComp.consultarCotSubMenu)
                 .switchToIframe(SCMHeaderProvComp.iFrame);   
            break;
    }
}

export async function clickMenuVentas(SCMHeaderProvComp, menu){
    await t.hover(SCMHeaderProvComp.ventasMenu)
    switch(menu){
        case "CONSULTAR ORDENES DE COMPRA":
            await t
                 .click(SCMHeaderProvComp.consultarOCSubMenu)
                 .switchToIframe(SCMHeaderProvComp.iFrame);   
            break;
    }
}