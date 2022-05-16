import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page";
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMConsultaCotizacionPage, {validarPageConsultaCotizacion, buscarCotizacionPorEstadoYValidar, seleccionarCotizacionPorEstadoYOfertasRandom, buscarCotizacionPorNoYValidar} from "../../pages/SCM/SCM_ConsultaCotizacion_Page"
import CotizacionTempData from "../../temp/SCM/CotizacionTempData"
import SCMOfertasCotizacionPage from "../../pages/SCM/SCM_OfertasCotizacion_Page"
import SCMCuadroComparativoCotizacionPage, {agregarProductosAlCarro} from "../../pages/SCM/SCM_CuadroComparativoCotizacion_Page"
import SCMProductosSeleccionadosCotizacionPage, {seleccionarOpcionYComprar} from "../../pages/SCM/SCM_ProductosSeleccionadosCotizacion_Page"
import SCMGenerarOrdenCompraModal, {generarOrdenCompra} from "../../pages/SCM/SCM_GenerarOrdenCompra_Modal"
import SCMOrdenCompraPage, {validarImpuestoAplicado} from "../../pages/SCM/SCM_OrdenCompra_Page"
import SCMImpuestosOrdenCompraPage, {aplicarImpuestos} from "../../pages/SCM/SCM_ImpuestosOrdenCompra_Page"
import SCMInformacionOrdenCompraPage, {enviarInformacion} from "../../pages/SCM/SCM_InformacionOrdenCompra_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Enviar Cotización a Orden de Compra")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)
        await clickMenuSubmenu(SCMHeaderComp, "Cotizaciones", "Consultar Estado de Cotizaciones")
        await validarPageConsultaCotizacion(SCMConsultaCotizacionPage)
    });

    test.meta("problem","false")("TC-61407 Validar al Buscar Cotización por Estado muestre resultados correctos", async t => {
        await buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage, "COT Abierta")
        console.log("PASS TC-61407 Validar Buscar Cotización por Estado")
    });

    test.meta("problem","false")("TC-61422 Validar al seleccionar una Cotización Abierta y con ofertas recibidas se muestre la página de Ofertas Cotización", async t => {
        await buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage, "COT Abierta")
        await seleccionarCotizacionPorEstadoYOfertasRandom(SCMConsultaCotizacionPage, "COT Abierta", "1")
        let data = await CotizacionTempData.getNumeroCotizacion()
        await t.expect(SCMOfertasCotizacionPage.titleLabel.visible).ok("No se visualiza la página Ofertas Cotización")
        let titulo = await SCMOfertasCotizacionPage.getTituloCotizacion().textContent
        await t.expect(titulo.includes(data)).ok("Pagina de Oferta no posee Cotizacion seleccionada")
        console.log("PASS TC-61422 Validar al seleccionar una Cotización Abierta y con ofertas recibidas se muestre la página de Ofertas Cotización")
    });

    test.meta("problem","false")("TC-61444 Validar al ir a Comparar Cotizaciones seleccionadas se muestre cuadro comparativo", async t => {
        await buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage, "COT Abierta")
        await seleccionarCotizacionPorEstadoYOfertasRandom(SCMConsultaCotizacionPage, "COT Abierta", "1")
        let data = await CotizacionTempData.getNumeroCotizacion()
        await t.expect(SCMOfertasCotizacionPage.titleLabel.visible).ok("No se visualiza la página Ofertas Cotización")
        let titulo = await SCMOfertasCotizacionPage.getTituloCotizacion().textContent
        await t
            .expect(titulo.includes(data)).ok("Pagina de Oferta no posee Cotizacion seleccionada")
            .expect(SCMOfertasCotizacionPage.compararBtn.visible).notOk("Se visualiza el boton Comparar antes de haber seleccionado las ofertas")
            .click(SCMOfertasCotizacionPage.selectAllOfertasCheck)
            .expect(SCMOfertasCotizacionPage.compararBtn.visible).ok("No se visualiza el boton Comparar")
            .click(SCMOfertasCotizacionPage.compararBtn)
            .expect(SCMCuadroComparativoCotizacionPage.titleLabel.visible).ok("No se visualiza el Cuadro Comparativo de Cotización")
        let title = await SCMCuadroComparativoCotizacionPage.titleLabel.textContent
        await t.expect(title.includes(data)).ok("Pagina de Cuadro Comparativo no corresponde a la Cotizacion seleccionada")
        console.log("TC-61444 Validar al ir a Comparar Cotizaciones seleccionadas se muestre cuadro comparativo")
    });

    test.meta("problem","false")("TC-61451 Validar Buscar por No. de Cotización muestre el resultado correcto", async t => {
        await buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage,"COT Abierta")
        await seleccionarCotizacionPorEstadoYOfertasRandom(SCMConsultaCotizacionPage, "COT Abierta", "1")
        await t.click(SCMOfertasCotizacionPage.volverBtn)
        await buscarCotizacionPorNoYValidar(SCMConsultaCotizacionPage,"COT Abierta")
        console.log("PASS TC-61451 Validar Buscar por No. de Cotización muestre el resultado correcto")
    });

    test.meta("problem","true")("TC-61450 Validar Comprar Productos de una Cotización correctamente y sea Enviada a Compra", async t => {
        await buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage, "COT Abierta")
        await seleccionarCotizacionPorEstadoYOfertasRandom(SCMConsultaCotizacionPage, "COT Abierta", "1")
        let data = await CotizacionTempData.getNumeroCotizacion()
        await t.expect(SCMOfertasCotizacionPage.titleLabel.visible).ok("No se visualiza la página Ofertas Cotización")
        let titulo = await SCMOfertasCotizacionPage.getTituloCotizacion().textContent
        await t
            .expect(titulo.includes(data)).ok("Pagina de Oferta no posee Cotizacion seleccionada")
            .click(SCMOfertasCotizacionPage.selectAllOfertasCheck)
            .click(SCMOfertasCotizacionPage.compararBtn)
            .expect(SCMCuadroComparativoCotizacionPage.titleLabel.visible).ok("No se visualiza el Cuadro Comparativo de Cotización")
        let title = await SCMCuadroComparativoCotizacionPage.titleLabel.textContent
        await t.expect(title.includes(data)).ok("Pagina de Cuadro Comparativo no corresponde a la Cotizacion seleccionada")
        await agregarProductosAlCarro(SCMCuadroComparativoCotizacionPage)
        await seleccionarOpcionYComprar(SCMProductosSeleccionadosCotizacionPage)
        await generarOrdenCompra(SCMGenerarOrdenCompraModal)
        await t
            .expect(SCMOrdenCompraPage.titleOrdenCompra.visible).ok("No se muestra la pagina de orden de compra")
            .click(SCMOrdenCompraPage.otroImpuestosBtn)
        await aplicarImpuestos(SCMImpuestosOrdenCompraPage, "10,00")
        await validarImpuestoAplicado(SCMOrdenCompraPage, "10,00")
        await t.click(SCMOrdenCompraPage.verificarBtn)
        await enviarInformacion(SCMInformacionOrdenCompraPage)
        await t.switchToMainWindow()
        await clickMenuSubmenu(SCMHeaderComp, "Cotizaciones", "Consultar Estado de Cotizaciones")
        await validarPageConsultaCotizacion(SCMConsultaCotizacionPage)
        await buscarCotizacionPorNoYValidar(SCMConsultaCotizacionPage, "COT Enviada a Compra")
        await t.expect(SCMConsultaCotizacionPage.getEstadoCotizacion("COT Enviada a Compra").visible).ok("La cotización buscada no posee estado COT Enviada a Compra")
        console.log("PASS TC-61450 Validar Comprar Productos de una Cotización correctamente y sea Enviada a Compra")
    });

