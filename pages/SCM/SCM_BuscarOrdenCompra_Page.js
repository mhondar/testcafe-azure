import { Selector,t } from "testcafe";

class SCMBuscarOrdenCompra{
    constructor(){
        this.titleBuscarOrden = Selector('td').withAttribute('class', 'titulopagina2')
        this.iframe = Selector('#ventana')
        this.buscarBtn = Selector('#btnBuscar')
        this.grillaOrdenes = Selector('#tblOrdenes').child('tbody').child('tr')
        this.estadoDrp = Selector('#lstEstados') 
        
        this.nombreOC = Selector('#txtNomOc')
        this.proveedorInput = Selector('#txtProveedor')
    }

    getProveedor(num){
        return Selector('#tblOrdenes').find('tr:nth-child(' + num + ')').child('td:nth-child(4)')
    }

    getEstado(num){
        return Selector('#tblOrdenes').find('tr:nth-child(' + num + ')').child('td:nth-child(9)')
    }

    getIconEditar(num){
        return Selector('#tblOrdenes').find('tr:nth-child(' + num + ')').child('td:nth-child(10)').child('a:nth-child(1)').child('img')
    }

    getNombreOC(nombre){
        return Selector('td').withText(nombre)
    }

    getSolicitante(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(5)')
    }

    getNameOC(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(2)')
    }

    getEstadoOption(option){
        return Selector('option').withText(option)
    }



}

export default new SCMBuscarOrdenCompra();

export async function validarTitleBuscarOrden(SCMBuscarOrdenCompra){
    await t
          .switchToIframe(SCMBuscarOrdenCompra.iframe)
          .expect(SCMBuscarOrdenCompra.titleBuscarOrden.visible).ok("No se visualiza la página de Buscar orden De compra")
}

export async function seleccionarOrdenPorEstado(SCMBuscarOrdenCompra){
    let count = await SCMBuscarOrdenCompra.grillaOrdenes.count
    let i = 2
    do {
        let estado = await SCMBuscarOrdenCompra.getEstado(i).textContent
        let solicitante = await SCMBuscarOrdenCompra.getSolicitante(i).textContent
        let nombreOC = await SCMBuscarOrdenCompra.getNameOC(i).textContent
        if(estado.trim() == "OC Guardada" && solicitante == "Nelson Lorca" && nombreOC != "") {
            await t.click(SCMBuscarOrdenCompra.getIconEditar(i))
            return nombreOC;
            //break;
        }
        else 
           i++; 
    } while (i <= count + 1)  
}

export async function buscarOrdenCompra(SCMBuscarOrdenCompra, nombre){
    await t
         .typeText(SCMBuscarOrdenCompra.nombreOC, nombre)
         .click(SCMBuscarOrdenCompra.buscarBtn)
    let nameOc = await SCMBuscarOrdenCompra.getNombreOC(nombre)
    await t.expect(nameOc.visible).ok("No se visualiza la orden de compra") 
}

export async function buscarOrdenCompraPorProveedorEstado(SCMBuscarOrdenCompra, proveedor, estado){
    await t
        .typeText(SCMBuscarOrdenCompra.proveedorInput, proveedor)       
        .click(SCMBuscarOrdenCompra.estadoDrp)
        .click(SCMBuscarOrdenCompra.getEstadoOption(estado))
        .click(SCMBuscarOrdenCompra.buscarBtn)
        .expect(SCMBuscarOrdenCompra.grillaOrdenes.visible).ok("No se visualiza grilla con ordenes")
};

export async function validarEstadoOrden(SCMBuscarOrdenCompra, estado){
    let estadoVisto = await SCMBuscarOrdenCompra.getEstado(2).textContent
    await t.expect(estadoVisto).contains(estado, "El estado de la OC no es el esperado") 
}




