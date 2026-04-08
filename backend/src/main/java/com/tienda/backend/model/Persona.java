package com.tienda.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Persona")
public class Persona {

    @Id
    @Column(name = "identificacion", length = 25)
    private String identificacion;

    @Column(name = "nombre", length = 50)
    private String nombre;

    @Column(name = "apellidos", length = 50)
    private String apellidos;

    @Column(name = "direccion", length = 25)
    private String direccion;

    @Column(name = "telefono", length = 25)
    private String telefono;

    // Relaciones (Foreign Keys adaptadas)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Cuenta_id_titular")
    private Cuenta cuenta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Empleado_id_Empleado")
    private Empleado empleado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Cliente_no_factura", referencedColumnName = "no_factura")
    private Cliente cliente;

    public Persona() {}

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
