"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export async function createGaleria(formData: FormData) {
  const data = Object.fromEntries(formData);
  if (formData.getAll("images")) {
    // [https://url.jpg, https://url.jpg]
    const images = await uploadImages(formData.getAll("images") as File[]);
    if (!images) {
      throw new Error("No se pudo cargar las imágenes, rollingback");
    }
    const galeriaAInsertar = {
      personaId: +data.idPersona,
      descripcion: data.descripcion.toString(),
      url: images[0],
    };
    try {
      const inserted = await prisma.galeria.create({
        data: { ...galeriaAInsertar },
      });
      revalidatePath(`/personas/${data.personaId}/galeria`);
      return inserted;
    } catch (error) {
      return {
        errors: ["No se pudo guardar verifica los datos"],
      };
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {folder: "consultorio"})
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
