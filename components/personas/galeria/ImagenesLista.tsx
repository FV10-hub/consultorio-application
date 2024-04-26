import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import ImagenesCard from "./ImagenesCard";

async function getImegenesPorPersona(id: string) {
  const imagenes = await prisma.galeria.findMany({
    where: {
      personaId: +id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (!imagenes) {
    notFound();
  }
  return imagenes;
}

export default async function ImagenesLista({ id }: { id: string }) {
  const galerias = await getImegenesPorPersona(id);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
        {galerias.map((galeria) => (
          <ImagenesCard key={galeria.id} galeria={galeria} />
        ))}
      </div>
    </>
  );
}
