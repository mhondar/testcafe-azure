import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderProvComp, {clickMenuVentas} from "../../pages/SCM/PROVEEDOR/SCM_HeaderProv_Comp"
import Util from "../../helpers/utils"
import SCMBuscarOCProvPage, {buscarOC, validarGrilla, validarEstadoOC} from "../../pages/SCM/PROVEEDOR/SCM_BuscarOCProv_Page"
import SCMInformacionOCProvPage, {completarDatosAprobacion} from "../../pages/SCM/PROVEEDOR/SCM_InformacionOCProv_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const ordenCompraData = require('../../data/SCM/ordenCompra_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Aprobar Orden de Compra desde lado proveedor")
    .page(url)
    .beforeEach(async t => {
         await login(SCMLoginPage, loginUserData[enviroment].proveedor.usuario, loginUserData[enviroment].proveedor.organizacion, loginUserData[enviroment].proveedor.password, loginUserData[enviroment].proveedor.centroGestion)
         await clickMenuVentas(SCMHeaderProvComp, 'CONSULTAR ORDENES DE COMPRA')
         await t.expect(SCMBuscarOCProvPage.titleLabel.visible).ok("No se visualiza la página Buscar Ordenes de Compra")
    })

    test.meta("type","smog").meta("problem","false")("TC-61398 Validar Menú Ventas - Consultar Ordenes de Compra", async t => {
         await t.expect(SCMBuscarOCProvPage.titleLabel.visible).ok("No se visualiza la página Buscar Ordenes de Compra")
         console.log("PASS TC-61398 Validar Menú Ventas - Consultar Ordenes de Compra")
   });

   test.meta("problem","false")("TC-61452 Validar búsqueda de orden de compra", async t => {
         await buscarOC(SCMBuscarOCProvPage)
         let result = await validarGrilla(SCMBuscarOCProvPage, ordenCompraData.empresa, ordenCompraData.sucursal, ordenCompraData.estado)
        console.log("PASS TC-61452 Validar búsqueda de orden de compra")
   });

   test.meta("problem","false")("TC-60977 Validar Aprobar orden de compra desde lado proveedor", async t => {
         await buscarOC(SCMBuscarOCProvPage)
         let result = await validarGrilla(SCMBuscarOCProvPage, ordenCompraData.empresa, ordenCompraData.sucursal, ordenCompraData.estado, ordenCompraData.ccGestion)
         let numOC = await SCMInformacionOCProvPage.getNumeroOC().textContent
         await t.expect(result.trim()).eql(numOC.trim(), "EL número de orden de Compra no coincide con el seleccionado")
         await SCMInformacionOCProvPage.setCodigoProveedor()
         await completarDatosAprobacion(SCMInformacionOCProvPage)
         await validarEstadoOC(SCMBuscarOCProvPage, result.trim(), ordenCompraData.estadoAceptada)
     console.log("PASS TC-60977 Validar Aprobar orden de compra desde lado proveedor")
});










   