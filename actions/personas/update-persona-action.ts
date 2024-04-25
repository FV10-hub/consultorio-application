"use server"

import { prisma } from "@/src/lib/prisma"
import { PersonaSchema } from "@/src/schema/schema"
import { revalidatePath } from "next/cache"


export async function updatePersona(data: unknown, id: number) {
    const result = PersonaSchema.safeParse(data)
    
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.persona.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/personas')
}