const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error("missing field favorite")),
});

const Contact = model("contact", contactSchema);

module.exports = {
  contactJoiSchema,
  updateFavoriteJoiSchema,
  Contact,
};
