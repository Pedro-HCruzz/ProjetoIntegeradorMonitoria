import * as yup from 'yup'


const idSchema = yup.string().uuid().required("ID_OBRIGATORIO");

export const inscricoesGetByIdSchema = yup.object({
    id : idSchema
});
export const inscricoesDeleteSchema = yup.object({
    id : idSchema
})

export const inscricoesCreateSchema = yup.object({
    alunoId : idSchema,
    monitoriaId : idSchema
});
