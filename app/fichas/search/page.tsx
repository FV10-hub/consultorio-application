import FichaSearchForm from "@/components/fichas/FichaSearchForm";
import FichaTable from "@/components/fichas/FichaTable";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
  const fichas = await prisma.ficha.findMany({
    where: {
      OR: [
        {
          persona: {
            nombre_completo: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          persona: {
            documento: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      persona: true,
    },
    orderBy: {
      persona: {
        nombre_completo: "asc",
      },
    },
  });
  return fichas;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const fichasList = await searchProducts(searchParams.search);
  return (
    <>
      <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
      <GoBackButton />
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <FichaSearchForm />
      </div>

      {fichasList.length ? (
        <FichaTable fichas={fichasList} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
