import { Especialidades } from "@prisma/client";

type EspecialidadProps = {
  especialidad?: Especialidades;
};
export default async function EspecialidadForm({
  especialidad,
}: EspecialidadProps) {
  const nombreImagenSiVamosAGuardar = "";
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="codigo"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Codigo
        </label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          autoComplete="off"
          className="block w-full p-3 bg-slate-100"
          placeholder="Codigo"
          defaultValue={especialidad?.codigo || ""}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="descripcion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripcion
        </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          autoComplete="off"
          className="block w-full p-3 bg-slate-100"
          placeholder="descripcion"
          defaultValue={especialidad?.descripcion || ""}
        />
      </div>
    </>
  );
}
