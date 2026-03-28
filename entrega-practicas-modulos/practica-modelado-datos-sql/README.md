# Videoclub - Práctica de Modelado de Datos y SQL

## Descripción

Sistema de gestión de base de datos para un videoclub que permite registrar socios, películas y préstamos.

Este proyecto es parte de la práctica del módulo de Modelado de Datos y SQL.

## Objetivo

Diseñar e implementar una base de datos relacional normalizada que permita gestionar:
- Registro de socios y sus direcciones
- Catálogo de películas y copias físicas
- Control de préstamos y devoluciones

## Entregables

1. Diagrama Entidad-Relación (formato draw.io)
2. Script SQL completo

## Estructura de la Base de Datos

El sistema consta de 5 tablas principales:

- **socios**: Información de los clientes del videoclub
- **direccion**: Direcciones postales de los socios 
- **peliculas**: Catálogo de películas
- **copias**: Inventario de copias físicas
- **prestamos**: Registro de alquileres


## Consulta Principal

El script incluye la consulta solicitada que muestra las películas disponibles para alquilar y el número de copias disponibles de cada una.

## Datos de Prueba

El script incluye un conjunto de datos de prueba proporcionados para validar el correcto funcionamiento del sistema.

## Notas

- El script crea automáticamente el esquema 'videoclub'
- Se han definido todas las claves primarias y foráneas necesarias
- Se incluyen índices para optimizar las consultas más frecuentes