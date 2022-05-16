import { Selector,t } from "testcafe";
import ProductoTempData from "../../temp/SCM/ProductoTempData"
import Util from "./../../helpers/utils"
import Shortcuts, { clearTextInput } from "../../helpers/shortcuts";

class SCMDistribucionCuentaCostoModal{
    constructor(){
        this.titleModal = Selector('.titulopagina2')
        this.buscarBtn = Selector("#btnBuscar")
        this.tablaResultados = Selector("#tblResultado")
        this.listCuentasCostoPlus = Selector("#tblResultado").find("tr")
        this.seleccionarBtn = Selector("#btnSeleccionar")
        this.tipoDistribucionSelect = Selector("#lstTipoDistribucion")
        this.guardarBtn = Selector("#btnGrabar")
        this.cerrarBtn = Selector("#lnkCerrar")
    }

    getInputCheckCuentaCosto(index) {
        //table[@id="tblResultado"]//tr[2]/td[6]/input
        return Selector("#tblResultado").find("tr").nth(index).child("td").nth(5).child("input")
    }

    getTipoDistribucionOption(tipo) {
        return Selector("#lstTipoDistribucion").find('option').withText(tipo)
    }

    getCantidadDistribuirInputByIndex(index) {
        //table[@id="tblCCostos"]//tr[2]/td[3]/input
        return Selector("#tblCCostos").find("tr").nth(index).find("td").nth(2).child("input")
    }
}

export default new SCMDistribucionCuentaCostoModal();

export async function distribuirCuentaCosto(SCMDistribucionCuentaCostoModal, tipoDistribucion){
    await t
        .expect(SCMDistribucionCuentaCostoModal.titleModal.visible).ok("No se muestra modal de Distribución de Cuentas de Costo")
        .click(SCMDistribucionCuentaCostoModal.buscarBtn)
    for(let i=1; i<=2; i++) {
        await t.click(SCMDistribucionCuentaCostoModal.getInputCheckCuentaCosto(i))
    }
    await t.click(SCMDistribucionCuentaCostoModal.seleccionarBtn)
    await t.click(SCMDistribucionCuentaCostoModal.tipoDistribucionSelect)
    await t.click(SCMDistribucionCuentaCostoModal.getTipoDistribucionOption(tipoDistribucion))
    let cantidadesDistribuir = [];
    switch (tipoDistribucion) {
        case "Cantidad":
            let cantidad = ProductoTempData.getCantidad()
            if(cantidad % 2 == 0){
                cantidadesDistribuir.push(cantidad / 2)
                cantidadesDistribuir.push(cantidad / 2)
            } else {
                cantidadesDistribuir.push((cantidad-1) / 2)
                cantidadesDistribuir.push(((cantidad-1) / 2) + 1)
            }
            break;
        case "Porcentaje":
            let randomNum = Util.between(1, 100)
            cantidadesDistribuir.push(randomNum)
            cantidadesDistribuir.push(100 - randomNum)
            break;
    }
    for(let i=1; i<=2; i++) {
        await clearTextInput(SCMDistribucionCuentaCostoModal.getCantidadDistribuirInputByIndex(i), cantidadesDistribuir[i-1].toString())
    }
    await t
        .click(SCMDistribucionCuentaCostoModal.guardarBtn)
        .click(SCMDistribucionCuentaCostoModal.cerrarBtn)
}