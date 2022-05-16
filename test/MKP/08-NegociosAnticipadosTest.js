import MKPStartPage from "../../pages/MKP/MKP_Start_Page"
import MKPLoginPage, { login }  from "../../pages/MKP/MKP_Login_Page"
import MKPHeaderComp from "../../pages/MKP/MKP_Header_Comp"
import MKPUpdateDataPopup, {isVisiblePopUp} from "../../pages/MKP/MKP_UpdateData_Popup"
import MKPMenuComp, { clickMenu } from "../../pages/MKP/MKP_Menu_Comp"
import Util from "../../helpers/utils"
import MKPNegociosAnticipadosPage, {validarPaginaNegociosPresente, validarBusquedaPorProducto, validarBusquedaPorCliente, seleccionarRandomNegocioAnticipado} from "../../pages/MKP/MKP_NegociosAnticipados_Page.js"
import MKPInformacionPedidoMaterialesPage, {validarEmpresa, validarProductoPresenteEnLista}  from "../../pages/MKP/MKP_InformacionPedidoMateriales_Page"
// const url = require('../../data/MKP/url.json');
const url = Util.getUrl("MKP")
const loginUserData = require('../../data/MKP/loginUserData.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas MKP iConstruye Negocios Anticipados")
    .page(url)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await login(MKPStartPage,MKPLoginPage,MKPHeaderComp,loginUserData[enviroment].userGlobal.user, loginUserData[enviroment].userGlobal.password)
        await isVisiblePopUp(MKPUpdateDataPopup)
        await clickMenu(MKPHeaderComp,MKPMenuComp, "negocios") 
        await validarPaginaNegociosPresente(MKPNegociosAnticipadosPage)
    })

    test.meta("type","smog")("TC-58831 Validar buscar Negocios Anticipados filtrando por Producto", async t => {
        await validarBusquedaPorProducto(MKPNegociosAnticipadosPage, "flete")
        console.log("PASS TC-58831 Validar buscar Negocios Anticipados filtrando por Producto") 
    });

    test("TC-58832 Validar buscar Negocios Anticipados filtrando por Cliente", async t => {
        await validarBusquedaPorCliente(MKPNegociosAnticipadosPage, "Constructora de Vicente SA")
        console.log("PASS TC-58832 Validar buscar Negocios Anticipados filtrando por Cliente") 
    });

    test("TC-58833 Validar al seleccionar Negocio Anticipado se visualice página de detalles", async t => {
        let datos = await seleccionarRandomNegocioAnticipado(MKPNegociosAnticipadosPage)
        console.log("Monitoreo Script TC-58833. Producto Seleccionado: " + datos)
        await validarEmpresa(MKPInformacionPedidoMaterialesPage,datos[1])
        await validarProductoPresenteEnLista(MKPInformacionPedidoMaterialesPage,datos[0])
        console.log("PASS TC-58833 Validar al seleccionar Negocio Anticipado se visualice página de detalles") 
    });