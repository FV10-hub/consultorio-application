import { Persona } from "@prisma/client"

export type PersonaItem = Pick<Persona, 'id' | 'nombre_completo' | 'documento'>