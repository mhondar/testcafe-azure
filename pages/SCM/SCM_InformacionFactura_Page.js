import { Selector, t } from 'testcafe'

class SCMInformacionFacturaPage{
        constructor(){
            this.titleLabel = Selector('td').withText('Información de la ')
            this.solicitarNotaCorreccionBtn = Selector('#ctrFacturaVista_btnSolNotaCorreccion')
            this.ajusteBtn = Selector('#ctrFacturaVista_btnSolAjuste')
            this.verificarBtn = Selector('a#btnAceptar1')
            this.comentarioInput = Selector('#ctrAprobacionVista_txtComentarios')
            this.enviarBtn = Selector('#btnValidar')
            this.comentarioCorreccionInput = Selector('#txtComentarioCorreccion')
            this.revertirEstadoBtn = Selector('#lnkRevertirEstado')
        }

        getSaldoPorAsociar(){
            return Selector('#ctrFacturaVista_lblSaldoXAsociar')
        }

        getSubtotalFacturaLabel(){
            return Selector('#ctrFacturaVista_lblSubTotalDetalle')
        }

        getTotalAsociadoLabel(){
            return Selector('#ctrFacturaVista_lblTotAsociado')
        }

        getFolioUnicoLabel(){
            return Selector('#EncabezadoFactura_lblFolio')
        }

        
}

export default new SCMInformacionFacturaPage();

export async function validarSaldoPorAsociar(SCMInformacionFacturaPage){
    let saldo = await SCMInformacionFacturaPage.getSaldoPorAsociar().textContent
    if(saldo.toString() > "0"){
        await t.click(SCMInformacionFacturaPage.ajusteBtn)
    }
    else{
        console.log("No hay saldo para asociar")
    }
    return saldo
}

export async function validarAsociacionDocumento(SCMInformacionFacturaPage){
    let subtotalFactura = await SCMInformacionFacturaPage.getSubtotalFacturaLabel().textContent
    let totalAsociado = await SCMInformacionFacturaPage.getTotalAsociadoLabel().textContent
    let saldoPorAsociar = await SCMInformacionFacturaPage.getSaldoPorAsociar().textContent
    await t
        .expect(subtotalFactura).eql(totalAsociado)
        .expect(saldoPorAsociar).eql("0,00")

}

export async function agregarComentarioCorreccionYRevertir(SCMInformacionFacturaPage, comentario){
    await t
        .expect(SCMInformacionFacturaPage.comentarioCorreccionInput.visible).ok("No se visualiza la página de Información de la Factura")
    let folio = await SCMInformacionFacturaPage.getFolioUnicoLabel().textContent    
    await t
        .typeText(SCMInformacionFacturaPage.comentarioCorreccionInput, comentario)
        .click(SCMInformacionFacturaPage.revertirEstadoBtn)
    return folio;
}

