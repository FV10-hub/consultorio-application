"use server";

import { prisma } from "@/src/lib/prisma";
import { PersonaSchema } from "@/src/schema/schema";
import { Persona } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPersona(data: unknown) {
  
  try {
    let personaSaved = await prisma.persona.create({
      data: data as Persona
    });
    await prisma.ficha.create({
      data: {
        tipo_seguro: "NUEVO",
        personaId: personaSaved.id,
        consultas: {
          create: [],
        },
      },
    });
    revalidatePath("/personas");
  } catch (error) {
    console.log(error)
    return {
      errors: ["No se pudo guardar verifica los datos"],
    };
  }
 
}
