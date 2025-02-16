# Imagen oficial de Node.js como base
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para la instalación de dependencias
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Instalar TypeScript y nodemon globalmente (si no está en las dependencias del proyecto)
RUN npm install -g typescript nodemon

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Exponer el puerto que usará tu aplicación
EXPOSE 3010

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
