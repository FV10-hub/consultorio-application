import { Persona } from "@prisma/client";

type PersonaProps = {
  persona?: Persona;
};
export default async function PersonaForm({ persona }: PersonaProps) {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="nombre_completo"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre Completo
        </label>
        <input
          type="text"
          id="nombre_completo"
          name="nombre_completo"
          autoComplete="off"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Completo"
          defaultValue={persona?.nombre_completo || ""}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="documento"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Documento
        </label>
        <input
          type="text"
          id="documento"
          name="documento"
          autoComplete="off"
          className="block w-full p-3 bg-slate-100"
          placeholder="Documento"
          defaultValue={persona?.documento || ""}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="telefono"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Telefono
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          autoComplete="off"
          className="block w-full p-3 bg-slate-100"
          placeholder="telefono"
          defaultValue={persona?.telefono || ""}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="off"
          className="block w-full p-3 bg-slate-100"
          placeholder="Correo"
          defaultValue={persona?.email || ""}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="esPaciente"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Es Paciente?
        </label>
        <input
          type="checkbox"
          id="esPaciente"
          name="esPaciente"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          defaultChecked={persona?.esPaciente || true}
        />
      </div>
    </>
  );
}
