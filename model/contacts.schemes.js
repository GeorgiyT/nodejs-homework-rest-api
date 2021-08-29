const Joi = require('joi');
Joi.objectId = require("joi-objectid")(Joi);

exports.createContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).required(),
    favorite: Joi.boolean().required()
})

exports.updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string().min(6),
    favorite: Joi.boolean()
}).min(1)

exports.updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean()
})

exports.idValidationSchema = Joi.object({
    contactId: Joi.objectId(),
})