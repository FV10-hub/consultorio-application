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
      <div className="grid grid-cols-1 mt-5 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {galerias.map((galeria) => (
          <ImagenesCard key={galeria.id} galeria={galeria} />
        ))}
      </div>
    </>
  );
}
