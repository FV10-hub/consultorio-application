import EditEspecialidadForm from "@/components/especialidades/EditEspecialidadForm";
import EspecialidadForm from "@/components/especialidades/EspecialidadForms";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getEspecialidadById(id: number) {
  const especialidad = await prisma.especialidades.findUnique({
    where: {
      id,
    },
  });
  if (!especialidad) {
    notFound();
  }

  return especialidad;
}

export default async function EditarEspecialidad({
  params,
}: {
  params: { id: string };
}) {
  const especialidad = await getEspecialidadById(+params.id);
  return (
    <>
      <Heading>Editar especialidad: {especialidad.descripcion}</Heading>

      <GoBackButton />

      <EditEspecialidadForm>
        <EspecialidadForm especialidad={especialidad} />
      </EditEspecialidadForm>
    </>
  );
}
