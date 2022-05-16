import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHomePage from "../../pages/SCM/SCM_Home_Page"
import Util from "../../helpers/utils"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Usuario")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion) 
    })

   test.meta("type","smog").meta("problem","false")("TC-59596 Validar Login en IC", async t => {
        await t.expect(SCMHomePage.miEscritorioIcons.visible).ok("No se visualiza icono de Mi Escritorio")
        console.log("PASS TC-59596 Validar Login en IC")
   });

   test.meta("problem","false")("TC-59901 Validar Logout en IC", async t => {
        await t
             .expect(SCMHomePage.cerrarSesionIcons.visible).ok("No se visualiza icono de Cerrar Sesion")
             .click(SCMHomePage.cerrarSesionIcons)
             .expect(SCMLoginPage.accesoClientesBtn.visible).ok("No se visualiza botón de Acceso a Clientes")
         console.log("PASS TC-59901 Validar Logout en IC")    
    });