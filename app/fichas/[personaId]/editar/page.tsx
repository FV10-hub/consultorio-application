import FichaEditarForm from "@/components/fichas/FichaEditarForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getFichaById(personaId: number) {
  const ficha = await prisma.ficha.findUnique({
    where: {
      personaId,
    },
    include:{
        persona: true,
        consultas: true

    },
  });
  if (!ficha) {
    notFound();
  }

  return ficha;
}

export type FichaWithPersonaAndConsultas = Awaited<ReturnType<typeof getFichaById>>

export default async function EditarFichaPage({
    params,
  }: {
    params: { personaId: string };
  }) {
    console.log(params.personaId)
    const ficha = await getFichaById(parseInt(params.personaId));
  return (
    <>
      <Heading>Editar Ficha</Heading>
      <GoBackButton />
      <FichaEditarForm ficha={ficha} />
    </>
  );
}
