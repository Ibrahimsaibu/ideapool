import joi from 'joi'


export const registerShema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required(),
    password: joi.string().min(6).max(10).required()

})
export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()

})

export const updateUserSchema = joi.object({
    name: joi.string(),
    email: joi.string()
})