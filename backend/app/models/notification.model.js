const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Notification", {
  sender_id: Joi.number().required(),
  user_id: Joi.number().required(),
  message: Joi.string().required(),
  date: Joi.date().required(),
  seen: Joi.boolean().required(),
  type: Joi.string().required(),
});
