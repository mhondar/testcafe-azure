// const loginScreen  = require('../screenobjects/login.screen');
// const terminosScreen = require('../screenobjects/terminos.screen');
// const crearPinScreen = require('../screenobjects/crearpin.screen');
// const mainScreen = require('../screenobjects/main.screen');
// const aprobacionesScreen = require('../screenobjects/aprobaciones.screen');
// const ordenCompraScreen = require('../screenobjects/ordenCompra.screen');

// const loginUserData = require('../data/loginUserData.json');
// const enviroment = process.env.ENV;
// const organizacion = "comprador";

// describe('Aprobacion de Documentos', () => {
//     before(async() => {
//         await loginScreen.login(loginUserData[enviroment][organizacion].usuario, loginUserData[enviroment][organizacion].organizacion, loginUserData[enviroment][organizacion].password)
//         await terminosScreen.aceptarButton.click();
//         await crearPinScreen.ingresarPin(loginUserData[enviroment][organizacion].pin, 2);
//         const maintitleLabel = await mainScreen.validarMainTitle(loginUserData[enviroment][organizacion].name, loginUserData[enviroment][organizacion].empresaName)
//         await expect(maintitleLabel).toExist();
//     });

//     it('TC-01 Abrir Aprobaciones de Documentos', async () => {
//         await mainScreen.aprobacionesMenu.click();
//         await expect(aprobacionesScreen.titleLabel).toExist();
//         await aprobacionesScreen.ordenesCompraTab.click()
//     });

//     it('TC-02 Seleccionar Documento a Aprobar', async () => {
//         await aprobacionesScreen.documento.click()
//         await expect(ordenCompraScreen.titleOCLabel).toExist();
//     });

//     it('TC-03 Aprobar documento', async () => {
//         await ordenCompraScreen.aprobarBtn.click()
//         await ordenCompraScreen.mensajeAprobacionText.addValue('Prueba Automatizada QA')
//         await ordenCompraScreen.confirmarBtn.click()
//         await expect(ordenCompraScreen.ocAprobadaPopup).toExist()
//         await ordenCompraScreen.continuarBtnPopup.click()
//     });
// });
    
