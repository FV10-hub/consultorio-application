# Usa una imagen base con Node.js
FROM node:20-alpine3.16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY src/ ./src
COPY public/ ./public


# Copia el resto del código fuente al directorio de trabajo
COPY . .

# Instala las dependencias
RUN npm install

# Install Prisma CLI
RUN npm install prisma

RUN npm install @prisma/client

RUN npm install npm@latest

RUN npx prisma generate --schema=prisma/schema.prisma

# Execute migrations
RUN npx prisma migrate dev --name init

#RUN npm install @prisma/client

# Insert seed data
RUN npx prisma db seed


# Exponer el puerto en el que Next.js se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
