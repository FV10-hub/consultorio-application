"use client";
import { useForm } from "@/src/hooks/useForm";
import { Consulta } from "@prisma/client";
import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  setConsultaForm: (consulta: Consulta) => void;
}

export const ConsultaModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  setConsultaForm,
}) => {
  function obtenerHoraActual() {
    const fecha = new Date();
    const hora = fecha.getHours().toString().padStart(2, "0");
    const minuto = fecha.getMinutes().toString().padStart(2, "0");
    return `${hora}:${minuto}`;
  }
  const { formState, onIputChange, onResetForm } = useForm({
    hora_consulta: obtenerHoraActual(),
    observacion: "",
    motivo_consulta: "",
    indicacion: "",
    receta: "",
    asistio: true,
    fichaId: 0,
  });

  const {
    hora_consulta,
    motivo_consulta,
    observacion,
    indicacion,
    receta,
    asistio,
    fichaId,
  } = formState;

  function onPacienteSelect(e: any) {
    e.preventDefault();
    const now = new Date();
    const nuevaConsulta: Consulta = {
      id: 0,
      createdAt: now,
      updatedAt: now,
      motivo_consulta,
      hora_consulta,
      observacion,
      indicacion,
      receta,
      asistio,
      fichaId,
    };
    setConsultaForm(nuevaConsulta);
    onResetForm();
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <dialog id="paciente_modal" open={modalOpen} className="modal">
        <div className="bg-gray-400 p-5 w-auto rounded-md mt-2 mb-2">
          <div className="flex flex-row items-center justify-evenly">
            <h1 className="font-bold">Consulta del Paciente</h1>
            <div className="flex flex-row items-center justify-evenly">
              <IoTimeOutline size={50}/>
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
                    Motiva de Consulta
                  </label>
                  <input
                    type="text"
                    name="motivo_consulta"
                    id="motivo_consulta"
                    value={motivo_consulta}
                    onChange={onIputChange}
                    className="w-96 p-3 border-gray-300 rounded-md"
                    placeholder="Motivo de consulta"
                  />
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
                    autoFocus
                    rows={3}
                    value={observacion}
                    onChange={onIputChange}
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
                    value={indicacion}
                    onChange={onIputChange}
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
                    value={receta}
                    onChange={onIputChange}
                    className="w-96 p-3 border-gray-300 rounded-md"
                    placeholder="Detalles de la receta..."
                  ></textarea>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-evenly mt-4">
              <button
                onClick={() => {
                  onResetForm();
                  setModalOpen(!modalOpen);
                }}
                className="btn"
              >
                Cancelar
              </button>
              <button
                onClick={onPacienteSelect}
                type="submit"
                className="btn bg-green-500 hover:bg-green-600 text-white"
              >
                Guardar Consulta
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
