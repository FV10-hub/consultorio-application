-- DropIndex
DROP INDEX "Persona_email_key";

-- AlterTable
ALTER TABLE "Persona" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "esPaciente" SET DEFAULT true;
