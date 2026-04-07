package com.tienda.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Cuenta")
public class Cuenta {

    @Id
    @Column(name = "id_titular", length = 25)
    private String idTitular;

    @Temporal(TemporalType.DATE)
    @Column(name = "fechacreacion")
    private Date fechaCreacion;

    @Column(name = "mediospago", length = 50)
    private String mediosPago;

    // Constructores
    public Cuenta() {}

    public Cuenta(String idTitular, Date fechaCreacion, String mediosPago) {
        this.idTitular = idTitular;
        this.fechaCreacion = fechaCreacion;
        this.mediosPago = mediosPago;
    }

    // Getters y Setters
    public String getIdTitular() {
        return idTitular;
    }

    public void setIdTitular(String idTitular) {
        this.idTitular = idTitular;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getMediosPago() {
        return mediosPago;
    }

    public void setMediosPago(String mediosPago) {
        this.mediosPago = mediosPago;
    }
}
