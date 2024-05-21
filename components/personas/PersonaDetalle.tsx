import { formatMilesSeparador, formatPhoneNumber } from "@/src/utils";
import { Persona } from "@prisma/client";
import Link from "next/link";
import { IoImageOutline } from "react-icons/io5";

type PersonaProps = {
  persona: Persona;
};

export default function PersonaDetalle({ persona }: PersonaProps) {
  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{formatMilesSeparador(persona.documento)}</td>
        <td className="p-3 text-lg text-gray-800">{formatPhoneNumber(persona.telefono)}</td>
        <td className="p-3 text-lg text-gray-800">{persona.nombre_completo}</td>
        <td className="p-3 text-lg text-gray-800">{persona.email}</td>
        <td className="p-3  text-sm text-gray-800 flex flex-row items-center justify-evenly">
          <Link
            href={`personas/${persona.id}/editar`}
            className="bg-cyan-500 hover:bg-cyan-600 mr-2 text-white rounded-lg p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </Link>

          <Link
            href={`/fichas/${persona.id}/editar`}
            className="bg-green-500 hover:bg-green-600 mr-2 text-white rounded-lg p-2 uppercase font-bold text-xs text-center"
          >
            Ficha
          </Link>

          <Link
            href={`personas/${persona.id}/galeria`}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-2 uppercase font-bold text-xs text-center"
          >
            <div className="flex flex-row items-center">
              Galeria 
              <IoImageOutline className="ml-2" />
            </div>
          </Link>
        </td>
      </tr>
    </>
  );
}
