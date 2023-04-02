const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Settings", {
  user_id: Joi.number().required(),
  sound_effect: Joi.boolean().required(),
  mouse_option: Joi.string().required(),
  microphone: Joi.boolean().required(),
  confirm_answer: Joi.boolean().required(),
  keyboard_control: Joi.boolean().required(),
  
});
