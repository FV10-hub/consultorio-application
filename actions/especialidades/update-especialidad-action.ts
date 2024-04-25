"use server"

import { prisma } from "@/src/lib/prisma";
import { EspecialidadSchema } from "@/src/schema/schema";
import { revalidatePath } from "next/cache";


export async function updateEspecialidad(data: unknown, id: number) {
    const result = EspecialidadSchema.safeParse(data)
    
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.especialidades.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/especialidades')
}