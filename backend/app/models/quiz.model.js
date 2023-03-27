const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
    name: Joi.string().required(),
    difficulty: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    estimated_time: Joi.number().integer().required(),
    themeId: Joi.number().integer().required(),
})