import * as yup from 'yup'


const idSchema = yup.string().required("ID_OBRIGATORIO");

export const monitorGetByIdSchema = yup.object({
    id : idSchema
});

// validação de id e de dados diferentes para a rota put

export const monitorUpdateIdSchema = yup.object({
    id : idSchema
})

export const monitorUpdateSchema = yup.object({
    nome : yup.string().optional(),
    email : yup.string().email().optional(),
})

export const monitorDeleteSchema = yup.object({
    id : idSchema
})

export const monitorCreateSchema = yup.object({
    nome : yup.string().required(),
    email : yup.string().email().required(),
});

