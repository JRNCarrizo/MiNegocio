import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubdominio } from '../hooks/useSubdominio';
import toast from 'react-hot-toast';

const LoginCliente = () => {
  const { empresa, cargando: cargandoEmpresa, error: errorEmpresa } = useSubdominio();
  const [datosLogin, setDatosLogin] = useState({
    email: '',
    contrasena: ''
  });
  const [cargandoLogin, setCargandoLogin] = useState(false);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosLogin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!datosLogin.email || !datosLogin.contrasena) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    try {
      setCargandoLogin(true);
      
      // Aquí se implementaría la lógica de login del cliente
      // await apiService.loginCliente(datosLogin, empresa.id);
      
      // Simulación por ahora
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('¡Bienvenido!');
      // Redirigir al perfil del cliente o catálogo
      
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Credenciales incorrectas');
    } finally {
      setCargandoLogin(false);
    }
  };

  if (cargandoEmpresa) {
    return (
      <div className="pagina-cargando">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (errorEmpresa || !empresa) {
    return (
      <div className="pagina-error">
        <div className="contenido-error">
          <h1>Tienda no encontrada</h1>
          <p>La tienda que buscas no existe o no está disponible.</p>
          <Link to="/" className="boton boton-primario">
            Ir al inicio
          </Link>
        </div>
      </div>
    );
  }

  const estilosPersonalizados = empresa.colorPrimario ? {
    '--color-primario': empresa.colorPrimario,
    '--color-secundario': empresa.colorSecundario || '#6366f1'
  } as React.CSSProperties : {};

  return (
    <div className="login-cliente-pagina" style={estilosPersonalizados}>
      {/* Header con logo de la empresa */}
      <header className="header-login-cliente">
        <div className="contenedor">
          <Link to="/" className="logo-empresa-login">
            {empresa.logoUrl ? (
              <img src={empresa.logoUrl} alt={empresa.nombre} className="logo-img" />
            ) : (
              <div className="logo-texto">{empresa.nombre}</div>
            )}
          </Link>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="contenido-login-cliente">
        <div className="contenedor">
          <div className="tarjeta-login-cliente">
            <div className="encabezado-login">
              <h1 className="titulo-login">Iniciar Sesión</h1>
              <p className="subtitulo-login">
                Accede a tu cuenta en {empresa.nombre}
              </p>
            </div>

            <form onSubmit={manejarSubmit} className="formulario-login-cliente">
              <div className="grupo-campo">
                <label htmlFor="email" className="etiqueta-campo">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datosLogin.email}
                  onChange={manejarCambio}
                  className="campo-entrada"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="grupo-campo">
                <label htmlFor="contrasena" className="etiqueta-campo">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={datosLogin.contrasena}
                  onChange={manejarCambio}
                  className="campo-entrada"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="opciones-login">
                <label className="checkbox-container">
                  <input type="checkbox" className="checkbox" />
                  <span className="checkmark"></span>
                  Recordarme
                </label>
                <a href="#" className="enlace-recuperar">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={cargandoLogin}
                className="boton boton-primario boton-completo"
              >
                {cargandoLogin ? (
                  <>
                    <div className="spinner-pequeno"></div>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="separador-login">
              <span>¿No tienes cuenta?</span>
            </div>

            <Link to="/registro" className="boton boton-secundario boton-completo">
              Crear cuenta nueva
            </Link>

            <div className="volver-tienda">
              <Link to="/" className="enlace-volver">
                ← Volver a la tienda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer minimalista */}
      <footer className="footer-login-cliente">
        <div className="contenedor">
          <p>&copy; 2024 {empresa.nombre}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginCliente;
