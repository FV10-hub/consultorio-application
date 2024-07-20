"use client";
import { useForm } from "@/src/hooks/useForm";
import { useStore } from "@/src/store";
import { Consulta } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  consulta: Consulta;
}

export const ConsultaEditarModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  consulta,
}) => {
  const { formState, onIputChange, onResetForm, setFormState } = useForm(consulta);
  const router = useRouter();
  useEffect(() => {
    setFormState(consulta);
  }, [consulta, setFormState]);
  const {
    id,
    createdAt,
    hora_consulta,
    motivo_consulta,
    observacion,
    indicacion,
    receta,
    asistio,
    fichaId,
  } = formState;
  const updateConsultaById = useStore((state) => state.updateConsultaById);
  const deleteConsultaById = useStore((state) => state.deleteConsultaById);
  function handleGuardarConsulta() {
    let consultaAEditar: Consulta = {
      id,
      createdAt,
      updatedAt: new Date(),
      hora_consulta,
      observacion,
      motivo_consulta,
      indicacion,
      receta,
      asistio,
      fichaId,
  }
    let updated: boolean = updateConsultaById(consultaAEditar);
    if (updated) {
      toast.success("La consulta se edito correctamente");
      setModalOpen(!modalOpen);
      router.push("/personas");
      return;
    }else{
      toast.error("La consulta no se edito, Ocurrio un error");
      
      return;
    }
  }
  function handleDeleteConsulta(){
    let deleted: boolean = deleteConsultaById(id);
    if (deleted) {
      toast.success("La consulta se elimino correctamente");
      setModalOpen(!modalOpen);
      router.push("/personas");
      return;
    }else{
      toast.error("La consulta no se elimino, Ocurrio un error");
      return;
    }
  }
  return (
    <>
      {modalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg p-3 shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Editar Consulta</h3>
                  <div className="flex flex-row items-center justify-end">
                    <IoTimeOutline size={50} />
                    <span className="p-3 w-20 bg-gray-300 rounded-lg shadow-xl">
                      {hora_consulta || "00:00"}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-start">
                  <form id="consultaForm" className=" p-8">
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
                          autoFocus
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
                      className="btn bg-gray-400 rounded-lg shadow-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDeleteConsulta}
                      type="submit"
                      className="btn bg-red-500 hover:bg-red-600 text-white"
                    >
                      Eliminar Consulta
                    </button>
                    <button
                      onClick={handleGuardarConsulta}
                      type="submit"
                      className="btn bg-green-500 hover:bg-green-600 text-white"
                    >
                      Guardar Consulta
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
