import { Selector,t } from "testcafe";

class SCMBusquedaDeProveedor{
    constructor(){
        this.busquedaDeProveedorTitle = Selector('.titulopagina2')
        this.nombreProveedorInput = Selector('#txtProveedor')
        this.buscarBtn = Selector('#btnBuscar')
        this.seleccionarIcon = Selector('#tblProveedoresIntegrados > tbody > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1) > img')
    }

    getNombreFantasia(){
        return Selector('#tblProveedoresIntegrados > tbody > tr:nth-child(2) > td:nth-child(1)')
    }
}

export default new SCMBusquedaDeProveedor();

export async function busquedaDeProveedor(SCMBusquedaDeProveedor, nombre){
    await t
        .switchToMainWindow()
        .expect(SCMBusquedaDeProveedor.busquedaDeProveedorTitle.visible).ok("No se visualiza el modal Búsqueda de proveedor")
        .typeText(SCMBusquedaDeProveedor.nombreProveedorInput, nombre)
        .click(SCMBusquedaDeProveedor.buscarBtn)
    let nombreFantasia = await SCMBusquedaDeProveedor.getNombreFantasia().textContent    
    await t
        .expect(nombreFantasia.trim()).eql(nombre)
        .click(SCMBusquedaDeProveedor.seleccionarIcon) 
}


