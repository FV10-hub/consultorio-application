-- DropForeignKey
ALTER TABLE "Galeria" DROP CONSTRAINT "Galeria_personaId_fkey";

-- AddForeignKey
ALTER TABLE "Galeria" ADD CONSTRAINT "Galeria_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;
