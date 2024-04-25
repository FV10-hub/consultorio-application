import { personas } from "./data/personas";
import { especialidades } from "./data/especialidad";
import { fichas } from "./data/ficha";
import { PrismaClient } from "@prisma/client";
import { consultas } from "./data/consultas";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.persona.createMany({
      data: personas,
    });
    await prisma.especialidades.createMany({
      data: especialidades,
    });
    await prisma.ficha.createMany({
      data: fichas,
    });
    await prisma.consulta.createMany({
      data: consultas,
    });
  } catch (error) {
    console.log(error);
  }
}

main()
.then(async()=>{
    await prisma.$disconnect();
})
.catch(async (e)=>{
    console.log(e);
    await prisma.$disconnect();
    process.exit();
})
