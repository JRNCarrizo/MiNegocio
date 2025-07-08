-- Insertar empresa de prueba "miNegocio"
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
    'miNegocio Demo',
    'minegocio',
    'demo@minegocio.com',
    '+54 11 1234-5678',
    'Tienda de demostración para el sistema miNegocio',
    '#3B82F6',
    '#1F2937',
    'USD',
    'ACTIVA',
    '2025-12-31 23:59:59',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insertar usuario administrador para la empresa miNegocio
INSERT INTO usuarios (
    nombre,
    apellidos,
    email,
    contrasena,
    rol,
    activo,
    email_verificado,
    empresa_id,
    fecha_creacion,
    fecha_actualizacion
) VALUES (
    'Admin',
    'miNegocio',
    'admin@minegocio.com',
    '$2a$10$N.kmcj7fP9Z/XVGQsj5Fae.HoKM0jfMKj6z4P4Pj6oC4RKr7HF1HK', -- contraseña: 123456
    'ADMINISTRADOR',
    true,
    true,
    (SELECT id FROM empresas WHERE subdominio = 'minegocio'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insertar algunos productos de demostración
INSERT INTO productos (
    nombre,
    descripcion,
    precio,
    stock,
    activo,
    empresa_id,
    fecha_creacion,
    fecha_actualizacion
) VALUES 
(
    'Producto Demo 1',
    'Producto de demostración para el catálogo',
    99.99,
    10,
    true,
    (SELECT id FROM empresas WHERE subdominio = 'minegocio'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Producto Demo 2',
    'Segundo producto de demostración',
    149.99,
    5,
    true,
    (SELECT id FROM empresas WHERE subdominio = 'minegocio'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Producto Demo 3',
    'Tercer producto de demostración',
    199.99,
    8,
    true,
    (SELECT id FROM empresas WHERE subdominio = 'minegocio'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
