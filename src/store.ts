import { Consulta, Persona } from "@prisma/client";
import { create } from "zustand";
import { PersonaItem } from "./types";
import { updateConsultaById } from "@/actions/consultas/update-consulta-action";
import { deleteConsultaById } from "@/actions/consultas/delete-consulta-action";

interface Store {
  pacienteState: Persona;
  agregarPacienteAFicha: (persona: Persona) => void;
  clearPacienteState: () => void;
  addConsultasAFicha: (consulta: Consulta) => void;
  consultasDeFicha: Consulta[];
  limpiarTodo: () => void;
  updateConsultaById: (consulta: Consulta) => boolean;
  deleteConsultaById: (id: number) => boolean;
}

export const useStore = create<Store>((set, get) => ({
  pacienteState: {} as Persona,
  consultasDeFicha: [],
  agregarPacienteAFicha: (persona: Persona) => {
    set(() => ({
      pacienteState: persona,
    }));
  },
  clearPacienteState: () => {
    set(() => ({
      pacienteState: {} as Persona,
    }));
  },
  addConsultasAFicha: (consulta) => {
    let consultas: Consulta[] = [];
    //TODO: esto es para evitar duplicados descomentar si quieres validar
    /*if (get().consultasDeFicha.find((item) => item.id === consulta.id)) {
      consultas = get().consultasDeFicha.map((item) =>
        item.id === consulta.id
          ? {
              ...item,
            }
          : item
      );
    } else {*/
    consultas = [
      ...get().consultasDeFicha,
      {
        ...consulta,
      },
    ];
    //}
    set(() => ({
      consultasDeFicha: consultas,
    }));
  },
  limpiarTodo: () => {
    set(() => ({
      consultasDeFicha: [],
      pacienteState: {} as Persona,
    }));
  },
  updateConsultaById: (consulta): boolean => {
    if (get().consultasDeFicha.find((item) => item.id === consulta.id)) {
      try {
        updateConsultaById(consulta, consulta.id);
        return true;
      } catch (error) {
        console.error("Error al actualizar la Consulta ", error);
        return false;
      }
    }
    return false;
  },
  deleteConsultaById: (id): boolean => {
    try {
      deleteConsultaById(id);
      return true;
    } catch (error) {
      console.error("Error al eliminar la Consulta ", error);
      return false;
    }
  }
}));
