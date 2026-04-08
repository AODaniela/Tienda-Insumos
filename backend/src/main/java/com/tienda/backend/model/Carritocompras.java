package com.tienda.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Carritocompras")
public class Carritocompras {

    @Id
    @Column(name = "id_producto", length = 25)
    private String idProducto;

    @Column(name = "eliminarproducto", length = 10)
    private String eliminarProducto;

    @Column(name = "confirmarpedido", length = 10)
    private String confirmarPedido;

    @Column(name = "preciototal")
    private Float precioTotal;

    public Carritocompras() {}

    public String getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(String idProducto) {
        this.idProducto = idProducto;
    }

    public String getEliminarProducto() {
        return eliminarProducto;
    }

    public void setEliminarProducto(String eliminarProducto) {
        this.eliminarProducto = eliminarProducto;
    }

    public String getConfirmarPedido() {
        return confirmarPedido;
    }

    public void setConfirmarPedido(String confirmarPedido) {
        this.confirmarPedido = confirmarPedido;
    }

    public Float getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(Float precioTotal) {
        this.precioTotal = precioTotal;
    }
}
