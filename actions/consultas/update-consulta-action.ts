"use server"

import { prisma } from "@/src/lib/prisma"
import { Consulta } from "@prisma/client"
import { revalidatePath } from "next/cache"


export async function updateConsultaById(data: Consulta, id: number) {
    let consultaToUpdate : Consulta = {
        id: data.id,
        hora_consulta: data.hora_consulta,
        motivo_consulta: data.motivo_consulta || "MOTIVO NULO",
        observacion: data.observacion,
        indicacion: data.indicacion,
        receta: data.receta,
        asistio: data.asistio,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        fichaId: data.fichaId
    }
    await prisma.consulta.update({
        where: {
            id
        },
        data: consultaToUpdate
    })
    revalidatePath("/personas");
}