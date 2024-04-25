import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
        <Heading>Ficha No Encontrada</Heading>
        <Link
            href='/especialidades'
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
        >Ir a Especialidades</Link>
    </div>
  )
}
