"use server";

import { prisma } from "@/src/lib/prisma";
import { Ficha } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteFicha(
    idFicha: number
  ): Promise<boolean> {
    try {
      await prisma.ficha.delete({
        where: { id: idFicha },
      });
  
      revalidatePath("/personas");
      return true;
    } catch (error) {
      console.error("Error al eliminar la ficha:", error);
      return false;
    }
  }