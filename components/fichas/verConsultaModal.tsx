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
      {verOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg p-3 shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Ver Consulta</h3>
                  <div className="flex flex-row items-center justify-end">
                    <IoTimeOutline size={50} />
                    <span className="p-3 w-20 bg-gray-300 rounded-lg shadow-xl">
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
                      className="btn bg-gray-400 rounded-lg shadow-xl"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
