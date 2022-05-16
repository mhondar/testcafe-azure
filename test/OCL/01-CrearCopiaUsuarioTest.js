import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import OCLConfiguracionOneClickComp from "../../pages/OCL/OCL_ConfiguracionOneClick_Comp"
import OCLAdministracionUsuarioPage, {buscarUsuario, validarDescargaExcel} from "../../pages/OCL/OCL_AdministracionUsuario_Page"
import OCLNuevoUsuarioPage from "../../pages/OCL/OCL_NuevoUsuario_Page"
import OCLDefinirUsuariosPage, {seleccionarUsuarioOrigen, llenarDatosUsuario, agregarUsuario} from "../../pages/OCL/OCL_DefinirUsuario_Page"
import OCLAsignarCentrosGestionPage, {seleccionarCentroGestion, seleccionarTodosLosCentroGestion} from "../../pages/OCL/OCL_AsignarCentrosGestion_Page"
import OCLASignarPerfilesPage, {validarModal} from "../../pages/OCL/OCL_AsignarPerfiles_Page"

const url = Util.getUrl("SCM")
let enviroment = process.env.ENV;
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const userData = require('../../data/OCL/copiarUsuarioData.json')


fixture("Suite Pruebas iConstruye Crear copia de Usuario")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion ) 
        await clickMenuSubmenu(SCMHeaderComp, "Configuración", "Configuración One Click")
        await t.expect(OCLConfiguracionOneClickComp.titlePage.visible).ok("No se visualiza la página de Configuración de One Click")
    })

   test.meta("type","smog").meta("problem","false")("TC-66385 Validar menú Configuración One Click", async t => {
        console.log("PASS TC-66385 Validar menú Configuración One Click")
   });

   test.meta("problem","false")("TC-66360 Crear copia de Usuario con un centro de gestión", async t => {
        await t
            .click(OCLConfiguracionOneClickComp.UsuarioIcons)
            .expect(OCLAdministracionUsuarioPage.titlePage.visible).ok("No se visualiza la página de Administración de Usuario")
            .click(OCLAdministracionUsuarioPage.nuevoUsuarioBtn)
            .expect(OCLNuevoUsuarioPage.titlePage.visible).ok("No se visualiza la página de Nuevo Usuario")
            .click(OCLNuevoUsuarioPage.copiarUsuarioExistenteIcons)
        await seleccionarUsuarioOrigen(OCLDefinirUsuariosPage, userData[enviroment].copiarUsuario.usuario)
        let nombreCompleto = await llenarDatosUsuario(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario, "PruebaRobot", "+56-9-3288994", "SI")
        await agregarUsuario(OCLDefinirUsuariosPage)
        await seleccionarCentroGestion(OCLAsignarCentrosGestionPage)
        await t
            .expect(OCLASignarPerfilesPage.titlePage.visible).ok("No se visualiza la página de Asignar Perfiles")
            .click(OCLASignarPerfilesPage.siguienteBtn)
        //await validarModal(OCLASignarPerfilesPage)
        await t.click(OCLASignarPerfilesPage.finalizarBtn)
        await buscarUsuario(OCLAdministracionUsuarioPage, nombreCompleto)
        await t.wait(2000)
        console.log("PASS TC-66360 Crear copia de Usuario con un centro de gestión")
});

test.meta("problem","false")("TC-66488 Validar descarga excel de Usuarios", async t => {
    await t
        .click(OCLConfiguracionOneClickComp.UsuarioIcons)
        .expect(OCLAdministracionUsuarioPage.titlePage.visible).ok("No se visualiza la página de Administración de Usuario")
    await validarDescargaExcel(OCLAdministracionUsuarioPage)
    await t.wait(1000)
    console.log("PASS TC-66488 Validar descarga excel de Usuarios")
});

test.meta("problem","false")("TC-66495 Crear copia de Usuario con todos los centro de gestión", async t => {
    await t
        .click(OCLConfiguracionOneClickComp.UsuarioIcons)
        .expect(OCLAdministracionUsuarioPage.titlePage.visible).ok("No se visualiza la página de Administración de Usuario")
        .click(OCLAdministracionUsuarioPage.nuevoUsuarioBtn)
        .expect(OCLNuevoUsuarioPage.titlePage.visible).ok("No se visualiza la página de Nuevo Usuario")
        .click(OCLNuevoUsuarioPage.copiarUsuarioExistenteIcons)
    await seleccionarUsuarioOrigen(OCLDefinirUsuariosPage, userData[enviroment].copiarUsuario.usuario)
    let nombreCompleto = await llenarDatosUsuario(OCLDefinirUsuariosPage, userData[enviroment].reemplazarUsuario.usuario, "PruebaRobot", "+56-9-3288994", "SI")
    await agregarUsuario(OCLDefinirUsuariosPage)
    await seleccionarTodosLosCentroGestion(OCLAsignarCentrosGestionPage)
    await t
        .expect(OCLASignarPerfilesPage.titlePage.visible).ok("No se visualiza la página de Asignar Perfiles")
        .click(OCLASignarPerfilesPage.siguienteBtn)
   // await validarModal(OCLASignarPerfilesPage)
    await t.click(OCLASignarPerfilesPage.finalizarBtn)
    await buscarUsuario(OCLAdministracionUsuarioPage, nombreCompleto)
    console.log("PASS TC-66495 Crear copia de Usuario con todos los centro de gestión")
});





   
   