import AddPersona from '@/components/personas/AddPersonaForm'
import PersonaForm from '@/components/personas/PersonaForms'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default function CrearPersonaPage() {
  return (
    <>
      <Heading>Nueva Persona</Heading>
      <GoBackButton />
      <AddPersona>
        <PersonaForm/>
      </AddPersona>
    
    </>
  )
}
