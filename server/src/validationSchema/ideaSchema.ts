import joi from 'joi'


export const ideaSchema = joi.object({
    text: joi.string().required(),
    ease: joi.number().required(),
    impact: joi.number().required(),
    confidence: joi.number().required(),

})

export const updateIdeaSchema = joi.object({
    text: joi.string(),
    ease: joi.number(),
    impact: joi.number(),
    confidence: joi.number(),
})
