import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page";
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMBuscarOrdenCompraParaRecibir, {validarPaginaBuscarOrdenCompraParaRecibir, buscarOrdenCompraPorRecibirPorProveedor, buscarOrdenCompraPorNumeroOCRandom, buscarOrdenCompraPorNumeroOC, buscarOrdenCompraPorEstadoRecepcion, seleccionarRecibirProductosDeOCPorEstados, validarEstadoRecepcion} from "../../pages/SCM/SCM_BuscarOrdenCompraParaRecibir_Page"
import SCMIngresoPorOrdenCompra, {validarPaginaIngresoPorOrdenCompraPorNumOC, completarDatosOrdenCompra, realizarRecepcionCompletaOrdenCompra, confirmarRecepcion, realizarRecepcionParcialOrdenCompra} from "../../pages/SCM/SCM_IngresoPorOrdenCompraPage";
import OrdenCompraTempData from "../../temp/SCM/OrdenCompraTempData"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Recepción")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion )
        await clickMenuSubmenu(SCMHeaderComp, "Recepción", "Recibir Ordenes de Compra")
        await validarPaginaBuscarOrdenCompraParaRecibir(SCMBuscarOrdenCompraParaRecibir)
    });

    test.meta("type","smog").meta("problem","false")("TC-62279 Validar acceso al Menú Recepción - Recibir Ordenes de Compra", async t => {
        console.log("PASS TC-62279 Validar acceso al Menú Recepción - Recibir Ordenes de Compra")
    });

    test.meta("problem","false")("TC-62280 Validar Buscar Ordenes de Compra para Recibir filtrando por Nombre de Proveedor", async t => {
        await buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir,"Proveedor PRUEBA Selenium")
        console.log("PASS TC-62280 Validar Buscar Ordenes de Compra para Recibir filtrando por Nombre de Proveedor")
    });

    test.meta("problem","false")("TC-62281 Validar Buscar Ordenes de Compra para Recibir filtrando por Número de OC", async t => {
        await buscarOrdenCompraPorNumeroOCRandom(SCMBuscarOrdenCompraParaRecibir)
        console.log("PASS TC-62281 Validar Buscar Ordenes de Compra para Recibir filtrando por Número de OC")
    });

    test.meta("problem","false")("TC-62490 Validar Buscar Orden de Compra por Recibir por Estado de Recepción", async t => {
        await buscarOrdenCompraPorEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, "Sin Recepción", "Sin Recepciones")
        console.log("PASS TC-62490 Validar Buscar Orden de Compra por Recibir por Estado de Recepción")
    });

    // test.skip("TC-62282 Validar Recepción Completa de Orden de Compra", async t => {
    //     await buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir,"Proveedor PRUEBA Selenium")
    //     await seleccionarRecibirProductosDeOCPorEstados(SCMBuscarOrdenCompraParaRecibir, "Aceptada", "Sin Recepciones")
    //     await validarPaginaIngresoPorOrdenCompraPorNumOC(SCMIngresoPorOrdenCompra, OrdenCompraTempData.getNumeroOC())
    //     await completarDatosOrdenCompra(SCMIngresoPorOrdenCompra, "Muy Bueno", "Producto bien embalado")
    //     await realizarRecepcionCompletaOrdenCompra(SCMIngresoPorOrdenCompra)
    //     await confirmarRecepcion(SCMIngresoPorOrdenCompra)
    //     await buscarOrdenCompraPorNumeroOC(SCMBuscarOrdenCompraParaRecibir, OrdenCompraTempData.getNumeroOC())
    //     await validarEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, "Recepción Completa")
    //     console.log("PASS TC-62282 Validar Recepción Completa de Orden de Compra")
    // });

    test.meta("problem","false")("TC-62283 Validar Recepción Parcial de Orden de Compra", async t => {
        await buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir,"Proveedor PRUEBA Selenium")
        await seleccionarRecibirProductosDeOCPorEstados(SCMBuscarOrdenCompraParaRecibir, "Aceptada", "Sin Recepciones")
        await validarPaginaIngresoPorOrdenCompraPorNumOC(SCMIngresoPorOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await completarDatosOrdenCompra(SCMIngresoPorOrdenCompra, "Regular", "Se atrasaron en la entrega")
        await realizarRecepcionParcialOrdenCompra(SCMIngresoPorOrdenCompra)
        await confirmarRecepcion(SCMIngresoPorOrdenCompra)
        await buscarOrdenCompraPorNumeroOC(SCMBuscarOrdenCompraParaRecibir, OrdenCompraTempData.getNumeroOC())
        await validarEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, "Recepción Parcial")
        console.log("PASS TC-62283 Validar Recepción Parcial de Orden de Compra")
    });

    test.meta("problem","true")("TC-62477 Validar Recepción Completa desde una Recepción Parcial", async t => {
        await buscarOrdenCompraPorRecibirPorProveedor(SCMBuscarOrdenCompraParaRecibir,"Proveedor PRUEBA Selenium")
        await seleccionarRecibirProductosDeOCPorEstados(SCMBuscarOrdenCompraParaRecibir, "Aceptada", "Recepción Parcial")
        await validarPaginaIngresoPorOrdenCompraPorNumOC(SCMIngresoPorOrdenCompra, OrdenCompraTempData.getNumeroOC())
        await completarDatosOrdenCompra(SCMIngresoPorOrdenCompra, "Muy Bueno", "Producto bien embalado")
        await realizarRecepcionCompletaOrdenCompra(SCMIngresoPorOrdenCompra)
        await confirmarRecepcion(SCMIngresoPorOrdenCompra)
        await buscarOrdenCompraPorNumeroOC(SCMBuscarOrdenCompraParaRecibir, OrdenCompraTempData.getNumeroOC())
        await validarEstadoRecepcion(SCMBuscarOrdenCompraParaRecibir, "Recepción Completa")
        console.log("PASS TC-62477 Validar Recepción Completa desde una Recepción Parcial")
    });

