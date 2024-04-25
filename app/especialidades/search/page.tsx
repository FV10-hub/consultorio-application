import EspecialidadSearchForm from "@/components/especialidades/EspecialidadSearchForm"
import EspecialidadTable from "@/components/especialidades/EspecialidadTable"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"


async function searchEspecialidad(searchTerm: string) {
    const especialidades = await prisma.especialidades.findMany({
        where: {
            descripcion: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        }
    })
    return especialidades
}

export default async function EspecialidadSearchPage({ searchParams }: { searchParams: { search: string } }) {
    const especialidadList = await searchEspecialidad(searchParams.search)
  return (
    <>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
            <GoBackButton />
            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <EspecialidadSearchForm />
            </div>

            {especialidadList.length ? (
                <EspecialidadTable
                    especialidades={especialidadList}
                />
            ) : <p className="text-center text-lg">No hay resultados</p>}

        </>
  )
}
