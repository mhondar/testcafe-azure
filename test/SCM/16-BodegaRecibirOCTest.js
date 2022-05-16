import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickSubMenuHoriz} from "../../pages/SCM/SCM_Header_Comp"
import SCMBuscarOrdenCompraParaRecibir, {validarPaginaBuscarOrdenCompraParaRecibir, buscarOrdenCompraPorRecibirPorProveedor,seleccionarRecibirRecurso, validarEstadoRecepcion, buscarOrdenCompraPorNumeroOC, validarFiltroCheck, seleccionarIconoHistorialRandom} from "../../pages/SCM/SCM_BuscarOrdenCompraParaRecibir_Page"
import SCMIngresoPorOrdenCompra, {completarDatosOrdenCompra, validarPaginaIngresoPorOrdenCompraPorNumOC, confirmarRecepcion, realizarRecepcionCompletaOrdenCompra} from "../../pages/SCM/SCM_IngresoPorOrdenCompraPage"
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"
import SCMHistorialRecepcionOrdenCompraPage from "../../pages/SCM/SCM_HistorialRecepcionOrdenCompra_Page"
import SCMHistoricoDeOrdenCompraPage from "../../pages/SCM/SCM_HistoricoDeOrdenCompra_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Bodega Ingresar Orden de Compra")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion) 
        await clickSubMenuHoriz(SCMHeaderComp, "Bodega", "Ingreso")
        await validarPaginaBuscarOrdenCompraParaRecibir(SCMBuscarOrdenCompraParaRecibir)
    })

   test.meta("type","smog").meta("problem","false")("TC-65325 Validar subMenú Recibir ordenes de compra", async t => {
        console.log("TC-65325 Validar subMenú Recibir ordenes de compra")
   });

   test.meta("problem","false")("TC-65224 Validar Recibir Orden de compra", async t => {
        await buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir,"Proveedor PRUEBA Selenium")    
        await seleccionarRecibirRecurso(SCMBuscarOrdenCompraParaRecibir, "Aceptada", "Sin Recepciones")    
        await t
            .click(SCMIngresoPorOrdenCompra.bodegaRecepcionDrp)
            .click(SCMIngresoPorOrdenCompra.getOptionBodegaRecepcion("Bodega Secundaria"))
        await validarPaginaIngresoPorOrdenCompraPorNumOC(SCMIngresoPorOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await completarDatosOrdenCompra(SCMIngresoPorOrdenCompra, "Muy Bueno", "Producto bien embalado")
        await realizarRecepcionCompletaOrdenCompra(SCMIngresoPorOrdenCompra)
        await confirmarRecepcion(SCMIngresoPorOrdenCompra)
        await buscarOrdenCompraPorNumeroOC(SCMBuscarOrdenCompraParaRecibir, OrdenCompraTempData.getNumeroOC())
        await validarEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, "Recepción Completa")
        console.log("TC-65224 Validar Recibir Orden de compra")    
});

test.meta("problem","false")("TC-66002 Validar filtro Ultimas 24 horas", async t => {
        await t.click(SCMBuscarOrdenCompraParaRecibir.chech24)
        await buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir,"Proveedor PRUEBA Selenium")    
        let fecha = Util.getDateNow()
        let fechaAyer = Util.getDateMenor(1)
        await validarFiltroCheck(SCMBuscarOrdenCompraParaRecibir, fecha, fechaAyer) 
        console.log("TC-66002 Validar filtro Ultimas 24 horas")
});

test.meta("problem","false")("TC-66031 Validar histórico de una orden de compra", async t => {
        await t.click(SCMBuscarOrdenCompraParaRecibir.buscarBtn)
        let ocNumero = await seleccionarIconoHistorialRandom(SCMBuscarOrdenCompraParaRecibir)
        await t.expect(SCMHistorialRecepcionOrdenCompraPage.titlePage.visible).ok("No se visualiza la página de Historial de recepcion de una Orden de Compra")
        let oc = await SCMHistorialRecepcionOrdenCompraPage.getNumeroOC().textContent
        await t
            .expect(oc.trim()).eql(ocNumero.trim(), "No coincide el número de la Orden de Compra")
            .click(SCMHistorialRecepcionOrdenCompraPage.historialBtn)
            .expect(SCMHistoricoDeOrdenCompraPage.titlePage.visible).ok("No se visualiza la página de Histórico de Orden de Compra")
            .expect(SCMHistoricoDeOrdenCompraPage.grillaEstado.visible).ok("No se visualiza la tabla con los estados de las Ordenes de Compra")
    console.log("TC-66031 Validar histórico de una orden de compra")
});







