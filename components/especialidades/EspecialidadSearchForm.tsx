"use client";
import { SearchSchema } from "@/src/schema/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EspecialidadSearchForm() {
  const router = useRouter();
  const handleSearchForm = (formdata: FormData) => {
    const data = {
      search: formdata.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    router.push(`/especialidades/search?search=${result.data.search}`);
  };
  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar Especialidad"
        autoComplete="off"
        className="p-2 placeholder-gray-400 w-full text-xs"
        name="search"
      />

      <input
        type="submit"
        className="bg-cyan-500 text-white text-xs p-2 cursor-pointer"
        value={"Buscar"}
      />
    </form>
  );
}
