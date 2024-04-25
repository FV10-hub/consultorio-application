import { Especialidades, Persona } from "@prisma/client";
import Link from "next/link";

type EspecialidadProps = {
  especialidad: Especialidades;
};

export default function EspecialidadDetalle({ especialidad }: EspecialidadProps) {
  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{especialidad.codigo}</td>
        <td className="p-3 text-lg text-gray-800">{especialidad.descripcion}</td>
        <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        href={`especialidades/${especialidad.id}/editar`}
                        className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</Link>
                </div>
            </td>
      </tr>
    </>
  );
}
