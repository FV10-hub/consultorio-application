"use client"
import { createPersona } from "@/actions/personas/create-persona-action";
import { PersonaSchema } from "@/src/schema/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";

export default function AddPersona({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const data = {
      nombre_completo: formData.get("nombre_completo"),
      documento: formData.get("documento"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
      esDoctor: formData.get("esDoctor") !== null  ? true : false,
      esPaciente: formData.get("esPaciente") !== null  ? true : false,
      //image: formData.get('image')
    };
    
    const result = PersonaSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createPersona(result.data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue);
      });
      return;
    }

    toast.success("Persona Creada correctamente");
    router.push("/personas");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}
        <input
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Registrar Persona"
        />
      </form>
    </div>
  );
}
