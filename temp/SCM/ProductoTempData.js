class ProductoTempData {
    constructor(){
        this.codigo = "Uninitialized"
        this.cantidad = "Uninitialized"
    }

    setCodigo(cod) {
        this.codigo = cod
    }

    getCodigo(){
        return this.codigo;
    }

    setCantidad(cant) {
        this.cantidad = cant
    }

    getCantidad(){
        return this.cantidad;
    }

}
export default new ProductoTempData();


