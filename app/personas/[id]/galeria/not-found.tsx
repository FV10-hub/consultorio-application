import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
        <Heading>Galeria de paciente no Encontrada</Heading>
        <Link
            href='/personas'
            className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
        >Ir a Pacientes</Link>
    </div>
  )
}
