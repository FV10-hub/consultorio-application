import React from "react";
import { Ficha } from "@prisma/client";
import { FichasWithPersonas } from "@/app/fichas/page";
import FichaDetalle from "./FichaDetalle";

type FichaTableProps = {
  fichas: FichasWithPersonas;
};

export default function FichaTable({ fichas }: FichaTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Documento
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Paciente
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span>Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fichas.map((ficha) => (
                  <FichaDetalle
                    key={ficha.id}
                    ficha={ficha}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
