import FichaEditarForm from "@/components/fichas/FichaEditarForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getFichaById(id: number) {
  const ficha = await prisma.ficha.findUnique({
    where: {
      id,
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
    params: { id: string };
  }) {
    const ficha = await getFichaById(+params.id);
  return (
    <>
      <Heading>Editar Ficha</Heading>
      <GoBackButton />
      <FichaEditarForm ficha={ficha} />
    </>
  );
}
