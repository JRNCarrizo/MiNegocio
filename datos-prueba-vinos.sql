-- Insertar empresa de prueba "Vinos del Valle"
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
    'Vinos del Valle',
    'vinos',
    'contacto@vinosdelvalle.com',
    '+54 11 1234-5678',
    'Bodega familiar con los mejores vinos de la región',
    '#8B5CF6',
    '#1F2937',
    'Peso Argentino ($)',
    'ACTIVA',
    '2025-12-31 23:59:59',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insertar usuario administrador para la empresa
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
    'Juan',
    'Pérez',
    'admin@vinosdelvalle.com',
    '$2a$10$N.kmcj7fP9Z/XVGQsj5Fae.HoKM0jfMKj6z4P4Pj6oC4RKr7HF1HK', -- contraseña: 123456
    'ADMINISTRADOR',
    true,
    true,
    (SELECT id FROM empresas WHERE subdominio = 'vinos'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insertar algunos productos de prueba
INSERT INTO productos (
    nombre,
    descripcion,
    precio,
    stock,
    stock_minimo,
    categoria,
    marca,
    unidad,
    activo,
    destacado,
    imagenes,
    empresa_id,
    fecha_creacion,
    fecha_actualizacion
) VALUES 
(
    'Malbec Reserva 2020',
    'Vino tinto de alta calidad, con notas frutales y taninos suaves',
    3500.00,
    50,
    5,
    'Vinos Tintos',
    'Vinos del Valle',
    'Botella',
    true,
    true,
    '["https://via.placeholder.com/400x600/8B5CF6/FFFFFF?text=Malbec+Reserva"]',
    (SELECT id FROM empresas WHERE subdominio = 'vinos'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Chardonnay Premium 2021',
    'Vino blanco elegante con notas cítricas y florales',
    2800.00,
    30,
    3,
    'Vinos Blancos',
    'Vinos del Valle',
    'Botella',
    true,
    false,
    '["https://via.placeholder.com/400x600/F59E0B/FFFFFF?text=Chardonnay"]',
    (SELECT id FROM empresas WHERE subdominio = 'vinos'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Cabernet Sauvignon Gran Reserva',
    'Vino tinto de guarda con 12 meses en barricas de roble francés',
    4500.00,
    25,
    2,
    'Vinos Tintos',
    'Vinos del Valle',
    'Botella',
    true,
    true,
    '["https://via.placeholder.com/400x600/DC2626/FFFFFF?text=Cabernet"]',
    (SELECT id FROM empresas WHERE subdominio = 'vinos'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Rosé de Malbec 2022',
    'Vino rosado fresco y afrutado, perfecto para el verano',
    2200.00,
    40,
    5,
    'Vinos Rosados',
    'Vinos del Valle',
    'Botella',
    true,
    false,
    '["https://via.placeholder.com/400x600/EC4899/FFFFFF?text=Rose"]',
    (SELECT id FROM empresas WHERE subdominio = 'vinos'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
