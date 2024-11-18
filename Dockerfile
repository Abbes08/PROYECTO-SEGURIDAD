# Usamos una imagen base de Node.js
FROM node:16

# Creamos un usuario no root
RUN useradd -m appuser

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json (si lo tienes)
COPY package*.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos todo el código de la aplicación al contenedor
COPY . .

# Cambiamos el propietario de los archivos al nuevo usuario
RUN chown -R appuser:appuser /app

# Cambiamos al usuario no root
USER appuser

# Exponemos el puerto que usará la aplicación (ajusta esto según tu configuración)
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]