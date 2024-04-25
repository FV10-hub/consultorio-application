import FichaPagination from "@/components/fichas/FichaPagination";
import FichaSearchForm from "@/components/fichas/FichaSearchForm";
import FichaTable from "@/components/fichas/FichaTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getFichas(page: number, pageSize: number) {
  const skipPage = (page - 1) * pageSize;
  return await prisma.ficha.findMany({
    take: pageSize,
    skip: skipPage,
    include: {
      persona: true
    }
  });
}
//TODO: esto es para poder darle un tipo especifico para el autocompletado de typescript con el retorno de esta funcion
export type FichasWithPersonas = Awaited<ReturnType<typeof getFichas>>

async function getCountFichas() {
  return await prisma.ficha.count();
}

export default async function FichaPage({searchParams,}: {searchParams: { page: string, actualizar: string };
}) {
  const page = +searchParams.page || 1;
  const actualizar=searchParams.actualizar||null;
  const pageSize = 5;
  //TODO: comente por que en la parte de server action puse el revalidate(/url)
  //if(actualizar !== null ) redirect("/fichas");
  if (page < 0) redirect("/fichas");
  const fichasData = getFichas(page, pageSize);
  const totalFichasData = getCountFichas();
  const [fichas, totalFichas] = await Promise.all([
    fichasData,
    totalFichasData,
  ]);
  const totalPages = Math.ceil(totalFichas / pageSize);

  if (page > totalPages) redirect("/fichas");

  return (
    <>
      <Heading>Administrar Fichas</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/fichas/nuevo"}
          className="bg-cyan-500 text-white w-full rounded-lg lg:w-auto text-xs px-10 py-3 text-center font-bold cursor-pointer "
        >
          Crear Ficha
        </Link>
        <FichaSearchForm/>
      </div>
      <FichaTable fichas={fichas}/>
      <FichaPagination page={page} totalPages={totalPages}/>
    </>
  );
}
