// const loginScreen  = require('../screenobjects/login.screen');
// const terminosScreen = require('../screenobjects/terminos.screen');
// const crearPinScreen = require('../screenobjects/crearpin.screen');
// const mainScreen = require('../screenobjects/main.screen');
// const bodegaScreen = require('../screenobjects/bodega.screen');
// const solicitudConsumoScreen = require('../screenobjects/solicitudConsumo.screen');
// const generandoSolicitudScreen = require('../screenobjects/generandoSolicitud.screen');
// const agregarItemScreen = require('../screenobjects/agregarItem.screen');
// const detalleItemScreen = require('../screenobjects/detalleItem.screen')
// const keyboardScreen = require('../screenobjects/keyboard.screen')
// const solicitudesScreen = require('../screenobjects/solicitudes.screen')

// const util = require("../../helpers/utils")

// const enviroment = process.env.ENV;
// const loginUserData = require('../data/loginUserData.json');
// const organizacion = "comprador";

// describe('Bodega', () => {
//     before(async() => {
//         await loginScreen.login(loginUserData[enviroment][organizacion].usuario, loginUserData[enviroment][organizacion].organizacion, loginUserData[enviroment][organizacion].password)
//         await terminosScreen.aceptarButton.click();
//         await crearPinScreen.ingresarPin(loginUserData[enviroment][organizacion].pin, 2);
//         const maintitleLabel = await mainScreen.validarMainTitle(loginUserData[enviroment][organizacion].name, loginUserData[enviroment][organizacion].empresaName)
//         await expect(maintitleLabel).toExist();
//     });
  
//     it('TC-05 Abrir Menu Bodega', async () => {
//         await mainScreen.bodegaMenu.click();
//         await expect(bodegaScreen.titleLabel).toExist();
//     });

//     it('TC-06 Seleccionar Solicitud de Consumo', async () => {
//         await bodegaScreen.solicitudConsumoBtn.click()
//         await expect(solicitudConsumoScreen.titleLabel).toExist();
//     });

//     it('TC-07 Cambiar Centro de Gestión', async () => {
//         await solicitudConsumoScreen.cambiarCgBt.click()
//         await solicitudConsumoScreen.centroGestionBtn("CG 10 TestCafe").click()
//         await expect(solicitudConsumoScreen.titleLabel).toExist();
//     });

//     it('TC-07 Click en Crear Solicitud', async () => {
//         await solicitudConsumoScreen.crearSolicitudBtn.click()
//         await expect(solicitudConsumoScreen.seleccionaTipoConsumoTitleModal).toExist();
//     });

//     it('TC-08 Seleccionar tipo de Consumo Item', async () => {
//         await solicitudConsumoScreen.itemOpcionRadio.click()
//         await solicitudConsumoScreen.okBtn.click()
//         await expect(generandoSolicitudScreen.titleLabel).toExist()
//     });

//     it('TC-09 Completar información de Solicitud para generar', async () => {
//         await generandoSolicitudScreen.personaRetiraText.addValue(loginUserData[enviroment][organizacion].personaRetira)
//         await generandoSolicitudScreen.preseleccionarDestinoSelect.click()
//         await expect(generandoSolicitudScreen.preseleccionarDestinoTitlePopup).toExist()
//         await (await generandoSolicitudScreen.getDestinoOption(loginUserData[enviroment][organizacion].destino)).click()
//         await generandoSolicitudScreen.okBtn.click()
//     });

//     it('TC-10 Agregar Item', async () => {
//         await generandoSolicitudScreen.agregarItemBtn.click()
//         await expect(agregarItemScreen.titleLabel).toExist()
//         await agregarItemScreen.bucarItemText.addValue(loginUserData[enviroment][organizacion].item)
//         await expect(agregarItemScreen.getBodegaLabel(loginUserData[enviroment][organizacion].bodega)).toExist("No se muestran resultados de busqueda del Item ingresado")
//         const productoLoc = await agregarItemScreen.getProducto(loginUserData[enviroment][organizacion].producto)
//         console.log(productoLoc)
//         await productoLoc.click()
//         // await expect(detalleItemScreen.aceptarPartidaBtn).toExist()
//         // await detalleItemScreen.aceptarPartidaBtn.click()
//         await expect(detalleItemScreen.titleLabel).toExist()
//         await detalleItemScreen.cantidadText.click()
//         let randomNumber = util.between(1,9).toString()
//         let numberBtn = await keyboardScreen.getNmberBtn(randomNumber)
//         await numberBtn.click()
//         await keyboardScreen.aceptarBtn.click()
//         await detalleItemScreen.destinoSelect.click()
//         await expect(detalleItemScreen.destinoTitlePopup).toExist()
//         await (await detalleItemScreen.getDestinoOption(loginUserData[enviroment][organizacion].destino)).click()
//         await detalleItemScreen.okBtn.click()
//         await detalleItemScreen.partidaSelect.click()
//         await expect(detalleItemScreen.partidaTitlePopup).toExist()
//         await (await detalleItemScreen.getPartidaOption(loginUserData[enviroment][organizacion].partida)).click()
//         await detalleItemScreen.okBtn.click()
//         await detalleItemScreen.comentarioText.addValue("Prueba QA Automatizada")
//         await detalleItemScreen.agregarItemBtn.click()
//         await expect(generandoSolicitudScreen.itemAgregado).toExist()
//         await generandoSolicitudScreen.enviarBtn.click()
//     });

//     it('TC-11 Validar Solicitud generada', async () => {
//        await expect(solicitudesScreen.titleLabel).toExist()
//        await solicitudesScreen.irAlInicioBtn.click()
//        await expect(solicitudConsumoScreen.titleLabel).toExist()
//     });


// });
    
