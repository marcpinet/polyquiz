const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Resident", {
  userId: Joi.number(),
  id: Joi.number().required(),
  sexe: Joi.string().required(),
  symptome: Joi.array().required(),
  dateOfBirth: Joi.date().raw().required(),
});
