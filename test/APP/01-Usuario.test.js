import APPLoginScreen, {login} from "../../pages/APP/APP_Login_Screen"
import APPTerminosScreen, {validarAceptarTerminosCondiciones} from "../../pages/APP/APP_Terminos_Screen";
import APPCrearPinScreen, {ingresarPin} from "../../pages/APP/APP_CrearPin_Screen";
import APPMainScreen, {validarMensajeBienvenida} from "../../pages/APP/APP_Main_screen";
import APPUserMenuScreen ,{logout} from "../../pages/APP/APP_UserMenu_Screen"
import APPLogoutScreen, {cerrarSession} from "../../pages/APP/APP_Logout_Screen"
import Util from "../../helpers/utils"

const url = Util.getUrl("APP")
const loginUserData = require('../../data/APP/loginUserData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas APP iConstruye Usuario")
    .page(url)
    .beforeEach(async t => {
        await login(APPLoginScreen,loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password)
        await validarAceptarTerminosCondiciones(APPTerminosScreen)
        await ingresarPin(APPCrearPinScreen, loginUserData[enviroment].comprador.pin, 2)
        await validarMensajeBienvenida(APPMainScreen, loginUserData[enviroment].comprador.name, loginUserData[enviroment].comprador.empresaName)
    })

    test.meta("type","smog")("TC- Validar Login", async t => {
        console.log("PASS TC- Validar Login")
    });

    test.meta("type","smog")("TC- Validar Logout", async t => {
        await t.click(APPMainScreen.menuBtn)
        await logout(APPUserMenuScreen)
        await cerrarSession(APPLogoutScreen)
        await t.wait(3000)
        console.log("PASS TC- Validar Logout")
    });
   
    test.only.meta("type","smog")("TC- Validar Login con Pin Creado", async t => {
        await t.click(APPMainScreen.menuBtn)
        await logout(APPUserMenuScreen)
        await cerrarSession(APPLogoutScreen)
       
        // await validarMensajeBienvenida(APPMainScreen, loginUserData[enviroment].comprador.name, loginUserData[enviroment].comprador.empresaName)
        await t.wait(3000)
        console.log("PASS TC- Validar Logout")
    });
