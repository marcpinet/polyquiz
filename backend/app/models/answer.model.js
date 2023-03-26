const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
    id: Joi.number().required(),
    question_id: Joi.number().required(),
    answer_text: Joi.string(),
    answer_image: Joi.string(),
})