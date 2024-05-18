-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_fichaId_fkey";

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;
