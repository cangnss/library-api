const Joi = require("joi")

export const createBookSchema = Joi.object({
    name: Joi.string().required()
})