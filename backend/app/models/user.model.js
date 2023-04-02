const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  userType: Joi.string().required(),
  avatar: Joi.string().default("../../assets/images/defaultAvatar.png"),
});
