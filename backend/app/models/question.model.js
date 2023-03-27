const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    quizId: Joi.number(),
    question_text: Joi.string().required(),
    question_image: Joi.string(),
    question_sound: Joi.string(),
    explain_text: Joi.string().required(),
    explain_image: Joi.string(),
    answers: Joi.array(),
})