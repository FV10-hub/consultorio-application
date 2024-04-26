import { Persona } from "@prisma/client";
import FichaGenericForm from "./FichaGenericForm";

type FichaProps = {
  pacientes?: Persona[];
  totalPacientes?: number;
};

export default async function FichaForms({
  pacientes,
  totalPacientes,
}: FichaProps) {
  return (
    <>
      <FichaGenericForm pacientes={pacientes ?? []} totalPacientes={totalPacientes ?? 1} />
    </>
  );
}
