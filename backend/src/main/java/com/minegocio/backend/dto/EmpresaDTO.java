package com.minegocio.backend.dto;

public class EmpresaDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String subdominio;
    private String email;
    private String telefono;
    private String logoUrl;
    private String colorPrimario;
    private String colorSecundario;
    private String moneda;

    // Constructor vacío
    public EmpresaDTO() {
    }

    // Constructor con parámetros
    public EmpresaDTO(Long id, String nombre, String descripcion, String subdominio, 
                      String email, String telefono, String logoUrl, String colorPrimario, 
                      String colorSecundario, String moneda) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subdominio = subdominio;
        this.email = email;
        this.telefono = telefono;
        this.logoUrl = logoUrl;
        this.colorPrimario = colorPrimario;
        this.colorSecundario = colorSecundario;
        this.moneda = moneda;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getSubdominio() {
        return subdominio;
    }

    public void setSubdominio(String subdominio) {
        this.subdominio = subdominio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getColorPrimario() {
        return colorPrimario;
    }

    public void setColorPrimario(String colorPrimario) {
        this.colorPrimario = colorPrimario;
    }

    public String getColorSecundario() {
        return colorSecundario;
    }

    public void setColorSecundario(String colorSecundario) {
        this.colorSecundario = colorSecundario;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }
}
