"use server"

import { prisma } from "@/src/lib/prisma"
import { PersonaSchema } from "@/src/schema/schema"
import { revalidatePath } from "next/cache"


export async function deletePersona(id: number) {
    
    if(id <= 0) {
        return {
            errors: 'El id no es valido'
        }
    }

    await prisma.persona.delete({
        where: {
            id
        },
    })
    revalidatePath('/personas')
}