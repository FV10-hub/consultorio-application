"use server";

import { prisma } from "@/src/lib/prisma";
import { Ficha } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { consultas } from "../../prisma/data/consultas";

export async function updateFicha(
  data: any,
  idFicha: number
): Promise<boolean> {
  try {
    let fichaUpdate: Ficha = await prisma.ficha.update({
      where: { id: idFicha },
      data: {
        tipo_seguro: data.tipo_seguro,
        consultas: {
          create: data.consultas
            .map((consulta: any) => ({
              hora_consulta: consulta.hora_consulta,
              observacion: consulta.observacion,
              indicacion: consulta.indicacion,
              receta: consulta.receta,
              asistio: consulta.asistio,
            })),
        },
      },
    });

    revalidatePath("/fichas");
    return true;
  } catch (error) {
    console.error("Error al actualizar la ficha:", error);
    return false;
  }
}
