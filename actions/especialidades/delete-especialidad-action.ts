"use server"

import { prisma } from "@/src/lib/prisma"
import { PersonaSchema } from "@/src/schema/schema"
import { revalidatePath } from "next/cache"


export async function deleteEspecialidad(id: number) {
    
    if(id <= 0) {
        return {
            errors: 'El id no es valido'
        }
    }

    await prisma.especialidades.delete({
        where: {
            id
        },
    })
    revalidatePath('/especialidades')
}