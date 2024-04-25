-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nombre_completo" TEXT,
    "documento" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "esDoctor" BOOLEAN NOT NULL DEFAULT false,
    "esUsuario" BOOLEAN NOT NULL DEFAULT false,
    "esPaciente" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidades" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT,
    "codigo" TEXT,

    CONSTRAINT "Especialidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personaId" INTEGER NOT NULL,
    "tipo_seguro" TEXT,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hora_consulta" TEXT,
    "observacion" TEXT,
    "motivo_consulta" TEXT,
    "indicacion" TEXT,
    "receta" TEXT,
    "asistio" BOOLEAN NOT NULL DEFAULT false,
    "fichaId" INTEGER NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galeria" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personaId" INTEGER NOT NULL,
    "url" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "Galeria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_documento_key" ON "Persona"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_personaId_key" ON "Ficha"("personaId");

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Ficha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Galeria" ADD CONSTRAINT "Galeria_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
