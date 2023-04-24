const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Settings", {
  user_id: Joi.number().required(),
  sound_effect: Joi.boolean().required(),
  mouse_option: Joi.string().required(),
  microphone: Joi.string().required(),
  confirm_answer: Joi.boolean().required(),
});
