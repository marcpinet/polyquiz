const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Notification", {
  senderId: Joi.number().required(),
  receiverId: Joi.number().required(),
  message: Joi.string().required(),
  date: Joi.date().required(),
  seen: Joi.boolean().required(),
  type: Joi.string().required(),
});
