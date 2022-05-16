import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderProvComp, {clickMenuCotizaciones} from "../../pages/SCM/PROVEEDOR/SCM_HeaderProv_Comp"
import Util from "../../helpers/utils"
import SCMConsultarCotizacionesProvPage, {seleccionarCotPorEstado, buscarCotPorNumero} from "../../pages/SCM/PROVEEDOR/SCM_ConsultarCotizacionesProv_Page"
import SCMCrearOfertaProvPage, {setNombreYMotivo} from "../../pages/SCM/PROVEEDOR/SCM_CrearOfertaProv_Page"
import SCMVerificarOfertaProvPage, {verificarOfertaYEnviar} from "../../pages/SCM/PROVEEDOR/SCM_VerificarOfertaProv_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const adminPMData = require('../../data/SCM/administracionPM_Data.json');

fixture("Suite Pruebas iConstruye Aprobar Cotización desde lado Proveedor")
    .page(url)
    .beforeEach(async t => {
        let enviroment = process.env.ENV;
        await login(SCMLoginPage, loginUserData[enviroment].proveedor.usuario, loginUserData[enviroment].proveedor.organizacion, loginUserData[enviroment].proveedor.password, loginUserData[enviroment].proveedor.centroGestion)
        await clickMenuCotizaciones(SCMHeaderProvComp, "CONSULTAR COTIZACIONES")
        await t.expect(SCMConsultarCotizacionesProvPage.title.visible).ok("No se visualiza página Consultar Cotización")
    })

    test.meta("type","smog").meta("problem","false")("TC-61130 Validar Menú Consultar Cotizaciones", async t => {
        console.log("PASS TC-61130 Validar Menú Consultar Cotizaciones")
   });

    test.meta("problem","false")("TC-60967 Validar Aprobación desde lado Proveedor", async t => {
        let cot = await seleccionarCotPorEstado(SCMConsultarCotizacionesProvPage, adminPMData.nombreCotizacion)
        //crear Cotización
        await t.expect(SCMCrearOfertaProvPage.titleLabel.visible).ok("No se visualiza página de Crear Cotización")
        await setNombreYMotivo(SCMCrearOfertaProvPage, adminPMData.nombreCotizacion)
        await SCMCrearOfertaProvPage.agregarPrecio()
        await SCMCrearOfertaProvPage.agregarDescuento()
        await SCMCrearOfertaProvPage.agregarFechaDespachoOferta()
        await SCMCrearOfertaProvPage.agregarRespuesta()
        await t.click(SCMCrearOfertaProvPage.verificarBtn)
        //verificar datos de la cotización
        await verificarOfertaYEnviar(SCMVerificarOfertaProvPage,adminPMData.nombreCotizacion)
        await buscarCotPorNumero(SCMConsultarCotizacionesProvPage, cot.trim())
    console.log("PASS TC-60967 Validar Aprobación desde lado Proveedor")
});   




   