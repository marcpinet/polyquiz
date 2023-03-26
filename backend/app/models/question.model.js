const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    id: Joi.number().required(),
    quiz_id: Joi.number().required(),
    question_text: Joi.string().required(),
    question_image: Joi.string(),
    question_sound: Joi.string(),
    correct_answer: Joi.number().required(),
    explain_text: Joi.string().required(),
    explain_image: Joi.string(),
})