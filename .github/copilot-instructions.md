# Instrucciones para GitHub Copilot

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexto del Proyecto

Este es un sistema de gestión de negocios multi-tenant desarrollado con:

### Backend (Java Spring Boot)
- **Lenguaje**: Java 17
- **Framework**: Spring Boot 3.3.6
- **Base de datos**: PostgreSQL (desarrollo con H2)
- **Arquitectura**: REST API multi-tenant
- **Autenticación**: JWT + Spring Security

### Frontend (React + Vite)
- **Framework**: React 18 con TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Estado**: Context API + useState/useEffect

## Convenciones de Código

### Español
- Todas las entidades, variables, métodos y comentarios deben estar en **español**
- Nombres de clases: `Empresa`, `Producto`, `Cliente`, `Pedido`
- Nombres de métodos: `crearProducto()`, `obtenerClientes()`, `procesarPedido()`
- Comentarios y documentación en español

### Backend (Java)
- Usar anotaciones Spring estándar: `@Entity`, `@Service`, `@Repository`, `@RestController`
- DTOs para transferencia de datos: `ProductoDTO`, `ClienteDTO`
- Servicios con lógica de negocio: `ProductoService`, `ClienteService`
- Controladores REST con endpoints en español: `/api/productos`, `/api/clientes`

### Frontend (React)
- Componentes funcionales con hooks
- Props y state en español: `productos`, `cliente`, `carrito`
- Archivos de componentes: `ListaProductos.tsx`, `FormularioCliente.tsx`
- Carpetas organizadas por funcionalidad

## Funcionalidades Principales

1. **Multi-tenancy**: Cada empresa tiene su propio espacio aislado
2. **Personalización**: Logo, colores, subdominios personalizados
3. **Gestión de productos**: CRUD completo con imágenes y stock
4. **Sistema de pedidos**: Carrito, checkout, notificaciones
5. **Panel de administración**: Dashboard con estadísticas
6. **Portal del cliente**: Catálogo público y área personal

## Arquitectura
- Backend: API REST stateless con JWT
- Frontend: SPA con routing del lado del cliente
- Base de datos: Diseño multi-tenant con discriminadores
- Almacenamiento: Archivos locales para desarrollo, S3 para producción

Siempre prioriza la experiencia del usuario, la seguridad y el rendimiento.
