"use client"
import { createEspecialidad } from "@/actions/especialidades/create-especialidad-action";
import { EspecialidadSchema } from "@/src/schema/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddEspecialidadForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
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

    const response = await createEspecialidad(result.data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Especialidad Creada correctamente");
    router.push("/especialidades");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}
        <input
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Registrar Especialidad"
        />
      </form>
    </div>
  );
}
