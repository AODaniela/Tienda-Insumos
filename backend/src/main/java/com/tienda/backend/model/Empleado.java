package com.tienda.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Empleado")
public class Empleado {

    @Id
    @Column(name = "id_Empleado", length = 25)
    private String idEmpleado;

    @Column(name = "cargo", length = 50)
    private String cargo;

    @Column(name = "sueldo")
    private Float sueldo;

    public Empleado() {}

    public String getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(String idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Float getSueldo() {
        return sueldo;
    }

    public void setSueldo(Float sueldo) {
        this.sueldo = sueldo;
    }
}
