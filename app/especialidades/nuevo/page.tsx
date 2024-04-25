import AddEspecialidadForm from '@/components/especialidades/AddEspecialidadForm'
import EspecialidadForm from '@/components/especialidades/EspecialidadForms'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'

export default function CrearEspecialidadPage() {
  return (
    <>
      <Heading>Nueva Especialidad</Heading>
      <GoBackButton />
      <AddEspecialidadForm>
        <EspecialidadForm/>
      </AddEspecialidadForm>
    
    </>
  )
}
