import { createGaleria } from "@/actions/personas/galeria/create-galeria-action";
import { promises as fsPromises, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const idPersona: string = data.get("idPersona") as string;
  const descripcion: string = data.get("descripcion") as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(
    //TODO: no hace falta public por uqe por defecto parte desde ahi "public",
    "public",
    "images",
    "personas",
    idPersona,
    new Date().getTime().toString().concat("-").concat(file.name)
  );

  // Crear los directorios necesarios si no existen
  //TODO: comente esto por uqe no necesito guardar el path absoluto process.cwd(),
  try {
    await mkdirSync(join("public", "images", "personas", idPersona), {
      recursive: true,
    });
  } catch (error) {
    console.error("Error al crear los directorios:", error);
    return NextResponse.json({
      success: false,
      error: "Error al crear los directorios",
    });
  }

  // Escribir el archivo en el directorio
  try {
    await writeFile(filePath, buffer);
  } catch (error) {
    console.error("Error al escribir el archivo:", error);
    return NextResponse.json({
      success: false,
      error: "Error al escribir el archivo",
    });
  }

  const galeriaAInsertar = {
    personaId: +idPersona,
    descripcion,
    url: filePath.replace(/\\/g, "/"),
  };

  //const inserted = createGaleria(galeriaAInsertar);
  return NextResponse.json({ success: true });
}
