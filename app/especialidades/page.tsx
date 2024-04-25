import EspecialidadPagination from "@/components/especialidades/EspecialidadPagination";
import EspecialidadSearchForm from "@/components/especialidades/EspecialidadSearchForm";
import EspecialidadTable from "@/components/especialidades/EspecialidadTable";
import PersonaPagination from "@/components/personas/PersonaPagination";
import PersonaSearchForm from "@/components/personas/PersonaSearchForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getEspecialidades(page: number, pageSize: number) {
  const skipPage = (page - 1) * pageSize;
  return await prisma.especialidades.findMany({
    take: pageSize,
    skip: skipPage,
  });
}

async function getCountEspecialidad() {
  return await prisma.especialidades.count();
}

export default async function EspecialidadPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 5;
  if (page < 0) redirect("/especialidades");
  const especialidadesData = getEspecialidades(page, pageSize);
  const totalEspecialidadData = getCountEspecialidad();
  const [especialidades, totalEspecialidad] = await Promise.all([
    especialidadesData,
    totalEspecialidadData,
  ]);
  const totalPages = Math.ceil(totalEspecialidad / pageSize);

  if (page > totalPages) redirect("/especialidades");

  return (
    <>
      <Heading>Administrar Especialidades</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/especialidades/nuevo"}
          className="bg-cyan-500 text-white w-full rounded-lg lg:w-auto text-xs px-10 py-3 text-center font-bold cursor-pointer "
        >
          Crear Especialidad
        </Link>
        <EspecialidadSearchForm />
      </div>
      <EspecialidadTable especialidades={especialidades}/>
      <EspecialidadPagination page={page} totalPages={totalPages} />
    </>
  );
}
