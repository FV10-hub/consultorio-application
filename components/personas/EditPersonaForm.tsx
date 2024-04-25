"use client";
import { createPersona } from "@/actions/personas/create-persona-action";
import { PersonaSchema } from "@/src/schema/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import { useParams } from "next/navigation";
import { updatePersona } from "@/actions/personas/update-persona-action";
import { useState } from "react";
import { deletePersona } from "@/actions/personas/delete-persona-action";

export default function EditPersonaForm({
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
      const stringWithCommas = formData.get("documento")?.toString() || "";
      const data = {
        nombre_completo: formData.get("nombre_completo"),
        documento: stringWithCommas.replace(/,/g, ''),
        telefono: formData.get("telefono"),
        email: formData.get("email"),
        esDoctor: formData.get("esDoctor") !== null ? true : false,
        esPaciente: formData.get("esPaciente") !== null ? true : false,
        //image: formData.get('image')
      };

      const result = PersonaSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }

      const response = await updatePersona(result.data, id);
      if (response?.errors) {
        response.errors.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }
      mensaje = "Persona Creada correctamente";
    } else {
      const response = await deletePersona(id);
      if (response === null) {
        toast.error("No se pudo eliminar el registro");
        return;
      }
      mensaje = "Persona eliminada correctamente";
    }
    toast.success(mensaje);
    router.push("/personas");
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
