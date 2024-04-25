"use client";
import { Consulta } from "@prisma/client";
import { useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

interface ModalProps {
  verOpen: boolean;
  setVerOpen: (open: boolean) => boolean | void;
  consulta: Consulta;
}

export const VerModal: React.FC<ModalProps> = ({
  consulta,
  verOpen,
  setVerOpen,
}) => {
  const [formState, setFormState] = useState(consulta);
  useEffect(() => {
    setFormState(consulta);
  }, [consulta]);

  const { observacion, hora_consulta, indicacion, receta, motivo_consulta } =
    formState;
  return (
    <>
      <dialog id="paciente_modal" open={verOpen} className="modal">
        <div className="bg-gray-400 p-5 w-auto rounded-md mt-2 mb-2">
          <div className="flex flex-row items-center justify-evenly">
            <h1 className="font-bold">Consulta del Paciente</h1>
            <div className="flex flex-row items-center justify-evenly">
              <IoTimeOutline size={50} />
              <span className="mt-2 p-3 w-20 bg-gray-300 rounded-lg shadow-xl">
                {hora_consulta || "00:00"}{" "}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <form id="consultaForm" className="space-y-6 p-8">
              <div className="flex flex-col">
                <div className="flex flex-row items-center mt-4">
                  <label
                    htmlFor="motivo_consulta"
                    className="text-gray-700 w-52 text-sm font-bold mb-2"
                  >
                    Motivo de Consulta
                  </label>
                  <input
                    type="text"
                    name="motivo_consulta"
                    id="motivo_consulta"
                    value={motivo_consulta || "no hay"}
                    readOnly={true}
                    className="w-96 p-3 border-gray-300 rounded-md"
                    placeholder="Escribe tus observaciones..."
                  ></input>
                </div>
                <div className="flex flex-row items-center mt-4">
                  <label
                    htmlFor="observacion"
                    className="text-gray-700 w-52 text-sm font-bold mb-2"
                  >
                    Observación
                  </label>
                  <textarea
                    name="observacion"
                    id="observacion"
                    rows={3}
                    value={observacion || "no hay"}
                    readOnly={true}
                    className="w-96 p-3 border-gray-300 rounded-md"
                    placeholder="Escribe tus observaciones..."
                  ></textarea>
                </div>
                <div className="flex flex-row items-center mt-4">
                  <label
                    htmlFor="indicacion"
                    className="text-gray-700 w-52 text-sm font-bold mb-2"
                  >
                    Indicaciones
                  </label>
                  <textarea
                    name="indicacion"
                    id="indicacion"
                    rows={3}
                    value={indicacion || "no hay"}
                    readOnly={true}
                    className="w-96 p-3 border-gray-300 rounded-md"
                    placeholder="Descripción de indicaciones..."
                  ></textarea>
                </div>
                <div className="flex flex-row items-center mt-4">
                  <label
                    htmlFor="receta"
                    className="text-gray-700 w-52 text-sm font-bold mb-2"
                  >
                    Receta
                  </label>
                  <textarea
                    name="receta"
                    id="receta"
                    rows={3}
                    value={receta || "no hay"}
                    readOnly={true}
                    className="w-96 p-3 border-gray-300 rounded-md"
                    placeholder="Detalles de la receta..."
                  ></textarea>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-evenly mt-4">
              <button
                onClick={() => {
                  setFormState({
                    id: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    hora_consulta: "",
                    observacion: "",
                    motivo_consulta: "",
                    indicacion: "",
                    receta: "",
                    asistio: false,
                    fichaId: 0,
                  });
                  setVerOpen(!verOpen);
                }}
                className="btn"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
