"use client";
import { createGaleria } from "@/actions/personas/galeria/create-galeria-action";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-toastify";

export default function ImageUpload({ id }: { id: string }) {
  const [file, setFile] = useState<File | undefined>();
  const [descripcion, setDescripcion] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("images", file);
      data.set("idPersona", id);
      data.set("descripcion", descripcion!);

      /*const res = await fetch("/personas/api/upload", {
        method: "POST",
        body: data,
      });*/

      const inserted = createGaleria(data);
      if (!inserted) {
        toast.error("No se guardo la imagen");
        return;
      }
      setFile(undefined);
      setDescripcion("");

      toast.success("Imagen subida correctamente");
      router.push("/personas");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  const openFileInput = () => {
    if (inputRef.current !== null && inputRef.current !== undefined) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className="space-y-2 mt-5">
        <form className="w-1/2 " onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-3">
              <label
                htmlFor="descripcion"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripcion
              </label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                autoComplete="off"
                className="block w-full p-3 bg-slate-100"
                placeholder="Escribe una descripcion(min. 5 letras)"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="flex flex-row mt-5 justify-evenly items-center">
              <div
                onClick={openFileInput}
                className="relative cursor-pointer hover:opacity-70 transition p-10  border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*" // Restrict file types (optional)
                  className="absolute inset-0 opacity-0 pointer-events-none z-10 bg-zinc-900 text-zinc-100 p-2 rounded block"
                  onChange={handleFileChange}
                />
                <TbPhotoPlus size={50} />
                <p className="text-lg font-semibold">
                  {file?.name !== undefined
                    ? "Cambiar Imagen"
                    : "Seleccionar Imagen"}
                </p>
              </div>
              <div>
                {file ? (
                  <div className="w-64 h-64 object-contain mx-auto">
                    <Image
                      width={256}
                      height={256}
                      style={{ objectFit: "contain" }}
                      src={URL.createObjectURL(file)}
                      alt="Imagen de Paciente"
                    />
                  </div>
                ) : (
                  <p>No a seleccionado ninguna imagen</p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className={`${
                  file && descripcion.length > 3
                    ? "bg-orange-500 hover:bg-orange-600 text-white rounded-md w-1/5 mt-5 p-3 uppercase font-bold cursor-pointer"
                    : "bg-gray-300 text-gray-600 rounded-md w-1/5 mt-5 p-3 uppercase font-bold opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-row justify-evenly items-center">
                  Subir <IoCloudUpload />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
