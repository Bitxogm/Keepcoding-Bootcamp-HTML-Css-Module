-- PARTE 1: ESTRUCTURA (DDL)

-- !ASEGURARSE DE CREAR INDICES UNICOS DONDE SEA NECESARIO
-- !PROBAR A INSERTAR VALORES DUPLICADOS ....

-- 1. Limpieza y Creación del Esquema
-- Eliminamos el esquema si existe para re-ejecutar el script sin problemas.
DROP SCHEMA IF EXISTS videoclub CASCADE;
CREATE SCHEMA videoclub;

-- Establecemos el esquema 'videoclub' como el predeterminado
SET search_path TO videoclub, public;

-- 2. Creación de Tablas (Sin Claves Foráneas aún)

-- 2.1. Tabla Pelicula (Raíz de títulos)
CREATE TABLE IF NOT EXISTS Pelicula (
    id_pelicula SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL UNIQUE,
    genero VARCHAR(50) NOT NULL,
    director VARCHAR(100),
    sinopsis TEXT
);

-- 2.2. Tabla Socio (Datos del cliente)
CREATE TABLE IF NOT EXISTS Socio (
    id_socio SERIAL PRIMARY KEY,
    dni VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(20)
);

-- 2.3. Tabla Direccion (Relacion 1:1 con Socio - Aplicación de 3FN)
-- id_socio será PK y luego FK, pero la FK se añade abajo.
CREATE TABLE IF NOT EXISTS Direccion (
    id_socio INT PRIMARY KEY,
    codigo_postal VARCHAR(10) NOT NULL,
    calle VARCHAR(200) NOT NULL,
    numero VARCHAR(10),
    piso VARCHAR(10)
);

-- 2.4. Tabla Copia (Inventario físico)
CREATE TABLE IF NOT EXISTS Copia (
    id_copia SERIAL PRIMARY KEY,
    id_pelicula INT NOT NULL -- Columna para la FK, se define abajo
);

-- 2.5. Tabla Prestamo (Transacciones - Tabla de Hechos)
CREATE TABLE IF NOT EXISTS Prestamo (
    id_prestamo SERIAL PRIMARY KEY,
    id_socio INT NOT NULL, -- Columna para la FK a Socio
    id_copia INT NOT NULL, -- Columna para la FK a Copia
    fecha_salida TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion TIMESTAMP -- Si es NULL, la copia está prestada
);

-- 3. Definición de Claves Foráneas (FK) y Restricciones con ALTER TABLE

-- 3.1. Direccion a Socio (Relación 1:1)
ALTER TABLE Direccion 
    ADD CONSTRAINT socio_direccion_fk FOREIGN KEY (id_socio) REFERENCES Socio(id_socio) ON DELETE CASCADE;
    
-- 3.2. Copia a Pelicula (Relación 1:N)
ALTER TABLE Copia 
    ADD CONSTRAINT pelicula_copia_fk FOREIGN KEY (id_pelicula) REFERENCES Pelicula(id_pelicula);

-- 3.3. Prestamo a Socio
ALTER TABLE Prestamo 
    ADD CONSTRAINT socio_prestamo_fk FOREIGN KEY (id_socio) REFERENCES Socio(id_socio);

-- 3.4. Prestamo a Copia
ALTER TABLE Prestamo 
    ADD CONSTRAINT copia_prestamo_fk FOREIGN KEY (id_copia) REFERENCES Copia(id_copia);