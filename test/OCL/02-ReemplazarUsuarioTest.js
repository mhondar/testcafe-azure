import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import OCLConfiguracionOneClickComp from "../../pages/OCL/OCL_ConfiguracionOneClick_Comp"
import OCLAdministracionUsuarioPage, {buscarUsuario} from "../../pages/OCL/OCL_AdministracionUsuario_Page"
import OCLNuevoUsuarioPage from "../../pages/OCL/OCL_NuevoUsuario_Page"
import OCLDefinirUsuariosPage, {seleccionarUsuarioReemplazar,llenarDatosUsuario} from "../../pages/OCL/OCL_DefinirUsuario_Page"
import OCLResumenPage, {validarDescargaExcel} from "../../pages/OCL/OCL_Resumen_Page"
import OCLEditarUsuarioModal, {editarRutYApellidoUsuario} from "../../pages/OCL/OCL_EditarUsuario_Modal"

const url = Util.getUrl("SCM")
let enviroment = process.env.ENV;
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const userData = require('../../data/OCL/copiarUsuarioData.json')


fixture("Suite Pruebas iConstruye Reemplazar Usuario")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion ) 
        await clickMenuSubmenu(SCMHeaderComp, "Configuración", "Configuración One Click")
        await t
            .expect(OCLConfiguracionOneClickComp.titlePage.visible).ok("No se visualiza la página de Configuración de One Click")
            .click(OCLConfiguracionOneClickComp.UsuarioIcons)
            .expect(OCLAdministracionUsuarioPage.titlePage.visible).ok("No se visualiza la página de Administración de Usuario")
            .click(OCLAdministracionUsuarioPage.nuevoUsuarioBtn)
            .expect(OCLNuevoUsuarioPage.titlePage.visible).ok("No se visualiza la página de Nuevo Usuario")
    })

   test.meta("problem","false")("TC-66729 Crear usuario de reemplazo definitivo", async t => {
        await t.click(OCLNuevoUsuarioPage.crearUsuarioReemplazoDefinitivoIcons)
        await seleccionarUsuarioReemplazar(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario)
        let nombreCompleto = await llenarDatosUsuario(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario, "PruebaRobot", "+56-9-3288994", "SI")
        await t
            .click(OCLDefinirUsuariosPage.siguienteReemplazoBtn)
            .expect(OCLResumenPage.atributosUsuariosLabel.visible).ok("No se visualiza la página de Resumen")
            .click(OCLResumenPage.finalizarBtn)
        await buscarUsuario(OCLAdministracionUsuarioPage, nombreCompleto)      
        console.log("PASS TC-66729 Crear usuario de reemplazo definitivo")
});

test.meta("problem","false")("TC-66731 Validar descarga de excel en crear usuario de reemplazo definitivo", async t => {
    await t.click(OCLNuevoUsuarioPage.crearUsuarioReemplazoDefinitivoIcons)
    await seleccionarUsuarioReemplazar(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario)
    let nombreCompleto = await llenarDatosUsuario(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario, "PruebaRobot", "+56-9-3288994", "SI")
    await t
        .click(OCLDefinirUsuariosPage.siguienteReemplazoBtn)
        .expect(OCLResumenPage.atributosUsuariosLabel.visible).ok("No se visualiza la página de Resumen")
    await validarDescargaExcel(OCLResumenPage)          
    console.log("PASS TC-66731 Validar descarga de excel en crear usuario de reemplazo definitivo")
});

test.meta("problem","false")("TC-66989 Editar perfil de usuario en crear usuario de reemplazo definitivo", async t => {
    await t.click(OCLNuevoUsuarioPage.crearUsuarioReemplazoDefinitivoIcons)
    await seleccionarUsuarioReemplazar(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario)
    let nombreCompleto = await llenarDatosUsuario(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario, "PruebaRobot", "+56-9-3288994", "SI")
    await t
        .click(OCLDefinirUsuariosPage.siguienteReemplazoBtn)
        .expect(OCLResumenPage.atributosUsuariosLabel.visible).ok("No se visualiza la página de Resumen")
        .click(OCLResumenPage.editarUsuarioIcons)
    await editarRutYApellidoUsuario(OCLEditarUsuarioModal)    
    await t.click(OCLResumenPage.finalizarBtn)     
    console.log("PASS TC-66989 Editar perfil de usuario en crear usuario de reemplazo definitivo")
});



