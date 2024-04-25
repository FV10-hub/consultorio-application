import { z } from "zod";

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "La búsqueda no puede ir vacia" }),
});

export const PersonaSchema = z.object({
  nombre_completo: z
    .string()
    .trim()
    .min(1, { message: "El Nombre de la persona no puede ir vacio" }),
  documento: z
    .string()
    .trim()
    .min(1, { message: "El Documento de la persona no puede ir vacio" }),
  telefono: z
    .string()
    .trim()
    .min(1, { message: "El Telefono de la persona no puede ir vacio" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "El Correo de la persona no puede ir vacio" }),
  esDoctor: z.boolean({
    required_error: "isActive is required",
    invalid_type_error: "isActive must be a boolean",
  }),
  esPaciente: z.boolean({
    required_error: "isActive is required",
    invalid_type_error: "isActive must be a boolean",
  }),
  /*price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, {message: 'La Imagen es obligatoria'})*/
});

export const EspecialidadSchema = z.object({
  codigo: z.string().trim().min(1, { message: "El codigo no puede ir vacia" }),
  descripcion: z
    .string()
    .trim()
    .min(1, { message: "La descripcion no puede ir vacia" }),
});

export const FichaSchema = z.object({
  personaId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "El paciente es Obligatorio" })
    .or(z.number().min(1, { message: "El paciente es Obligatorio" })),
  /*consultas: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),*/
});
