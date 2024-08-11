const Joi = require("joi")

export const createUserSchema = Joi.object({
    name: Joi.string().required()
})