const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("InitSettings", {
  user_id: Joi.number().required(),
  sound_effect: Joi.boolean().required(),
  mouseOptions: Joi.string().required(),
  microphone: Joi.boolean().required(),
  confirm: Joi.boolean().required(),
  keyboard: Joi.boolean().required(),
  
});
