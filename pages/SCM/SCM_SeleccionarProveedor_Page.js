import { Selector,t } from "testcafe";

class SCMSeleccionarProveedorPage{
    constructor(){
        this.titleLabel = Selector('h2').withText('Seleccionar proveedores')
        this.proveedorDrp = Selector('span').withText('Escribe el Nombre o Rut del proveedor')
        //button[@data-id = 'selProveedor']/following-sibling::div//input
        this.proveedorInput = Selector('button').withAttribute('data-id', 'selProveedor').nextSibling('div').find('input')
        this.buscarBtn = Selector('#btnBuscar')

        this.proveedorCheck = Selector('span.chkOrgv').child('input')
        this.check = Selector('input#selectall_Proveedores')
        this.agregarBtn = Selector('#lnkAgregar')
        //tbody[@class="text-center"]//small[text() = '4856053-9']/parent::li/parent::ul/parent::td/parent::tr/td[@class = 'chkTabla']//input

    }

   getRutProveedor(rut){
       return Selector('small').withText(rut)
   }
}

export default new SCMSeleccionarProveedorPage();

export async function seleccionarProveedor(SCMSeleccionarProveedorPage, rut){
    await t
           .expect(SCMSeleccionarProveedorPage.titleLabel.visible).ok("Se visualiza página Seleccionar Proveedores")
           .click(SCMSeleccionarProveedorPage.proveedorDrp)
           .typeText(SCMSeleccionarProveedorPage.proveedorInput, "proveedorselenium")
           .click(SCMSeleccionarProveedorPage.getRutProveedor(rut))
           .click(SCMSeleccionarProveedorPage.buscarBtn)
           .click(SCMSeleccionarProveedorPage.proveedorCheck)
           .click(SCMSeleccionarProveedorPage.proveedorCheck)
           .click(SCMSeleccionarProveedorPage.proveedorCheck)
           .click(SCMSeleccionarProveedorPage.agregarBtn)
}