import * as yup from "yup";


const idSchema = yup.string().required("ID_OBRIGATORIO");

export const monitoriaGetByIdSchema = yup.object({
  id: idSchema,
});

export const monitoriaDeleteSchema = yup.object({
  id: idSchema,
});


export const monitoriaUpdateIdSchema = yup.object({
  id: idSchema,
});
export const monitoriaUpdateSchema = yup.object({
  nome_monitoria: yup.string().optional(),
  disciplina: yup.string().optional(),
  data: yup.date().optional(),
  hora_inicio: yup.date().optional(),
  hora_fim: yup.date().optional(),
  local: yup.string().optional(),
  monitorId: yup.string().optional(),
});


export const monitoriaCreateSchema = yup.object({
  nome_monitoria: yup.string().required(),
  disciplina: yup.string().required(),
  data: yup.date().required(),
  hora_inicio: yup.date().required(),
  hora_fim: yup.date().required(),
  local: yup.string().optional(),
  monitorId: yup.string().required(),
});
