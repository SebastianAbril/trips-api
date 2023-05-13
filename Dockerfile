# Imagen de Node.js
FROM node:16-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json a la imagen
COPY package*.json ./

# Instalar las dependencias
RUN npm install

COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY src ./

# Compilar la aplicación
RUN npm run build

# Define las variables de entorno
ENV DATABASE_HOST ''
ENV DATABASE_PORT ''
ENV DATABASE_USERNAME ''
ENV DATABASE_PASSWORD ''
ENV DATABASE_NAME ''
ENV PAYMENT_BASE_URL ''
ENV PAYMENT_PUBLIC_KEY
ENV PAYMENT_PRIVATE_KEY

# Puerto expuesto
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "start:prod"]