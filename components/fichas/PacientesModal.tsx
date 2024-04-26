"use client";
import { Persona } from "@prisma/client";
import { useState } from "react";
import {
  IoSearchOutline
} from "react-icons/io5";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState(personas);

  const onChangePaciente = (event: any) => {
    const nuevoFiltro = event.target.value;
    setSearchTerm(nuevoFiltro);
    if (nuevoFiltro === "") {
      setListaFiltrada(personas);
    } else {
      const listaFiltrada = personas!
        .filter((persona) =>
          persona.nombre_completo
            ?.toLocaleLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setListaFiltrada(listaFiltrada);
    }
  };

  return (
    <>
      {modalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative h-2/4 w-auto mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Selecciona un Paciente
                  </h3>
                </div>
                <div className="w-96 m-5 flex flex-row items-center">
                  <IoSearchOutline size={20} />
                  <input
                    type="text"
                    name="search"
                    id="search"
                    autoComplete="off"
                    className="p-3 rounded-md"
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={onChangePaciente}
                  />
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                      {listaFiltrada.map((persona) => (
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
                                className="bg-green-600 hover:bg-green-400 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
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
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
