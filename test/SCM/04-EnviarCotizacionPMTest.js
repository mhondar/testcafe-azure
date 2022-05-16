import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page";
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMConsultaCotizacionPage, {validarPageConsultaCotizacion, seleccionarCotizacion, buscarCotizacionPorEstadoYValidar} from "../../pages/SCM/SCM_ConsultaCotizacion_Page"
import SCMCrearCotizacionPage, {ingresarDescripcionFecha, clickBtnInvitar, validarNumeroProveedor, agregarDetalleProducto, agregarPorCodigoProd, validarProductoAgregado} from "../../pages/SCM/SCM_CrearCotizacion_Page";
import SCMSeleccionarProveedorPage, {seleccionarProveedor} from "../../pages/SCM/SCM_SeleccionarProveedor_Page";
import SCMInformacionCotizacionPage from "../../pages/SCM/SCM_InformacionCotizacion_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const cotizacionData = require('../../data/SCM/cotizacionPM_Data.json')
const adminPMData = require('../../data/SCM/administracionPM_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Enviar Cotización desde Pedido de Materiales")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)
        await clickMenuSubmenu(SCMHeaderComp, "Cotizaciones", "Consultar Estado de Cotizaciones")
        await validarPageConsultaCotizacion(SCMConsultaCotizacionPage)
    });
   
    test.meta("type","smog").meta("problem","false")("TC-61033 Validar Menú Cotizaciones", async t => {
        console.log("PASS TC-61033 Validar Menú Cotizaciones")
    });

    test.meta("problem","false")("TC-61024 Validar Enviar Cotización desde PM", async t => {
        let nombreCot = await seleccionarCotizacion(SCMConsultaCotizacionPage, "COT Guardada", loginUserData[enviroment].comprador.name, adminPMData.nombreCotizacion)
        await ingresarDescripcionFecha(SCMCrearCotizacionPage, cotizacionData.descripcionCot, cotizacionData.fechaCierre, cotizacionData.fechaAdjudicacion)
        await clickBtnInvitar(SCMCrearCotizacionPage)
        await seleccionarProveedor(SCMSeleccionarProveedorPage, cotizacionData.rut) 
        await validarNumeroProveedor(SCMCrearCotizacionPage)
        await agregarPorCodigoProd(SCMCrearCotizacionPage, cotizacionData.codigo)
        await agregarDetalleProducto(SCMCrearCotizacionPage,cotizacionData.cantidad, cotizacionData.glosa, cotizacionData.fechaEntrega, cotizacionData.cuentaCosto)
        await validarProductoAgregado(SCMCrearCotizacionPage,cotizacionData.codigo)
        await t
              .expect(SCMInformacionCotizacionPage.title.visible).ok("No se visualiza página Información de la Cotización")
              .setNativeDialogHandler(() => true)
              .click(SCMInformacionCotizacionPage.enviarBtn)
              .expect(SCMConsultaCotizacionPage.titleLabel.visible).ok("No se visualiza la página Consulta Cotización")
              .typeText(SCMConsultaCotizacionPage.nombreCotInput, nombreCot)
        await buscarCotizacionPorEstadoYValidar(SCMConsultaCotizacionPage, "COT Abierta")
        console.log("PASS TC-61024 Validar Enviar Cotización desde PM")
    });


