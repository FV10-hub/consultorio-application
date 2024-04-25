import AddFichaForm from '@/components/fichas/AddFichaForm'
import FichaForms from '@/components/fichas/FichaForms'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma';

async function getPacientes(page: number, pageSize: number) {
  const skipPage = (page - 1) * pageSize;
  return await prisma.persona.findMany({
    take: pageSize,
    skip: skipPage,
    where:{
      esPaciente: true
    }
  });
}

async function getCountPacientes() {
  return await prisma.persona.count({
    where:{
      esPaciente: true
    }
  });
}

export default async function CrearFichaaPage() {
  const pacientes = await getPacientes(1,10);
  const totalPacientes = pacientes.length;
  return (
    <>
      <Heading>Nueva Ficha</Heading>
      <GoBackButton />
      <FichaForms pacientes={pacientes}  totalPacientes={totalPacientes}/>
    
    </>
  )
}
