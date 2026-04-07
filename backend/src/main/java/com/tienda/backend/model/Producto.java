package com.tienda.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Producto")
public class Producto {

    @Id
    @Column(name = "id_referencia", length = 25)
    private String idReferencia;

    @Column(name = "nombre", length = 50)
    private String nombre;

    @Column(name = "categoria", length = 50)
    private String categoria;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "precio")
    private Double precio;

    public Producto() {}

    public Producto(String idReferencia, String nombre, String categoria, String color, Double precio) {
        this.idReferencia = idReferencia;
        this.nombre = nombre;
        this.categoria = categoria;
        this.color = color;
        this.precio = precio;
    }

    // Getters and Setters
    public String getIdReferencia() { return idReferencia; }
    public void setIdReferencia(String idReferencia) { this.idReferencia = idReferencia; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
}
