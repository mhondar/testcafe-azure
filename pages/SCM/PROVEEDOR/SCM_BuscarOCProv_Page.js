import { Selector,t } from "testcafe";

class SCMBuscarOCProvPage{
    constructor(){
         this.titleLabel = Selector('.titulopagina2')
         this.sucursalDrp = Selector('#lstSucursal')
         this.sucursalList = Selector('option').withText('proveedor selenium')
         this.empresaDrp = Selector('#lstEmpresa')
         this.empresaList = Selector('option').withText('Prueba Comprador Selenium')
         this.estadoDrp = Selector('#lstEstados')
         this.nuevaOrdenList = Selector('option').withText('Nueva Orden de Compra')
         this.buscarBtn = Selector('#btnBuscar')
         this.ordenesGrilla = Selector('#tblOrdenes').child('tbody').child('tr')
         this.numeroOCInput = Selector('#txtNumero')
    }

    getEstadoOC(estadoOC){
        return Selector('option').withText(estadoOC)
    }

    getNumeroOC(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(1)')
    }

    getEmpresa(num){
        //*[@id="tblOrdenes"]/tbody/tr[2]/td[2]/a
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(2) > a')
    }

    getSucursal(num){
       return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(6)')
    }

    getEstado(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(9)')
    }

    getIconoLupa(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(10) > a:nth-child(1) > img')
    }

    getCentroGestion(num){
        return Selector('#tblOrdenes > tbody > tr:nth-child(' + num + ') > td:nth-child(3)')
    }    
}

export default new SCMBuscarOCProvPage();

export async function buscarOC(SCMBuscarOCProvPage){
     await t
         .click(SCMBuscarOCProvPage.empresaDrp)
         .click(SCMBuscarOCProvPage.empresaList)
         .click(SCMBuscarOCProvPage.sucursalDrp)
         .click(SCMBuscarOCProvPage.sucursalList)
         .click(SCMBuscarOCProvPage.estadoDrp)
         .click(SCMBuscarOCProvPage.nuevaOrdenList)
         .click(SCMBuscarOCProvPage.buscarBtn)
}

export async function validarGrilla(SCMBuscarOCProvPage, empresaData, sucursalData, estadoData, ccGestionData){
    await t.expect(SCMBuscarOCProvPage.ordenesGrilla.visible).ok("No se visualiza grilla con las órdenes de compra")
    let count = await SCMBuscarOCProvPage.ordenesGrilla.count
    let i = 2
    do {
        let empresa = await SCMBuscarOCProvPage.getEmpresa(i).textContent
        let sucursal = await SCMBuscarOCProvPage.getSucursal(i).textContent
        let estado = await SCMBuscarOCProvPage.getEstado(i).textContent
        let centroGestion = await SCMBuscarOCProvPage.getCentroGestion(i).textContent
        if(empresa == empresaData && sucursal == sucursalData && estado == estadoData && centroGestion == ccGestionData ) {
            let numeroOC = await SCMBuscarOCProvPage.getNumeroOC(i).textContent
            await t.click(SCMBuscarOCProvPage.getIconoLupa(i))
            return numeroOC;
            break;
        }
        else 
           i++; 
    } while (i <= count)  
}

export async function validarEstadoOC(SCMBuscarOCProvPage, oc, estadoOC){
    await t
          .typeText(SCMBuscarOCProvPage.numeroOCInput, oc)
          .click(SCMBuscarOCProvPage.estadoDrp)
          .click(SCMBuscarOCProvPage.getEstadoOC(estadoOC))
          .click(SCMBuscarOCProvPage.buscarBtn)
    let estado = await SCMBuscarOCProvPage.getEstado(2).textContent
    let numeroOC = await SCMBuscarOCProvPage.getNumeroOC(2).textContent         
    await t
          .expect(numeroOC.trim()).eql(oc, "No coincide el número de la orden de compra")
          .expect(estado.trim()).eql(estadoOC, "No coincide el estado Aceptada de la orden de compra")
}