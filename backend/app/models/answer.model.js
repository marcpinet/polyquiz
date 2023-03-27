const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
    questionId: Joi.number().required(),
    answer_text: Joi.string(),
    answer_image: Joi.string(),
    isCorrect: Joi.boolean().required(),
})