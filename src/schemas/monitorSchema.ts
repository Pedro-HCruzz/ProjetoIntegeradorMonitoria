import * as yup from 'yup'


const idSchema = yup.string().required("ID_OBRIGATORIO");

export const monitorGetByIdSchema = yup.object({
    id : idSchema
});


export const monitorUpdateIdSchema = yup.object({
    id : idSchema
})

export const monitorDeleteSchema = yup.object({
    id : idSchema
})

export const monitorCreateSchema = yup.object({
    id: yup.string().required("ALUNO_OBRIGATORIO")
});

