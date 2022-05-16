import { Selector,t } from "testcafe";
import Util from "../../helpers/utils";

class OCLDefinirUsuariosPage{
    constructor(){
        this.usuarioOrigenLabel = Selector('strong').withText('Usuario de origen')
        this.seleccionaUsuarioDrp = Selector('button').withAttribute('data-id', 'ddlUsuarioOrigen')
        this.nombreUserInput = Selector('input.input-block-level.form-control')
        this.nombreInput = Selector('input#NombreUsuarioNuevo')
        this.apellidoPaternoInput = Selector('input#ApellidoPUsuarioNuevo')
        this.apellidoMaternoInput = Selector('input#ApellidoMUsuarioNuevo')
        this.emailInput = Selector('input#EmailUsuarioNuevo')
        this.cargoInput = Selector('input#CargoUsuarioNuevo')
        this.telefonoInput = Selector('input#TelefonoUsuarioNuevo')
        this.agregarBtn = Selector('#btnAgregar')
        this.usuarioGrilla = Selector('#tablaUsuariosDestinos > tbody > tr > td:nth-child(1)')
        this.siguienteBtn = Selector('#btnSiguiente')
        this.enviarClaveSwitch = Selector('span.switch-switch')
        this.usuarioReemplazarLabel = Selector('strong').withText('Usuario a reemplazar')
        this.seleccionarUsuarioReemplazoDrp = Selector('button').withAttribute('data-id', 'ddlUsuarioReemplazado')
        this.siguienteReemplazoBtn = Selector('#btnSiguienteUrdPaso1')
    }

    getUsuario(nombre){
        return Selector('li').withText(nombre)
    }
}

export default new OCLDefinirUsuariosPage();

export async function seleccionarUsuarioOrigen(OCLDefinirUsuariosPage, usuarioData){
    await t
        .expect(OCLDefinirUsuariosPage.usuarioOrigenLabel.visible).ok("No se visualiza la página de Usuario de Origen")
        .click(OCLDefinirUsuariosPage.seleccionaUsuarioDrp)
        .typeText(OCLDefinirUsuariosPage.nombreUserInput, usuarioData)
        .pressKey('enter')   
        .wait(2000)
}

export async function llenarDatosUsuario(OCLDefinirUsuariosPage, usuarioData, cargo, telefono, enviarClave){
       // let usuarioObt = await OCLDefinirUsuariosPage.getUsuario(usuarioData).textContent    
            //await t.expect(usuarioObt.visible).ok("No se seleccionó por el usuario definido")
        // llenar datos personales
        const nombre = require('../../data/GENERIC/nombres.json');
        const nombreUser = Util.getRandomValueFromJson(nombre)
        const apellido = require('../../data/GENERIC/apellidos.json');
        const apellidoMaterno = Util.getRandomValueFromJson(apellido)
        const apellidoPaterno = Util.getRandomValueFromJson(apellido)
        const email = "email"+nombreUser+apellidoPaterno.trim()+"@oneclick.com"
        await t
            .typeText(OCLDefinirUsuariosPage.nombreInput, nombreUser)
            .typeText(OCLDefinirUsuariosPage.apellidoPaternoInput, apellidoPaterno)
            .typeText(OCLDefinirUsuariosPage.apellidoMaternoInput, apellidoMaterno)
            .typeText(OCLDefinirUsuariosPage.emailInput, email)
            .typeText(OCLDefinirUsuariosPage.cargoInput, cargo)
            .typeText(OCLDefinirUsuariosPage.telefonoInput, telefono)
        if(enviarClave == "NO"){
            await t.click(OCLDefinirUsuariosPage.enviarClaveSwitch)
        } 
        return nombreUser + ' ' +  apellidoPaterno + ' ' + apellidoMaterno;  
}  

export async function agregarUsuario(OCLDefinirUsuariosPage){
        await t
            .click(OCLDefinirUsuariosPage.agregarBtn)
            .wait(2000)
            .expect(OCLDefinirUsuariosPage.usuarioGrilla.visible).ok("No se visualiza el usuario agregado en la grilla")
            .click(OCLDefinirUsuariosPage.siguienteBtn)     
}
   


 
export async function seleccionarUsuarioReemplazar(OCLDefinirUsuariosPage, usuarioData){
    await t
        .expect(OCLDefinirUsuariosPage.usuarioReemplazarLabel.visible).ok("No se visualiza la página de Definir Usuario a Reemplazar")
        .click(OCLDefinirUsuariosPage.seleccionarUsuarioReemplazoDrp)
        .typeText(OCLDefinirUsuariosPage.nombreUserInput, usuarioData)
        .pressKey('enter')   
        .wait(2000)
}