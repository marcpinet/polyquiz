const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
    user_id: Joi.number().required(),
    quiz_id: Joi.number().required(),
    right_answers: Joi.number().required(),
    wrong_answers: Joi.number().required(),
    score: Joi.number().required(),
    play_time: Joi.number().required(), //by seconds
    date: Joi.date().required(),
    time_per_question: Joi.number().required(),
})