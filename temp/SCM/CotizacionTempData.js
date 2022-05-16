class CotizacionTempData {
    constructor(){
        this.numeroCotizacion = "Uninitialized"
    }

    setNumeroCotizacion(num) {
        this.numeroCotizacion = num
    }

    getNumeroCotizacion(){
        return this.numeroCotizacion;
    }

}
export default new CotizacionTempData();


