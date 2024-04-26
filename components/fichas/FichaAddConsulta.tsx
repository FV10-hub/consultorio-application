import { useStore } from "@/src/store";
import { formatFecha } from "@/src/utils";
import { Consulta } from "@prisma/client";
import { useEffect, useState } from "react";
import { IoAdd, IoEye } from "react-icons/io5";
import { ConsultaModal } from "./ConsultaModal";
import { VerModal } from "./verConsultaModal";

export default function FichaAddConsulta() {
  useEffect(() => {
    limpiarTodo();
  }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [verOpen, setVerOpen] = useState<boolean>(false);
  const addConsultasAFicha = useStore((state) => state.addConsultasAFicha);
  const consultasDeFicha = useStore((state) => state.consultasDeFicha);
  const limpiarTodo = useStore((state) => state.limpiarTodo);
  function getConsultaCreada(consulta: Consulta) {
    addConsultasAFicha(consulta);
  }
  const [verConsulta, setConsultaOpen] = useState<Consulta>({
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    hora_consulta: "",
    motivo_consulta: "",
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
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Fecha
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Hora
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Observación
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Asistencia
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Ver
              </th>
            </tr>
          </thead>
          <tbody>
            {consultasDeFicha
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((consulta) => (
                <tr key={consulta.id}>
                  <td className="ext-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {formatFecha(consulta.createdAt)}
                  </td>
                  <td className="ext-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {consulta.hora_consulta}
                  </td>
                  <td className="ext-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {consulta.observacion}
                  </td>
                  <td className="ext-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={consulta.asistio}
                      disabled
                    />
                  </td>
                  <td className="ext-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleVerConsulta(consulta)}
                      className="btn bg-gray-400 rounded-lg shadow-xl"
                    >
                      Ver <IoEye className="ml-2" size={20} />
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
