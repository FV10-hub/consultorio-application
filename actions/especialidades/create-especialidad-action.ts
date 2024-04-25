"use server";

import { prisma } from "@/src/lib/prisma";
import { EspecialidadSchema } from "@/src/schema/schema";

export async function createEspecialidad(data: unknown) {
  const result = EspecialidadSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  await prisma.especialidades.create({
    data: result.data,
  });
}
