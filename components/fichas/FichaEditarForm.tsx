"use client";
import { FichaWithPersonaAndConsultas } from "@/app/fichas/[personaId]/editar/page";
import { formatFecha } from "@/src/utils";
import { AiFillSave, AiOutlineTransaction } from "react-icons/ai";
import FichaAddConsulta from "./FichaAddConsulta";
import { updateFicha } from "@/actions/fichas/update-ficha-action";
import { toast } from "react-toastify";
import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";
import FichaEditConsulta from "./FichaEditConsulta";
import { IoTrashOutline } from "react-icons/io5";
import { deleteFicha } from "@/actions/fichas/delete-ficha-action";
import { useEffect, useState } from "react";

type FichaEditarProps = {
  ficha: FichaWithPersonaAndConsultas;
};

export default function FichaEditarForm({ ficha }: FichaEditarProps) {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const fichaAEditar = ficha;
  const limpiarTodo = useStore((state) => state.limpiarTodo);
  const consultasDeFicha = useStore((state) => state.consultasDeFicha);

  useEffect(() => {
    if (ficha.id != null) {
      setTipo(ficha.tipo_seguro!)  
    }
  }, [ficha])
  

  //GUARDAR
  const handleGuardarFicha = async () => {
    const data = {
      id: fichaAEditar.id,
      tipo_seguro: tipo || "NO_TIENE",
      consultas: consultasDeFicha
        .filter((consulta) => consulta.id === 0 || consulta.id === undefined)
        .map((consulta) => ({
          id: consulta.id,
          hora_consulta: consulta.hora_consulta,
          motivo_consulta: consulta.motivo_consulta,
          observacion: consulta.observacion,
          indicacion: consulta.indicacion,
          receta: consulta.receta,
          asistio: consulta.asistio ? true : false,
        })),
    };

    const response = await updateFicha(data, ficha.id);
    if (!response) {
      toast.error("No se Guardo");
      return;
    }
    setTipo("");
    toast.success("Se guardo");
    limpiarTodo();
    router.push("/personas");
  };
  //ELIMINAR
  const handleEliminarFicha = async () => {
    const response = await deleteFicha(fichaAEditar.id);
    if (!response) {
      toast.error("No se Elimino");
      return;
    }

    toast.success("Ficha Eliminada con Exito");
    limpiarTodo();
    router.push("/personas");
  };

  const onIputTipoChange = ({ target }: any) => {
      const { value, name } = target;
      setTipo(value);
  }

  return (
    <>
      <div className="border-b border-gray-900/10 pb-12 ">
        <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
          <button
            onClick={handleEliminarFicha}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar Ficha <IoTrashOutline className="ml-2" size={18} />
          </button>
          <button
            onClick={handleGuardarFicha}
            className="btn bg-green-500 hover:bg-green-600 text-white"
          >
            Guardar Ficha <AiFillSave className="ml-2" size={18} />
          </button>
        </div>
        <div className="flex flex-col justify-start">
          <div className="flex flex-row items-center mt-10">
            <label
              htmlFor="createdAt"
              className=" text-gray-700 w-52 text-sm font-bold mb-2"
            >
              Fecha Creacion de la Ficha
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="createdAt"
                id="createdAt"
                autoComplete="off"
                className="w-52 p-3 bg-white"
                defaultValue={formatFecha(fichaAEditar.createdAt)}
                disabled={true}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-row items-center">
            <label
              htmlFor="paciente_nombre"
              className="text-gray-700 w-52 text-sm font-bold mb-2"
            >
              Paciente
            </label>
            <input
              type="text"
              name="paciente_nombre"
              id="paciente_nombre"
              autoComplete="off"
              className="w-96 p-3 bg-white"
              placeholder="Buscar paciente"
              disabled={true}
              defaultValue={fichaAEditar.persona.nombre_completo || ""}
            />
          </div>
          <div className="mt-10 flex flex-row items-center">
            <label
              htmlFor="tipo_seguro"
              className="text-gray-700 w-52 text-sm font-bold mb-2"
            >
              Tipo de Seguro
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="w-52 p-3 bg-white"
                id="tipo_seguro"
                name="tipo_seguro"
                autoComplete="off"
                value={tipo}
                onChange={onIputTipoChange}
              />
            </div>
          </div>
        </div>
        <FichaEditConsulta consultas={ficha.consultas ?? []} />
      </div>
    </>
  );
}
