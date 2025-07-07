import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubdominio } from '../hooks/useSubdominio';
import toast from 'react-hot-toast';

const RegistroCliente = () => {
  const { empresa, cargando: cargandoEmpresa, error: errorEmpresa } = useSubdominio();
  const [datosRegistro, setDatosRegistro] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
    aceptaTerminos: false,
    aceptaMarketing: false
  });
  const [cargandoRegistro, setCargandoRegistro] = useState(false);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDatosRegistro(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!datosRegistro.nombre || !datosRegistro.apellidos || !datosRegistro.email || !datosRegistro.contrasena) {
      toast.error('Todos los campos obligatorios deben completarse');
      return;
    }

    if (datosRegistro.contrasena !== datosRegistro.confirmarContrasena) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (datosRegistro.contrasena.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!datosRegistro.aceptaTerminos) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      setCargandoRegistro(true);
      
      // Aquí se implementaría la lógica de registro del cliente
      // await apiService.registrarCliente(datosRegistro, empresa.id);
      
      // Simulación por ahora
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('¡Registro exitoso! Ya puedes iniciar sesión');
      // Redirigir al login
      
    } catch (error) {
      console.error('Error en registro:', error);
      toast.error('Error al registrar la cuenta');
    } finally {
      setCargandoRegistro(false);
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
    <div className="registro-cliente-pagina" style={estilosPersonalizados}>
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
          <div className="tarjeta-registro-cliente">
            <div className="encabezado-login">
              <h1 className="titulo-login">Crear Cuenta</h1>
              <p className="subtitulo-login">
                Únete a {empresa.nombre} y disfruta de una experiencia de compra única
              </p>
            </div>

            <form onSubmit={manejarSubmit} className="formulario-registro-cliente">
              <div className="grupo-campos-doble">
                <div className="grupo-campo">
                  <label htmlFor="nombre" className="etiqueta-campo">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={datosRegistro.nombre}
                    onChange={manejarCambio}
                    className="campo-entrada"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="grupo-campo">
                  <label htmlFor="apellidos" className="etiqueta-campo">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={datosRegistro.apellidos}
                    onChange={manejarCambio}
                    className="campo-entrada"
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              <div className="grupo-campo">
                <label htmlFor="email" className="etiqueta-campo">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datosRegistro.email}
                  onChange={manejarCambio}
                  className="campo-entrada"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="grupo-campo">
                <label htmlFor="telefono" className="etiqueta-campo">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={datosRegistro.telefono}
                  onChange={manejarCambio}
                  className="campo-entrada"
                  placeholder="Opcional"
                />
              </div>

              <div className="grupo-campos-doble">
                <div className="grupo-campo">
                  <label htmlFor="contrasena" className="etiqueta-campo">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={datosRegistro.contrasena}
                    onChange={manejarCambio}
                    className="campo-entrada"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="grupo-campo">
                  <label htmlFor="confirmarContrasena" className="etiqueta-campo">
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    value={datosRegistro.confirmarContrasena}
                    onChange={manejarCambio}
                    className="campo-entrada"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="checkboxes-registro">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="aceptaTerminos"
                    checked={datosRegistro.aceptaTerminos}
                    onChange={manejarCambio}
                    className="checkbox"
                    required
                  />
                  <span className="checkmark"></span>
                  Acepto los <a href="#" className="enlace-terminos">términos y condiciones</a> *
                </label>

                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="aceptaMarketing"
                    checked={datosRegistro.aceptaMarketing}
                    onChange={manejarCambio}
                    className="checkbox"
                  />
                  <span className="checkmark"></span>
                  Quiero recibir ofertas y novedades por email
                </label>
              </div>

              <button
                type="submit"
                disabled={cargandoRegistro}
                className="boton boton-primario boton-completo"
              >
                {cargandoRegistro ? (
                  <>
                    <div className="spinner-pequeno"></div>
                    Creando cuenta...
                  </>
                ) : (
                  'Crear mi cuenta'
                )}
              </button>
            </form>

            <div className="separador-login">
              <span>¿Ya tienes cuenta?</span>
            </div>

            <Link to="/login" className="boton boton-secundario boton-completo">
              Iniciar sesión
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

export default RegistroCliente;
