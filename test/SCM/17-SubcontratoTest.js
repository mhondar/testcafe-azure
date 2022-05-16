import SCMLoginPage, {login} from "../../pages/SCM/SCM_Login_Page"
import Util from "../../helpers/utils"
import SCMCreacionSubcontratoPage, {ingresarDatosGeneralesSubcontrato, ingresarDatosComercial, ingresarDatosSubcontratista, ingresarMontosNetos, ingresarGarantias, validarCantidadLineasAgregadas, ingresarDatosProducto, ingresarFormaDePago} from "../../pages/SCM/SCM_CreaciónSubcontrato_Page"
import SCMHeaderComp, {clickMenuSubmenu} from "../../pages/SCM/SCM_Header_Comp";
import SCMClausulaVariosModal, {ingresarClausula} from "../../pages/SCM/SCM_ClausulaVarios_Modal";
import SCMBusquedaDeProveedor, {busquedaDeProveedor} from "../../pages/SCM/SCM_BusquedaDeProveedor_Modal"
import SCMRepresentanteLegalModal, {seleccionarRepresentante} from "../../pages/SCM/SCM_RepresentanteLegal_Modal"
import SCMMaestroProductosModal, {seleccionarProductosParaSubcontrato} from "../../pages/SCM/SCM_MaestroProductos_Modal"
import SCMEdicionLineasSubcontratoPage from "../../pages/SCM/SCM_EdicionLineasSubcontrato_Page"
import SCMEdicionLineasOCPage, {agregarCantidad, agregarPrecioUnitario, agregarGlosa, agregarCuentasCosto} from "../../pages/SCM/SCM_EdicionLineasOC_Page"
import SCMDescuentosOrdenCompraPage, {aplicarDescuentos} from "../../pages/SCM/SCM_DescuentosOrdenCompra_Page"
import SCMInformacionSubcontratoPage, {enviarComentarios} from "../../pages/SCM/SCM_InformacionSubcontrato_Page"
import SCMBuscarSubcontratoPage, {buscarSubcontratoPorNuemro} from "../../pages/SCM/SCM_BuscarSubcontrato_Page"
import SCMBusquedaProductoModal, {seleccionarProducto} from "../../pages/SCM/SCM_BusquedaProducto_Modal"

let enviroment = process.env.ENV;
const url = Util.getUrl("SCM")
const loginUserData = require('../../data/SCM/loginUser_Data.json');
const subcontratoData = require('../../data/SCM/subcontrato_Data.json');

