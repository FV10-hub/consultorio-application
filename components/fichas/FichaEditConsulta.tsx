import React, { useState } from "react";
import { IoAdd, IoEye, IoWatch } from "react-icons/io5";
import { Consulta } from "@prisma/client";
import { useStore } from "@/src/store";
import { ConsultaModal } from "./ConsultaModal";
import { formatFecha } from "@/src/utils";
import { VerModal } from "./verConsultaModal";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ConsultasProps = {
  consultas: Consulta[];
};

export default function FichaEditConsulta({ consultas }: ConsultasProps) {
  useEffect(() => {
    limpiarTodo();
    consultas?.forEach((consulta) => {
      addConsultasAFicha(consulta);
    });
  }, [consultas]);

  const pathName = usePathname();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [verOpen, setVerOpen] = useState<boolean>(false);
  const addConsultasAFicha = useStore((state) => state.addConsultasAFicha);
  const consultasDeFicha = useStore((state) => state.consultasDeFicha);
  const limpiarTodo = useStore((state) => state.limpiarTodo);
  
  const [verConsulta, setConsultaOpen] = useState<Consulta>({
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    hora_consulta: "",
    observacion: "",
    indicacion: "",
    receta: "",
    asistio: true,
    fichaId: 0,
  });
  function handleVerConsulta(consulta: Consulta) {
    setConsultaOpen(consulta);
    setVerOpen(true);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState(consultas);
  const onChangePaciente = (event: any) => {
    const nuevoFiltro = event.target.value;
    setSearchTerm(nuevoFiltro);
    if (nuevoFiltro === "") {
      setListaFiltrada(consultas);
    } else {
      const listaFiltrada = consultas!
        .filter((consulta) =>
          consulta.observacion
            ?.toLocaleLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setListaFiltrada(listaFiltrada);
    }
  };

  function getConsultaCreada(consulta: Consulta) {
    addConsultasAFicha(consulta);
    const nuevaLista = [...listaFiltrada, consulta];
    // Actualizar el estado con la nueva lista
    setListaFiltrada(nuevaLista);
  }

  return (
    <>
      <h2 className="text-xl font-bold mt-4 mb-2">Consultas</h2>
      <div className="mt-4 ">
        <button
          onClick={() => setModalOpen(true)}
          className="btn bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
        >
          Agregar Consulta <IoAdd className="ml-2" size={18} />
        </button>
      </div>
      {pathName.includes("editar") && (
        <div className="mt-5 p-3">
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            className="w-96 p-3 rounded-md"
            placeholder="Buscar conulta por observacion"
            value={searchTerm}
            onChange={onChangePaciente}
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <table className="w-full table-auto table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-700 font-bold">Fecha</th>
              <th className="px-4 py-2 text-gray-700 font-bold">Hora</th>
              <th className="px-4 py-2 text-gray-700 font-bold">Observación</th>
              <th className="px-4 py-2 text-gray-700 font-bold">Asistencia</th>
              <th className="px-4 py-2 text-gray-700 font-bold">Ver</th>
            </tr>
          </thead>
          <tbody>
            {listaFiltrada!
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((consulta) => (
                <tr key={consulta.id}>
                  <td className="px-4 py-2">
                    {formatFecha(consulta.createdAt)}
                  </td>
                  <td className="px-4 py-2">{consulta.hora_consulta}</td>
                  <td className="px-4 py-2">{consulta.observacion}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={consulta.asistio}
                      disabled
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleVerConsulta(consulta)}
                      className="btn"
                    >
                      Ver <IoEye />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ConsultaModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setConsultaForm={getConsultaCreada}
      />
      <VerModal
        verOpen={verOpen}
        setVerOpen={setVerOpen}
        consulta={verConsulta}
      />
    </>
  );
}
