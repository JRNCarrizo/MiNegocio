package com.minegocio.backend.controladores;

import com.minegocio.backend.entidades.Empresa;
import com.minegocio.backend.entidades.Producto;
import com.minegocio.backend.servicios.EmpresaService;
import com.minegocio.backend.servicios.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/publico")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.localhost:3000"})
public class PublicoController {

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ProductoService productoService;

    /**
     * Obtener información pública de una empresa por subdominio
     */
    @GetMapping("/{subdominio}/empresa")
    public ResponseEntity<?> obtenerEmpresaPublica(@PathVariable String subdominio) {
        try {
            Optional<Empresa> empresa = empresaService.obtenerPorSubdominio(subdominio);
            
            if (empresa.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            // Solo devolver información pública de la empresa
            Empresa empresaPublica = empresa.get();
            return ResponseEntity.ok(Map.of(
                "id", empresaPublica.getId(),
                "nombre", empresaPublica.getNombre(),
                "descripcion", empresaPublica.getDescripcion(),
                "logoUrl", empresaPublica.getLogoUrl(),
                "colorPrimario", empresaPublica.getColorPrimario(),
                "colorSecundario", empresaPublica.getColorSecundario(),
                "moneda", empresaPublica.getMoneda()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtener productos públicos (activos) de una empresa por subdominio
     */
    @GetMapping("/{subdominio}/productos")
    public ResponseEntity<?> obtenerProductosPublicos(
            @PathVariable String subdominio,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String buscar) {
        try {
            Optional<Empresa> empresa = empresaService.obtenerPorSubdominio(subdominio);
            
            if (empresa.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Long empresaId = empresa.get().getId();
            
            // Obtener todos los productos activos de la empresa
            List<Producto> productos = productoService.obtenerTodosLosProductos(empresaId);
            
            // Filtrar solo productos activos
            List<Producto> productosActivos = productos.stream()
                .filter(Producto::isActivo)
                .toList();
            
            // Aplicar filtros adicionales si se proporcionan
            if (categoria != null && !categoria.isEmpty()) {
                productosActivos = productosActivos.stream()
                    .filter(p -> categoria.equals(p.getCategoria()))
                    .toList();
            }
            
            if (marca != null && !marca.isEmpty()) {
                productosActivos = productosActivos.stream()
                    .filter(p -> marca.equals(p.getMarca()))
                    .toList();
            }
            
            if (buscar != null && !buscar.isEmpty()) {
                productosActivos = productosActivos.stream()
                    .filter(p -> p.getNombre().toLowerCase().contains(buscar.toLowerCase()) ||
                               (p.getDescripcion() != null && p.getDescripcion().toLowerCase().contains(buscar.toLowerCase())))
                    .toList();
            }
            
            return ResponseEntity.ok(Map.of(
                "mensaje", "Productos obtenidos exitosamente",
                "data", productosActivos
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error al obtener productos públicos",
                "mensaje", e.getMessage()
            ));
        }
    }

    /**
     * Obtener un producto específico público por ID
     */
    @GetMapping("/{subdominio}/productos/{id}")
    public ResponseEntity<?> obtenerProductoPublico(
            @PathVariable String subdominio,
            @PathVariable Long id) {
        try {
            Optional<Empresa> empresa = empresaService.obtenerPorSubdominio(subdominio);
            
            if (empresa.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Long empresaId = empresa.get().getId();
            
            Optional<Producto> producto = productoService.obtenerProductoPorId(id, empresaId);
            
            if (producto.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Producto prod = producto.get();
            
            // Solo devolver el producto si está activo
            if (!prod.isActivo()) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(Map.of(
                "mensaje", "Producto obtenido exitosamente",
                "data", prod
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error al obtener producto público",
                "mensaje", e.getMessage()
            ));
        }
    }

    /**
     * Obtener categorías disponibles para una empresa
     */
    @GetMapping("/{subdominio}/categorias")
    public ResponseEntity<?> obtenerCategoriasPublicas(@PathVariable String subdominio) {
        try {
            Optional<Empresa> empresa = empresaService.obtenerPorSubdominio(subdominio);
            
            if (empresa.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Long empresaId = empresa.get().getId();
            List<String> categorias = productoService.obtenerCategorias(empresaId);
            
            return ResponseEntity.ok(Map.of(
                "mensaje", "Categorías obtenidas exitosamente",
                "data", categorias
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error al obtener categorías",
                "mensaje", e.getMessage()
            ));
        }
    }

    /**
     * Obtener marcas disponibles para una empresa
     */
    @GetMapping("/{subdominio}/marcas")
    public ResponseEntity<?> obtenerMarcasPublicas(@PathVariable String subdominio) {
        try {
            Optional<Empresa> empresa = empresaService.obtenerPorSubdominio(subdominio);
            
            if (empresa.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Long empresaId = empresa.get().getId();
            List<String> marcas = productoService.obtenerMarcas(empresaId);
            
            return ResponseEntity.ok(Map.of(
                "mensaje", "Marcas obtenidas exitosamente",
                "data", marcas
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error al obtener marcas",
                "mensaje", e.getMessage()
            ));
        }
    }
}
