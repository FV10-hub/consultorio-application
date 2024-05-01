import FichaForms from '@/components/fichas/FichaForms';
import GoBackButton from '@/components/ui/GoBackButton';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getPacientes() {
  return await prisma.persona.findMany({
    where:{
      esPaciente: true,
      ficha: null,
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
  const pacientes = await getPacientes();
  const totalPacientes = pacientes.length;
  return (
    <>
      <Heading>Nueva Ficha</Heading>
      <GoBackButton />
      <FichaForms pacientes={pacientes}  totalPacientes={totalPacientes}/>
    
    </>
  )
}
