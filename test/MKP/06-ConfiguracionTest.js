import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, { isVisiblePopUp, isVisiblePopUpcapacitaciones } from "../../pages/MKP/MKP_UpdateData_Popup"
import MKPMiPerfilPage, { changeProfileAndCheck } from "../../pages/MKP/MKP_MiPerfil_Page"
import MKPEditarPerfilComp from "../../pages/MKP/MKP_EditarPerfil_Comp"
import MKPNotificacionPopup from "../../pages/MKP/MKP_Notificacion_Popup"
import MKPConfiguracionMenuComp from "../../pages/MKP/MKP_ConfiguracionMenu_Comp"
import MKPEmpresaPage, { editarInformacionGeneralEmpresaYValidar, agregarCategoriaYValidar, quitarCategoriaYValidar, agregarPalabraClave, quitarPalabraClave} from "../../pages/MKP/MKP_Empresa_Page"
import MKPSuscripcionPage, { validarProductoSuscrito } from "../../pages/MKP/MKP_Suscripcion_Page"
import MKPNotificacionesPage from "../../pages/MKP/MKP_Notificaciones_Page"
import MKPSeguridadPage from "../../pages/MKP/MKP_Seguridad_Page"
import MKPHistorialPage from "../../pages/MKP/MKP_Historial_Page"
import MKPTerminosCondicionesPage from "../../pages/MKP/MKP_TerminosCondiciones_Page"
import Util from "../../helpers/utils"

// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Configuracion")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await isVisiblePopUpcapacitaciones(MKPUpdateDataPopup)
        await t
            .click(MKPHeaderComp.userHello)
            .click(MKPHeaderComp.configuracionBtn)
            .expect(MKPMiPerfilPage.usuarioNameLabel.visible).ok()
    })

    test.meta("type","smog")("TC-58522 Validar editar el perfil de usuario", async t => {
        await changeProfileAndCheck(MKPMiPerfilPage, MKPEditarPerfilComp, MKPNotificacionPopup, "NelsonPrueba", "LorcaPrueba", "+56944590547")
        await t.wait(5000)
        //rollback original data
        await changeProfileAndCheck(MKPMiPerfilPage, MKPEditarPerfilComp, MKPNotificacionPopup, loginUserData[enviroment].userGlobal.nombre, loginUserData[enviroment].userGlobal.apellido, loginUserData[enviroment].userGlobal.telefono)
        console.log("PASS TC-58522 Validar editar el perfil de usuario") 
    });

    test("TC-58523 Validar editar informacion general de la empresa", async t => {
        await t
            .click(MKPConfiguracionMenuComp.empresaMenuLink)
            .expect(MKPEmpresaPage.empresasTab.visible).ok()
            .click(MKPEmpresaPage.editarEmpresaBtn)
        await editarInformacionGeneralEmpresaYValidar(MKPEmpresaPage, MKPNotificacionPopup, "Nombre Comercial Prueba", "Micro 0 UF - 2.400 UF Vtas/A??o", loginUserData[enviroment].userGlobal.nombreCompleto)
        //rollback data
        await editarInformacionGeneralEmpresaYValidar(MKPEmpresaPage, MKPNotificacionPopup, " ", "Grande m??s 100.000 UD Vtas/A??os", loginUserData[enviroment].userGlobal.nombreCompleto)
        console.log("PASS TC-58523 Validar editar informacion general de la empresa") 
    });

    test("TC-58530 Validar agregar categor??as", async t => {
        await t
            .click(MKPConfiguracionMenuComp.empresaMenuLink)
            .expect(MKPEmpresaPage.empresasTab.visible).ok()
            .click(MKPEmpresaPage.editarEmpresaBtn)
            .click(MKPEmpresaPage.categoriasPalabrasClavesTab)
        await agregarCategoriaYValidar(MKPEmpresaPage, MKPNotificacionPopup, "Aislantes e Impermeabilizantes", "Mixtos", loginUserData[enviroment].userGlobal.nombreCompleto)
        console.log("PASS TC-58530 Validar agregar categor??as") 
    });

    test("TC-58793 Validar quitar categor??as", async t => {
        await t
            .click(MKPConfiguracionMenuComp.empresaMenuLink)
            .expect(MKPEmpresaPage.empresasTab.visible).ok()
            .click(MKPEmpresaPage.editarEmpresaBtn)
            .click(MKPEmpresaPage.categoriasPalabrasClavesTab)
        await quitarCategoriaYValidar(MKPEmpresaPage, MKPNotificacionPopup, "Aislantes e Impermeabilizantes", "Mixtos", loginUserData[enviroment].userGlobal.nombreCompleto)
        console.log("PASS TC-58793 Validar quitar categor??as") 
    });

    test("TC-58764 Validar a??adir Palabra Clave", async t => {
        await t
            .click(MKPConfiguracionMenuComp.empresaMenuLink)
            .expect(MKPEmpresaPage.empresasTab.visible).ok()
            .click(MKPEmpresaPage.editarEmpresaBtn)
            .click(MKPEmpresaPage.categoriasPalabrasClavesTab)
        await agregarPalabraClave(MKPEmpresaPage, MKPNotificacionPopup, "PruebaQA", loginUserData[enviroment].userGlobal.nombreCompleto)
        await quitarPalabraClave(MKPEmpresaPage, MKPNotificacionPopup, loginUserData[enviroment].userGlobal.nombreCompleto)
        console.log("PASS TC-58764 Validar a??adir Palabra Clave") 
    });

    test("TC-58531 Validar visualizaci??n de p??gina Suscripci??n", async t => {
        await t.click(MKPConfiguracionMenuComp.suscripcionMenuLink)
        await validarProductoSuscrito(MKPSuscripcionPage,"Cotizaciones")
        await validarProductoSuscrito(MKPSuscripcionPage,"Monitor de Obra")
        await validarProductoSuscrito(MKPSuscripcionPage,"Negocios Anticipados")
        await validarProductoSuscrito(MKPSuscripcionPage,"??rdenes de Compra")
        await validarProductoSuscrito(MKPSuscripcionPage,"Despachos")
        await validarProductoSuscrito(MKPSuscripcionPage,"Subcontratos")
        await validarProductoSuscrito(MKPSuscripcionPage,"Consulta Estado Factura")
        await validarProductoSuscrito(MKPSuscripcionPage,"Pagos Recibidos")
        await validarProductoSuscrito(MKPSuscripcionPage,"M??tricas")
        console.log("PASS TC-58531 Validar visualizaci??n de p??gina Suscripci??n") 
    });

    test("TC-58532 Validar visualizaci??n de p??gina Notificaciones", async t => {
        await t
            .click(MKPConfiguracionMenuComp.notificacionesMenuLink)
            .expect(MKPNotificacionesPage.notificacionesTitle.visible).ok("P??gina Notificaciones no visible")
        console.log("PASS TC-58532 Validar visualizaci??n de p??gina Notificaciones") 
    });

    test("TC-58533 Validar visualizaci??n de p??gina Seguridad de dominio", async t => {
        await t
            .click(MKPConfiguracionMenuComp.seguridadMenuLink)
            .expect(MKPSeguridadPage.seguridadTitle.visible).ok("P??gina Seguridad de dominio no visible")
        console.log("PASS TC-58533 Validar visualizaci??n de p??gina Seguridad de dominio") 
    });

    test("TC-58534 Validar visualizaci??n de p??gina Historial", async t => {
        await t
            .click(MKPConfiguracionMenuComp.historialMenuLink)
            .expect(MKPHistorialPage.historialTab.visible).ok("P??gina Historial no visible")
        console.log("PASS TC-58534 Validar visualizaci??n de p??gina Historial") 
    });
   
    test("TC-58535 Validar visualizaci??n de p??gina T??rminos y Condiciones", async t => {
        await t
            .click(MKPConfiguracionMenuComp.terminosCondicionesMenuLink)
            .expect(MKPTerminosCondicionesPage.terminosCondicionesTitle.visible).ok("P??gina T??rminos y Condiciones no visible")
        console.log("PASS TC-58535 Validar visualizaci??n de p??gina T??rminos y Condiciones") 
    });