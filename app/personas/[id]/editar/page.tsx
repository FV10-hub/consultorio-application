import EditPersonaForm from "@/components/personas/EditPersonaForm"
import PersonaForm from "@/components/personas/PersonaForms"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"


async function getPersonaById(id: number) {
  const persona = await prisma.persona.findUnique({
      where: {
          id
      }
  })
  if(!persona) {
      notFound()
  }

  return persona
}

export default async function EditarPersona({ params }: { params: { id: string } }) {
  const persona = await getPersonaById(+params.id)
  return (
    <>
            <Heading>Editar Persona: {persona.nombre_completo}</Heading>

            <GoBackButton />

            <EditPersonaForm>
                <PersonaForm 
                    persona={persona}
                />
            </EditPersonaForm>
        </>
  )
}
