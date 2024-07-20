"use server"

import { prisma } from "@/src/lib/prisma"
import { Consulta } from "@prisma/client"
import { revalidatePath } from "next/cache"


export async function deleteConsultaById(id: number) {
    await prisma.consulta.delete({
        where: {
            id
        }
    })
    revalidatePath("/personas");
}