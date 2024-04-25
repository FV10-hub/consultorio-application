import PersonaSearchForm from "@/components/personas/PersonaSearchForm";
import PersonaTable from "@/components/personas/PersonaTable";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
  const personas = await prisma.persona.findMany({
    where: {
      OR: [
        {
          nombre_completo: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          documento: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return personas;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const personasList = await searchProducts(searchParams.search);
  return (
    <>
      <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
      <GoBackButton />
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <PersonaSearchForm />
      </div>

      {personasList.length ? (
        <PersonaTable personas={personasList} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
