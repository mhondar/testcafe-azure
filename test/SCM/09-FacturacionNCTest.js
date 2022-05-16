import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp"
import Util from "../../helpers/utils"
import SCMIngresoFactura, {ingresarDatosProveedor, ingresarDatosFactura, ingresarMontosFactura} from "../../pages/SCM/SCM_IngresoFactura_Page"
import SCMControlDocumentoYNotaCorrecion, {buscarDocumentoPorNumero} from "../../pages/SCM/SCM_ControlDocumentoYNotaCorrecion_Page"
import SCMAsociacionDocumentosPage, {seleccionarDocumento, validarDcocumentoRecepcion} from "../../pages/SCM/SCM_AsociacionDocumentos_Page"
import SCMInformacionFacturaPage, {validarSaldoPorAsociar, validarAsociacionDocumento} from "../../pages/SCM/SCM_InformacionFactura_Page"
import SCMSolicitarNotaCorreccionPage, {seleccionarTipoDocumento} from "../../pages/SCM/SCM_SolicitarNotaCorreccion_Page"
import SCMSolicitarAjusteFactura, {validarSaldoPorAsociarEnFactura} from "../../pages/SCM/SCM_SolicitarAjusteFactura_Page"
import SCMControlFacturaYNotaPage, {buscarFactura} from "../../pages/SCM/SCM_ControlFacturaYNota_Page"

let enviroment = process.env.ENV;
const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const facturaData = require('../../data/SCM/facturaData.json');


fixture("Suite Pruebas iConstruye Facturación")
    .page(url)
    .beforeEach(async t => {
          await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion) 
          await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Ingreso de Facturas")
          await t.switchToIframe(SCMHeaderComp.iFrame)
          await t.expect(SCMIngresoFactura.titleLabel.visible).ok("No se visualiza la página Ingreso de factura")
    })

   test.meta("type","smog").meta("problem","false")("TC-62459 Validar menú Ingreso de Facturas", async t => {
          await t.expect(SCMIngresoFactura.titleLabel.visible).ok("No se visualiza la página Ingreso de factura")
          console.log("PASS TC-62459 Validar menú Ingreso de Facturas")
   });

   test.meta("problem","false")("TC-62595 Crear documento de factura sin asociar", async t => {
          let randomNumber = Util.between(100000,400000)
          let fecha = Util.getDateNow()
          await ingresarDatosProveedor(SCMIngresoFactura, facturaData.rutProveedor, facturaData.sucursal)
          await ingresarDatosFactura(SCMIngresoFactura,facturaData.tipoFactura, randomNumber.toString(), randomNumber.toString(), fecha)
          await ingresarMontosFactura(SCMIngresoFactura, facturaData.totalNeto, facturaData.iva)
          await t
               .setNativeDialogHandler(() => true)
               .click(SCMIngresoFactura.aceptarBtn)
               .switchToMainWindow() 
          await clickMenuSubmenu(SCMHeaderComp, "Facturación", "Control de Documentos Sin Asociar")     
          await t.switchToIframe(SCMHeaderComp.iFrame)
          await buscarDocumentoPorNumero(SCMControlDocumentoYNotaCorrecion, randomNumber.toString())
         console.log("PASS TC-62595 Crear documento de factura sin asociar")    
    });

    test.meta("problem","false")("TC-62456 Crear Factura con solicitud de nota de corrección", async t => {
          let randomNumber = Util.between(100000,400000)
          let fecha = Util.getDateNow()
          await ingresarDatosProveedor(SCMIngresoFactura, facturaData.rutProveedor, facturaData.sucursal)
          await ingresarDatosFactura(SCMIngresoFactura,facturaData.tipoFactura, randomNumber.toString(), randomNumber.toString(), fecha)
          await ingresarMontosFactura(SCMIngresoFactura, facturaData.totalNeto, facturaData.iva)
          await t
               .setNativeDialogHandler(() => true)
               .click(SCMIngresoFactura.aceptarBtn)
          await seleccionarDocumento(SCMAsociacionDocumentosPage, facturaData.totalNeto)   
          await t
               .setNativeDialogHandler(() => false)
               .click(SCMAsociacionDocumentosPage.asociarBtn)
               .expect(SCMAsociacionDocumentosPage.documentosAsociadosTab.visible).ok("No se visualiza el tab Documentos Asociados")
               .click(SCMAsociacionDocumentosPage.documentosAsociadosTab)
          await validarDcocumentoRecepcion(SCMAsociacionDocumentosPage)     
          await t
               .click(SCMAsociacionDocumentosPage.aceptarBtn)
               .expect(SCMInformacionFacturaPage.titleLabel.visible).ok("No se visualiza la página Información de la factura")
               .click(SCMInformacionFacturaPage.solicitarNotaCorreccionBtn)
               .expect(SCMSolicitarNotaCorreccionPage.titleLabel.visible).ok("No se visualiza la página de Solicitar Nota de Corrección" )
          await seleccionarTipoDocumento(SCMSolicitarNotaCorreccionPage, "Nota Credito")   
          await t
               .click(SCMSolicitarNotaCorreccionPage.volverBtn)
               .expect(SCMInformacionFacturaPage.titleLabel.visible).ok("No se visualiza la página Información de la factura")
          let valorSaldo = await validarSaldoPorAsociar(SCMInformacionFacturaPage)
          await t.expect(SCMSolicitarAjusteFactura.titleLabel.visible).ok("No se visualiza la página Solicitar Ajuste de la Factura")
          await validarSaldoPorAsociarEnFactura(SCMSolicitarAjusteFactura, valorSaldo)
          await t
               .typeText(SCMSolicitarAjusteFactura.motivoInput, facturaData.motivo)
               .click(SCMSolicitarAjusteFactura.guardarBtn)
          await validarSaldoPorAsociarEnFactura(SCMSolicitarAjusteFactura, "0,00") 
          await t
               .expect(SCMSolicitarAjusteFactura.checkVerdeLabel.visible).ok("No se visualiza el check en verde")
               .click(SCMSolicitarAjusteFactura.volverBtn) 
               .expect(SCMInformacionFacturaPage.titleLabel.visible).ok("No se visualiza la página Información de la factura")
          await validarAsociacionDocumento(SCMInformacionFacturaPage)
          await t
               .click(SCMInformacionFacturaPage.verificarBtn)
               .typeText(SCMInformacionFacturaPage.comentarioInput, facturaData.motivo)
               .click(SCMInformacionFacturaPage.enviarBtn)
          await buscarFactura(SCMControlFacturaYNotaPage, randomNumber.toString(),"Factura Aprobada", "Aprobada")     
    console.log("PASS TC-62456 Crear Factura con solicitud de nota de corrección")    
});

   