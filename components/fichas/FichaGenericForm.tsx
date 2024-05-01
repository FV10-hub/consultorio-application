"use client";
import { createFicha } from "@/actions/fichas/create-ficha-action";
import { useForm } from "@/src/hooks/useForm";
import { useStore } from "@/src/store";
import { Persona } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import FichaAddConsulta from "./FichaAddConsulta";
import { PacientesModal } from "./PacientesModal";
type FichaProps = {
  pacientes: Persona[];
  totalPacientes: number;
};

export default function FichaGenericForm({
  pacientes,
  totalPacientes,
}: FichaProps) {
  //modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  //estado
  const agregarPacienteAFicha = useStore(
    (state) => state.agregarPacienteAFicha
  );
  const pacienteState = useStore((state) => state.pacienteState);
  const clearPacienteState = useStore((state) => state.clearPacienteState);
  const consultasDeFicha = useStore((state) => state.consultasDeFicha);
  const limpiarTodo = useStore((state) => state.limpiarTodo);

  //PROPS
  function getPersonaSelected(persona: Persona) {
    //TODO: agregar aca personaId si hay problemas
    agregarPacienteAFicha(persona);
    //TODO: mala practica
    onIputChange({
      target: { name: "paciente_nombre", value: persona.nombre_completo },
    });
  }

  //LOCAL
  const router = useRouter();

  const { formState, onResetForm, onIputChange } = useForm({
    createdAt: new Date().toISOString().split("T")[0],
    paciente_nombre: "",
    tipo_seguro: "",
    personaId: 0,
  });

  useEffect(() => {
    clearPacienteState();
  }, [clearPacienteState]);

  const { createdAt, paciente_nombre, tipo_seguro, personaId } = formState;

  //GUARDAR
  const handleCrearFicha = async () => {
    const data = {
      tipo_seguro: tipo_seguro,
      personaId: pacienteState.id,
      consultas: consultasDeFicha.map((consulta) => ({
        hora_consulta: consulta.hora_consulta,
        motivo_consulta: consulta.motivo_consulta,
        observacion: consulta.observacion,
        indicacion: consulta.indicacion,
        receta: consulta.receta,
        asistio: consulta.asistio ? true : false,
      })),
    };

    if (data.personaId === null || data.personaId <= 0) {
      toast.error("Debe seleccionar un Paciente");
      return;
    }

    const response = await createFicha(data);
    if (!response) {
      toast.error("No se Guardo");
      return;
    }

    toast.success("Se guardo");
    limpiarTodo();
    router.push("/fichas");
  };

  return (
    <>
      <div className="border-b border-gray-900/10 pb-12 ">
        <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
          <button
            onClick={handleCrearFicha}
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
                type="date"
                name="createdAt"
                id="createdAt"
                autoComplete="off"
                className="w-52 p-3 bg-white"
                value={createdAt}
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
              className="w-96 p-3"
              placeholder="Buscar paciente"
              value={paciente_nombre}
              onChange={onIputChange}
            />
            <button
              className="btn bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
              onClick={() => setModalOpen(true)}
            >
              Buscar <IoSearch className="ml-2" size={18} />
            </button>
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
                name="tipo_seguro"
                id="tipo_seguro"
                className="w-96 p-3"
                placeholder="Escribe tu tipo de seguro"
                value={tipo_seguro}
                onChange={onIputChange}
              />
            </div>
          </div>
        </div>
        <FichaAddConsulta/>
        <PacientesModal
          personas={pacientes}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setPacienteForm={getPersonaSelected}
        />
      </div>
    </>
  );
}
