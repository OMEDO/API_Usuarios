# Proyecto Prueba Técnica Node.js

Este proyecto es una prueba técnica utilizando **Node.js**.

## Requisitos

Antes de iniciar el proyecto, asegúrate de tener los siguientes requisitos instalados:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/) 
- [Git](https://git-scm.com/) 

## Clonar el Repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/OMEDO/API_Usuarios.git
cd API_Usuarios
```

Instalar dependencias*
```bash
npm install
```

## Generar Imagen de la BD
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Pru3b@T3cn1c@N0d3"-p 1433:1433 --name mi_sqlserver -v sqlserver_data:/var/opt/mssql -d mcr.microsoft.com/mssql/server:latest
```

Crear Base de datos principal en un Gestor
```bash
CREATE DATABASE Usuarios;
```

**Las tablas se general al iniciar rl proyecto


## Iniciar proyecto de forma local
```bash
npm run dev
```


## Generar imagen en Docker del proyecto

Genera imagen
```bash
docker build -t pruebatecnicanodejs . 
```

Inicia imagen
```bash
docker run -p 3010:3010 pruebatecnicanodejs  
```

**En ambos casos esta configurado para iniciar en el puerto 3010


## Documentación:
http://localhost:3010/api-docs/


## Pruebas unitarias:
npx jest


