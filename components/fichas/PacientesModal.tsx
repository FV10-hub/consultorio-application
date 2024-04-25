"use client";
import { Persona } from "@prisma/client";
import PersonaPagination from "../personas/PersonaPagination";
import PersonaTable from "../personas/PersonaTable";
import { useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

interface ModalProps {
  personas: Persona[];
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  setPacienteForm: (paciente: Persona) => void;
}

export const PacientesModal: React.FC<ModalProps> = ({
  personas,
  modalOpen,
  setModalOpen,
  setPacienteForm,
}) => {
  function onPacienteSelect(paciente: Persona) {
    setPacienteForm(paciente);
    setModalOpen(!modalOpen);
  }

  const onChangePaciente = (event: any) => {
    const value = event.target.value;
    setSearchTerm(value);
    debounced(searchTerm);
  };

  const debounced = useDebouncedCallback((value) => {
    const filtered = personas
      .filter((paciente) =>
        paciente.nombre_completo?.toLocaleLowerCase().includes(value)
      )
      .slice(0, 5);
    setFilteredItems(filtered);
  }, 300);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(personas.slice(0, 5));
  return (
    <>
      <dialog id="paciente_modal" open={modalOpen} className="h-2/4 modal">
        <div className="bg-gray-400 p-5 w-auto rounded-md mt-2 mb-2">
          <div className="flex justify-between">
            <input
              type="text"
              name="search"
              id="search"
              autoComplete="off"
              className="w-96 p-3 rounded-md"
              placeholder="Buscar paciente"
              value={searchTerm}
              onChange={onChangePaciente}
            />
            <button onClick={() => setModalOpen(!modalOpen)} className="btn">
              Cerrar
            </button>
          </div>
          <div className="">
            <table className="divide-y divide-gray-300 ">
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
              <tbody className="divide-y h-300px divide-gray-200">
                {filteredItems.map((persona) => (
                  <tr className="border-b " key={persona.id}>
                    <td className="p-3 text-lg text-gray-800">
                      {persona.documento}
                    </td>
                    <td className="p-3 text-lg text-gray-800">
                      {persona.nombre_completo}
                    </td>
                    <td className="p-3 text-lg text-gray-800">
                      {persona.email}
                    </td>
                    <td className="p-3 text-lg text-gray-800 ">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => {
                            onPacienteSelect(persona);
                          }}
                          className="bg-white hover:bg-gray-600 text-gray-400 rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        >
                          Seleccionar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  );
};
