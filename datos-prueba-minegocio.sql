-- Script SQL para insertar datos de prueba con subdominio "minegocio"

-- Insertar empresa con subdominio "minegocio"
INSERT INTO empresas (
    nombre, 
    subdominio, 
    email, 
    telefono, 
    descripcion, 
    color_primario, 
    color_secundario, 
    moneda, 
    estado_suscripcion, 
    fecha_fin_prueba, 
    activa, 
    fecha_creacion, 
    fecha_actualizacion
) VALUES (
    'Mi Negocio Demo', 
    'minegocio', 
    'admin@minegocio.com', 
    '+54 11 4567-8901', 
    'Empresa de demostración para mostrar las funcionalidades del sistema', 
    '#3B82F6', 
    '#1F2937', 
    'ARS', 
    'PRUEBA', 
    '2025-08-07 23:59:59', 
    true, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
);

-- Insertar usuario administrador para la empresa (ID 2)
INSERT INTO usuarios (
    nombre, 
    apellido, 
    email, 
    contrasena, 
    rol, 
    activo, 
    empresa_id, 
    fecha_creacion, 
    fecha_actualizacion
) VALUES (
    'Admin', 
    'Demo', 
    'admin@minegocio.com', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password
    'ADMINISTRADOR', 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
);

-- Insertar productos de ejemplo para la empresa minegocio
INSERT INTO productos (
    nombre, 
    descripcion, 
    precio, 
    categoria, 
    marca, 
    stock, 
    activo, 
    empresa_id, 
    fecha_creacion, 
    fecha_actualizacion
) VALUES 
(
    'Laptop Gamer Pro', 
    'Laptop de alto rendimiento para gaming y trabajo profesional', 
    1250000.00, 
    'Electrónicos', 
    'TechPro', 
    15, 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
),
(
    'Monitor 4K Ultra', 
    'Monitor 4K de 27 pulgadas con tecnología HDR', 
    450000.00, 
    'Electrónicos', 
    'ViewMax', 
    8, 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
),
(
    'Teclado Mecánico RGB', 
    'Teclado mecánico con iluminación RGB y switches azules', 
    85000.00, 
    'Accesorios', 
    'KeyMaster', 
    25, 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
),
(
    'Mouse Gaming Wireless', 
    'Mouse inalámbrico de alta precisión para gaming', 
    65000.00, 
    'Accesorios', 
    'GamePro', 
    20, 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
),
(
    'Webcam Full HD', 
    'Cámara web con resolución Full HD y micrófono integrado', 
    45000.00, 
    'Electrónicos', 
    'CamTech', 
    12, 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
);

-- Insertar algunos clientes de ejemplo
INSERT INTO clientes (
    nombre, 
    apellido, 
    email, 
    telefono, 
    direccion, 
    fecha_nacimiento, 
    activo, 
    empresa_id, 
    fecha_creacion, 
    fecha_actualizacion
) VALUES 
(
    'Juan', 
    'Pérez', 
    'juan.perez@email.com', 
    '+54 11 1234-5678', 
    'Av. Corrientes 1234, Buenos Aires', 
    '1990-05-15', 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
),
(
    'María', 
    'González', 
    'maria.gonzalez@email.com', 
    '+54 11 8765-4321', 
    'Calle Falsa 123, CABA', 
    '1985-08-22', 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
),
(
    'Carlos', 
    'Rodríguez', 
    'carlos.rodriguez@email.com', 
    '+54 11 5555-6666', 
    'Av. Santa Fe 4567, Buenos Aires', 
    '1992-12-10', 
    true, 
    2, 
    '2025-01-01 12:00:00', 
    '2025-01-01 12:00:00'
);

-- Confirmar la inserción
SELECT 'Datos insertados correctamente para empresa minegocio' as mensaje;
