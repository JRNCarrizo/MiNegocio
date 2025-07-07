import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { 
  RegistroEmpresaDTO, 
  LoginDTO, 
  Empresa, 
  Usuario, 
  Producto, 
  Cliente, 
  Pedido,
  ApiResponse,
  PaginatedResponse
} from '../types';

// Configuración base de Axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token de autenticación
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para manejar respuestas
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos de autenticación
  async registrarEmpresa(data: RegistroEmpresaDTO): Promise<{ mensaje: string; empresa: Empresa }> {
    const response = await this.api.post('/empresas/registro', data);
    return response.data;
  }

  async verificarSubdominio(subdominio: string): Promise<{ disponible: boolean }> {
    const response = await this.api.get(`/empresas/verificar-subdominio/${subdominio}`);
    return response.data;
  }

  async obtenerEmpresaPorSubdominio(subdominio: string): Promise<ApiResponse<Empresa>> {
    const response = await this.api.get(`/empresas/subdominio/${subdominio}`);
    return response.data;
  }

  async login(data: LoginDTO): Promise<{ token: string; nombreUsuario: string; email: string; roles: string[]; empresaId: number; empresaNombre: string; empresaSubdominio: string }> {
    const response = await this.api.post('/auth/login', data);
    return response.data;
  }

  async obtenerPerfil(): Promise<ApiResponse<Usuario>> {
    const response = await this.api.get('/auth/perfil');
    return response.data;
  }

  // Métodos de empresa
  async actualizarPersonalizacion(
    empresaId: number, 
    data: { logoUrl?: string; colorPrimario?: string; colorSecundario?: string }
  ): Promise<ApiResponse<Empresa>> {
    const response = await this.api.put(`/empresas/${empresaId}/personalizacion`, data);
    return response.data;
  }

  // Métodos de productos (requieren empresaId)
  async obtenerProductos(
    empresaId: number,
    page = 0, 
    size = 10, 
    filtros?: { nombre?: string; categoria?: string; marca?: string }
  ): Promise<PaginatedResponse<Producto>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...filtros
    });
    const response = await this.api.get(`/empresas/${empresaId}/productos/paginado?${params}`);
    return response.data;
  }

  async obtenerTodosLosProductos(empresaId: number): Promise<ApiResponse<Producto[]>> {
    const response = await this.api.get(`/empresas/${empresaId}/productos`);
    return response.data;
  }

  async obtenerTodosLosProductosIncluirInactivos(empresaId: number): Promise<ApiResponse<Producto[]>> {
    const response = await this.api.get(`/empresas/${empresaId}/productos/todos`);
    return response.data;
  }

  async obtenerProducto(empresaId: number, id: number, incluirInactivos = false): Promise<ApiResponse<Producto>> {
    const params = incluirInactivos ? '?incluirInactivos=true' : '';
    const response = await this.api.get(`/empresas/${empresaId}/productos/${id}${params}`);
    return response.data;
  }

  async crearProducto(empresaId: number, data: Partial<Producto>): Promise<ApiResponse<Producto>> {
    const response = await this.api.post(`/empresas/${empresaId}/productos`, data);
    return response.data;
  }

  async actualizarProducto(empresaId: number, id: number, data: Partial<Producto>): Promise<ApiResponse<Producto>> {
    const response = await this.api.put(`/empresas/${empresaId}/productos/${id}`, data);
    return response.data;
  }

  async actualizarStock(empresaId: number, id: number, stock: number): Promise<ApiResponse<Producto>> {
    const response = await this.api.patch(`/empresas/${empresaId}/productos/${id}/stock`, { stock });
    return response.data;
  }

  async eliminarProducto(empresaId: number, id: number): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/empresas/${empresaId}/productos/${id}`);
    return response.data;
  }

  async obtenerCategorias(empresaId?: number): Promise<ApiResponse<string[]>> {
    if (empresaId) {
      const response = await this.api.get(`/empresas/${empresaId}/productos/categorias`);
      return response.data;
    } else {
      // Fallback temporal para compatibilidad
      const response = await this.api.get('/productos/categorias');
      return response.data;
    }
  }

  async obtenerMarcas(): Promise<ApiResponse<string[]>> {
    const response = await this.api.get('/productos/marcas');
    return response.data;
  }

  // Métodos de clientes (requieren empresaId)
  async obtenerClientes(empresaId: number, page = 0, size = 10): Promise<PaginatedResponse<Cliente>> {
    const response = await this.api.get(`/empresas/${empresaId}/clientes?page=${page}&size=${size}`);
    return response.data;
  }

  async obtenerCliente(empresaId: number, id: number): Promise<ApiResponse<Cliente>> {
    const response = await this.api.get(`/empresas/${empresaId}/clientes/${id}`);
    return response.data;
  }

  async crearCliente(empresaId: number, data: Partial<Cliente>): Promise<ApiResponse<Cliente>> {
    const response = await this.api.post(`/empresas/${empresaId}/clientes`, data);
    return response.data;
  }

  async actualizarCliente(empresaId: number, id: number, data: Partial<Cliente>): Promise<ApiResponse<Cliente>> {
    const response = await this.api.put(`/empresas/${empresaId}/clientes/${id}`, data);
    return response.data;
  }

  // Métodos de pedidos (requieren empresaId)
  async obtenerPedidos(empresaId: number, page = 0, size = 10, estado?: string): Promise<PaginatedResponse<Pedido>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(estado && { estado })
    });
    const response = await this.api.get(`/empresas/${empresaId}/pedidos?${params}`);
    return response.data;
  }

  async obtenerPedido(empresaId: number, id: number): Promise<ApiResponse<Pedido>> {
    const response = await this.api.get(`/empresas/${empresaId}/pedidos/${id}`);
    return response.data;
  }

  async actualizarEstadoPedido(empresaId: number, id: number, estado: string): Promise<ApiResponse<Pedido>> {
    const response = await this.api.put(`/empresas/${empresaId}/pedidos/${id}/estado`, { estado });
    return response.data;
  }

  async cancelarPedido(empresaId: number, id: number): Promise<ApiResponse<Pedido>> {
    const response = await this.api.put(`/empresas/${empresaId}/pedidos/${id}/cancelar`);
    return response.data;
  }

  // Métodos de mensajes (requieren empresaId)
  async obtenerMensajes(empresaId: number, page = 0, size = 10): Promise<PaginatedResponse<{ id: number; asunto: string; mensaje: string; leido: boolean }>> {
    const response = await this.api.get(`/empresas/${empresaId}/mensajes?page=${page}&size=${size}`);
    return response.data;
  }

  async responderMensaje(empresaId: number, id: number, respuesta: string): Promise<ApiResponse<{ success: boolean }>> {
    const response = await this.api.post(`/empresas/${empresaId}/mensajes/${id}/responder`, { respuesta });
    return response.data;
  }

  // Métodos de estadísticas (requieren empresaId)
  async obtenerEstadisticas(empresaId: number): Promise<ApiResponse<{ [key: string]: number }>> {
    const response = await this.api.get(`/empresas/${empresaId}/dashboard/estadisticas`);
    return response.data;
  }

  // Métodos de subida de archivos
  async subirImagenProducto(empresaId: number, archivo: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('imagen', archivo);
    
    const response = await this.api.post(`/empresas/${empresaId}/productos/subir-imagen`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async eliminarImagenProducto(empresaId: number, urlImagen: string): Promise<ApiResponse<{ mensaje: string }>> {
    const response = await this.api.delete(`/empresas/${empresaId}/productos/eliminar-imagen`, {
      params: { url: urlImagen }
    });
    return response.data;
  }

  async subirImagen(archivo: File, tipo: 'logo' | 'producto'): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('tipo', tipo);
    
    const response = await this.api.post('/archivos/subir', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async obtenerProductosPorEstado(
    empresaId: number,
    activo?: boolean
  ): Promise<Producto[]> {
    const params = new URLSearchParams();
    if (activo !== undefined) {
      params.append('activo', activo.toString());
    }
    
    const response = await this.api.get(`/empresas/${empresaId}/productos/por-estado?${params}`);
    return response.data;
  }
}

export default new ApiService();
