package com.minegocio.backend.dto;

import java.util.List;

public class JwtRespuestaDTO {
    
    private String token;
    
    private String tipo = "Bearer";
    
    private String nombreUsuario;
    
    private String email;
    
    private List<String> roles;
    
    private Long empresaId;
    
    private String empresaNombre;
    
    private String empresaSubdominio;
    
    // Constructores
    public JwtRespuestaDTO() {}
    
    public JwtRespuestaDTO(String token, String nombreUsuario, String email, 
                          List<String> roles, Long empresaId, String empresaNombre, 
                          String empresaSubdominio) {
        this.token = token;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.roles = roles;
        this.empresaId = empresaId;
        this.empresaNombre = empresaNombre;
        this.empresaSubdominio = empresaSubdominio;
    }
    
    // Getters y Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getTipo() {
        return tipo;
    }
    
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    public String getNombreUsuario() {
        return nombreUsuario;
    }
    
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public List<String> getRoles() {
        return roles;
    }
    
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    
    public Long getEmpresaId() {
        return empresaId;
    }
    
    public void setEmpresaId(Long empresaId) {
        this.empresaId = empresaId;
    }
    
    public String getEmpresaNombre() {
        return empresaNombre;
    }
    
    public void setEmpresaNombre(String empresaNombre) {
        this.empresaNombre = empresaNombre;
    }
    
    public String getEmpresaSubdominio() {
        return empresaSubdominio;
    }
    
    public void setEmpresaSubdominio(String empresaSubdominio) {
        this.empresaSubdominio = empresaSubdominio;
    }
}
