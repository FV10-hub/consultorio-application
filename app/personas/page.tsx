import { auth } from "@/auth.config";
import PersonaPagination from "@/components/personas/PersonaPagination";
import PersonaSearchForm from "@/components/personas/PersonaSearchForm";
import PersonaTable from "@/components/personas/PersonaTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getPersonas(page: number, pageSize: number) {
  const skipPage = (page - 1) * pageSize;
  let personas = await prisma.persona.findMany({
    take: pageSize,
    skip: skipPage,
    orderBy: {
      createdAt: "desc",
    },
  });
  return personas.length > 0 ? personas : [];
}

async function getCountPersonas() {
  let count = await prisma.persona.count();
  return count > 0 ? count : 1;
}

export default async function PersonaPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const page = +searchParams.page || 1;
  const pageSize = 10;
  if (page < 0) redirect("/personas");
  const personasData = getPersonas(page, pageSize);
  const totalPersonasData = getCountPersonas();
  const [personas, totalPersonas] = await Promise.all([
    personasData,
    totalPersonasData,
  ]);
  const totalPages = Math.ceil(totalPersonas / pageSize);

  if (page > totalPages) redirect("/personas");

  return (
    <>
      <Heading>Administrar Personas</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/personas/nuevo"}
          className="bg-cyan-500 text-white w-full rounded-lg lg:w-auto text-xs px-10 py-3 text-center font-bold cursor-pointer "
        >
          Crear Persona
        </Link>
        <PersonaSearchForm />
      </div>
      <PersonaTable personas={personas ?? []} />
      <PersonaPagination page={page} totalPages={totalPages} />
    </>
  );
}
