package com.tienda.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Cliente")
public class Cliente {

    @Id
    @Column(name = "no_cliente", length = 45)
    private String noCliente;

    @Column(name = "no_factura", length = 25, nullable = false)
    private String noFactura;

    public Cliente() {}

    public String getNoCliente() {
        return noCliente;
    }

    public void setNoCliente(String noCliente) {
        this.noCliente = noCliente;
    }

    public String getNoFactura() {
        return noFactura;
    }

    public void setNoFactura(String noFactura) {
        this.noFactura = noFactura;
    }
}
