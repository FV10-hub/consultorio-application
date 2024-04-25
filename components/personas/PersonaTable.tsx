import React from 'react'
import PersonaDetalle from './PersonaDetalle'
import PersonaPagination from './PersonaPagination'
import { Persona } from '@prisma/client'

type PersonasTableProps = {
    personas: Persona[]
}

export default function PersonaTable({ personas }: PersonasTableProps) {
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Telefono
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nombre Completo
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Correo
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
                  {personas.map((persona) => (
                    <PersonaDetalle key={persona.id} persona={persona} />
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
  )
}
