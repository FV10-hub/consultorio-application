import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
        <Heading>Ficha No Encontrada</Heading>
        <Link
            href='/fichas/nuevo'
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
        >Crear una Ficha Manualmente</Link>
    </div>
  )
}