fixture("Suite Pruebas iConstruye Crear Subcontrato")
    .page(url)
    .beforeEach(async t => {
        await login(SCMLoginPage, loginUserData[enviroment].comprador.usuario, loginUserData[enviroment].comprador.organizacion, loginUserData[enviroment].comprador.password, loginUserData[enviroment].comprador.centroGestion) 
        await clickMenuSubmenu(SCMHeaderComp, "Subcontratos", "Crear Subcontrato")
        await t
            .switchToIframe(SCMHeaderComp.iFrame)
            .expect(SCMCreacionSubcontratoPage.creacionSubcontratoTitle.visible).ok("No se visualiza la página de Creación de Subcontrato")
     })

   test.meta("type","smog").meta("problem","true")("TC-65546 Validar submenú Crear Subcontrato", async t => {
        console.log("PASS TC-65546 Validar submenú Crear Subcontrato")
   });

   test.meta("problem","true")("TC-65228 Crear subcontrato con 4 productos por maestro y subcontratista emite factura", async t => {
        //datos generales
        let randomNumber = Util.between(100000,999999)
        await ingresarDatosGeneralesSubcontrato(SCMCreacionSubcontratoPage, subcontratoData.data1.nombreSubcontrato +randomNumber, randomNumber.toString())
        //datos comercial
        let fecha = Util.getDateNow()
        let fechaFuture = Util.getFutureDate()
        await ingresarDatosComercial(SCMCreacionSubcontratoPage, subcontratoData.data1.periocidad , fecha, fecha, fechaFuture, subcontratoData.data1.comentario)          
        await t.click(SCMCreacionSubcontratoPage.ingresarClausulaBtn)
        await ingresarClausula(SCMClausulaVariosModal, "Clausula QA prueba")  
        //datos Subcontratista
        await t
            .switchToIframe(SCMHeaderComp.iFrame)
            .click(SCMCreacionSubcontratoPage.buscarSubcontratistaBtn)
        await busquedaDeProveedor(SCMBusquedaDeProveedor, subcontratoData.data1.nombreProveedor)
        await t.switchToIframe(SCMHeaderComp.iFrame)
        await ingresarDatosSubcontratista(SCMCreacionSubcontratoPage, subcontratoData.data1.sucursal, "Si")
        await t.click(SCMCreacionSubcontratoPage.listarBtn)
        let nameRepresentante = await seleccionarRepresentante(SCMRepresentanteLegalModal)
        await t.switchToIframe(SCMHeaderComp.iFrame)
        let name = await SCMCreacionSubcontratoPage.getNombreRepresentante().textContent
        await t.expect(nameRepresentante.trim()).eql(name.trim())
        //Montos Netos
        await ingresarMontosNetos(SCMCreacionSubcontratoPage, "Peso chileno", "Monto", "100", "10")
        //Garantías
        await ingresarGarantias(SCMCreacionSubcontratoPage,"10", "10", "10", "Cheque", "Letra Notarial", "Carta de fianza", fechaFuture)
        //Servicios y Actividades
        await t.click(SCMCreacionSubcontratoPage.ingresarPorMaestroBtn)
        await seleccionarProductosParaSubcontrato(SCMMaestroProductosModal, subcontratoData.data1.cantProductos, 4)
        //await validarCantidadLineasAgregadas(SCMCreacionSubcontratoPage, subcontratoData.cantProductos )
        await t
            .switchToIframe(SCMHeaderComp.iFrame)
            .click(SCMCreacionSubcontratoPage.editarLineasBtn)
            .expect(SCMEdicionLineasSubcontratoPage.titleEdicionLineasSubcontrato.visible).ok("No se visualiza la página de Edición de Líneas de Subcontrato")
        await agregarCantidad(SCMEdicionLineasOCPage)
        await agregarPrecioUnitario(SCMEdicionLineasOCPage, "200")
        await agregarGlosa(SCMEdicionLineasOCPage)
        await agregarCuentasCosto(SCMEdicionLineasOCPage)
        await t
            .click(SCMEdicionLineasSubcontratoPage.guardarBtn)
            .click(SCMEdicionLineasSubcontratoPage.volverBtn)
            .click(SCMCreacionSubcontratoPage.descuentoIcon)
        await aplicarDescuentos(SCMDescuentosOrdenCompraPage, subcontratoData.data1.descripcionDescuento, subcontratoData.data1.tipoDescuento, subcontratoData.data1.formato, subcontratoData.data1.valor)    
        await t.switchToIframe(SCMHeaderComp.iFrame)
        //let descuento = await SCMCreacionSubcontratoPage.getDescuento().textContent
       // console.log(descuento)
        // await t
        //     .expect(descuento.trim()).eql(subcontratoData.valor, "El valor del descuento no coincide")
            .click(SCMCreacionSubcontratoPage.verificarBtn)
        await enviarComentarios(SCMInformacionSubcontratoPage)
        // validar creacion de subcontrato
        await buscarSubcontratoPorNuemro(SCMBuscarSubcontratoPage,randomNumber.toString(), "en Ejecucion" )
        console.log("PASS TC-65228 Crear subcontrato con 4 productos por maestro y subcontratista emite factura")    
    });

    test.meta("problem","true")("TC-65920 Crear subcontrato agregando un producto y subcontratista sin emitir factura", async t => {
        //datos generales
        let randomNumber = Util.between(100000,999999)
        await ingresarDatosGeneralesSubcontrato(SCMCreacionSubcontratoPage, subcontratoData.data2.nombreSubcontrato +randomNumber, randomNumber.toString())
        //datos comercial
        let fecha = Util.getDateNow()
        let fechaFuture = Util.getFutureDate()
        await ingresarFormaDePago(SCMCreacionSubcontratoPage, "Contra Recepción de  Factura, a 60 Días")
        await ingresarDatosComercial(SCMCreacionSubcontratoPage, subcontratoData.data2.periocidad , fecha, fecha, fechaFuture, subcontratoData.data2.comentario)           
        await t.click(SCMCreacionSubcontratoPage.conIvaRbn)
        let iva = await SCMCreacionSubcontratoPage.getValorIva().textContent
        await t.expect(iva.trim()).eql("19")
        //datos Subcontratista
        await t.click(SCMCreacionSubcontratoPage.buscarSubcontratistaBtn)
        await busquedaDeProveedor(SCMBusquedaDeProveedor, subcontratoData.data2.nombreProveedor)
        await t.switchToIframe(SCMHeaderComp.iFrame)
        await ingresarDatosSubcontratista(SCMCreacionSubcontratoPage, subcontratoData.data2.sucursal, "No")
        await t.click(SCMCreacionSubcontratoPage.listarBtn)
        let nameRepresentante = await seleccionarRepresentante(SCMRepresentanteLegalModal)
        await t.switchToIframe(SCMHeaderComp.iFrame)
       // let name = await SCMCreacionSubcontratoPage.getNombreRepresentante().textContent
       // await t.expect(nameRepresentante.trim()).eql(name.trim())
        //Montos Netos
        await ingresarMontosNetos(SCMCreacionSubcontratoPage, "Peso chileno", "Porcentaje", "40", "5")
        //Servicios y Actividades
        await t.click(SCMCreacionSubcontratoPage.buscarBtn)
        await seleccionarProducto(SCMBusquedaProductoModal, 5)
        let randomNum = Util.between(1,5)
        await t.switchToIframe(SCMHeaderComp.iFrame)
        await ingresarDatosProducto(SCMCreacionSubcontratoPage, subcontratoData.data2.descripcion, randomNum.toString(), subcontratoData.data2.precio, subcontratoData.data2.cuentaCosto)    
        await t.click(SCMCreacionSubcontratoPage.verificarBtn)
        await enviarComentarios(SCMInformacionSubcontratoPage)
        // validar creacion de subcontrato
        await buscarSubcontratoPorNuemro(SCMBuscarSubcontratoPage,randomNumber.toString(), "en Ejecucion" )
        console.log("PASS TC-65920 Crear subcontrato agregando un producto y subcontratista sin emitir factura")    
    });

    // test.meta("problem","true")("TC-66221 Validar guardar un subcontrato", async t => {
    //     //datos generales
    //     let randomNumber = Util.between(100000,999999)
    //     await ingresarDatosGeneralesSubcontrato(SCMCreacionSubcontratoPage, subcontratoData.data2.nombreSubcontrato +randomNumber, randomNumber.toString())
    //     //datos comercial
    //     let fecha = Util.getDateNow()
    //     let fechaFuture = Util.getFutureDate()
    //     await ingresarFormaDePago(SCMCreacionSubcontratoPage, "120 DIAS DESDE ACEPTACION FACTURA")
    //     await ingresarDatosComercial(SCMCreacionSubcontratoPage, subcontratoData.data2.periocidad , fecha, fecha, fechaFuture, subcontratoData.data2.comentario)           
    //     //datos Subcontratista
    //     await t.click(SCMCreacionSubcontratoPage.buscarSubcontratistaBtn)
    //     await busquedaDeProveedor(SCMBusquedaDeProveedor, subcontratoData.data2.nombreProveedor)
    //     await t.switchToIframe(SCMHeaderComp.iFrame)
    //     await ingresarDatosSubcontratista(SCMCreacionSubcontratoPage, subcontratoData.data2.sucursal, "Si")
    //     await t.click(SCMCreacionSubcontratoPage.listarBtn)
    //     let nameRepresentante = await seleccionarRepresentante(SCMRepresentanteLegalModal)
    //     await t
    //         .switchToIframe(SCMHeaderComp.iFrame)
    //         .click(SCMCreacionSubcontratoPage.guardarSubcontratoLink)
    //         .switchToMainWindow()
    //     await clickMenuSubmenu(SCMHeaderComp, "Subcontratos", "Consultar Subcontrato")
    //     await t.switchToIframe(SCMHeaderComp.iFrame)
    //     // validar creacion de subcontrato
    //     await buscarSubcontratoPorNuemro(SCMBuscarSubcontratoPage,randomNumber.toString(), "Guardado" )
    //     console.log("PASS TC-66221 Validar guardar un subcontrato")    
    // });

    



