"use client";
import { deletePersona } from "@/actions/personas/delete-persona-action";
import { deleteEspecialidad } from "@/actions/especialidades/delete-especialidad-action";
import { updateEspecialidad } from "@/actions/especialidades/update-especialidad-action";
import { EspecialidadSchema } from "@/src/schema/schema";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditEspecialidadForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;
  // Estado para controlar la acción (guardar o eliminar)
  const [action, setAction] = useState<"guardar" | "eliminar">("guardar");
  const handleSubmit = async (formData: FormData) => {
    var mensaje: string = "";
    if (action === "guardar") {
      const data = {
        codigo: formData.get("codigo"),
        descripcion: formData.get("descripcion"),
      };

      const result = EspecialidadSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }

      const response = await updateEspecialidad(result.data, id);
      if (response?.errors) {
        response.errors.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }
      mensaje = "Especialidad Creada correctamente";
    } else {
      const response = await deleteEspecialidad(id);
      if (response === null) {
        toast.error("No se pudo eliminar el registro");
        return;
      }
      mensaje = "Especialidad eliminada correctamente";
    }
    toast.success(mensaje);
    router.push("/especialidades");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}
        <div className="flex flex-row justify-center">
          <input
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white w-full rounded-md m-5 p-3 uppercase font-bold cursor-pointer"
            value="Guardar Cambios"
            onClick={() => setAction("guardar")}
          />
          <input
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white w-full rounded-md m-5 p-3 uppercase font-bold cursor-pointer"
            value="Eliminar"
            onClick={() => setAction("eliminar")}
          />
        </div>
      </form>
    </div>
  );
}
