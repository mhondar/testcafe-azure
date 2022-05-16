import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp";
import SCMIngresoNotaCorreccionPage, {ingresarDatosProveedor, ingresarDatosNota, ingresarMontosNota, validarMontoPorCorregir} from "../../pages/SCM/SCM_IngresoNotaCorreccion_Page"
import SCMAsociacionFacturaYDocumentosAsociados, {seleccionarFacturaPorNumero} from "../../pages/SCM/SCM_AsociacionFacturaYDocumentosAsociados_Page"
import SCMControlFacturaYNotaPage, {buscarFacturaPorEstado, validarFacturaGrillaYMontoPendiente} from "../../pages/SCM/SCM_ControlFacturaYNota_Page";
import utils from "../../helpers/utils";
import SCMHomePage from "../../pages/SCM/SCM_Home_Page"

const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const notaCorreccionData = require('../../data/SCM/notaCorreccion_Data.json');
let enviroment = process.env.ENV;

fixture("Suite Pruebas iConstruye Nota de Corrección")
    .page(url)
    .beforeEach(async t => {
          await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion)   
     })

   test.meta("type","smog").meta("problem","false")("TC-62889 Validar Menú Nota de Corrección", async t => {
          await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Ingreso de Notas de Corrección")
          await t.switchToIframe(SCMHeaderComp.iFrame)
          await t.expect(SCMIngresoNotaCorreccionPage.titleLabel.visible).ok("No se visualiza la página Ingreso de Nota de Corrección")
          console.log("PASS TC-62889 Validar Menú Nota de Corrección")
   });

   test.meta("problem","false")("TC-62890 Validar crear nota de corrección", async t => {
          await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Control de Documentos")
          await t.switchToIframe(SCMHeaderComp.iFrame)
          await t.expect(SCMControlFacturaYNotaPage.controlFacturaTab.visible).ok("No se visualiza el tab de Control de Factura")
          await buscarFacturaPorEstado(SCMControlFacturaYNotaPage, "Factura Aprobada")       
          let arrayMontoFolio = await validarFacturaGrillaYMontoPendiente(SCMControlFacturaYNotaPage)
          await t.switchToMainWindow()
          await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Ingreso de Notas de Corrección")
          await t.switchToIframe(SCMHeaderComp.iFrame)
          await t.expect(SCMIngresoNotaCorreccionPage.titleLabel.visible).ok("No se visualiza la página Ingreso de Nota de Corrección")
          let randomNumber = Util.between(600000,999999)
          await ingresarDatosProveedor(SCMIngresoNotaCorreccionPage, notaCorreccionData.rutProveedor, notaCorreccionData.razonSocial, notaCorreccionData.sucursal)
          let fecha = Util.getDateNow()
          await ingresarDatosNota(SCMIngresoNotaCorreccionPage, "Nota de Crédito Electrónica", randomNumber.toString(), randomNumber.toString(), fecha)
          let montoPendiente = arrayMontoFolio[0]
          let ivaNC = utils.getIva(parseInt(montoPendiente))
          await ingresarMontosNota(SCMIngresoNotaCorreccionPage, montoPendiente.toString(), parseInt(ivaNC).toString())
          await t
              .click(SCMIngresoNotaCorreccionPage.aceptarBtn)
              .click(SCMIngresoNotaCorreccionPage.asociarDocumentoBtn)
          let numeroFact = arrayMontoFolio[1]    
          await seleccionarFacturaPorNumero(SCMAsociacionFacturaYDocumentosAsociados, numeroFact.toString(), "Todas" )     
          await t
              .click(SCMAsociacionFacturaYDocumentosAsociados.documentosAsociadosTab)
              .click(SCMAsociacionFacturaYDocumentosAsociados.aceptarBtn)
          await t.expect(SCMIngresoNotaCorreccionPage.titleLabel.visible).ok("No se visualiza la página Ingreso de Nota de Corrección")
          await validarMontoPorCorregir(SCMIngresoNotaCorreccionPage)
          await t.expect(SCMHomePage.bienvenidoLabel.visible).ok("No se visualiza página principal")
         console.log("PASS TC-62890 Validar crear nota de corrección")    
    });
