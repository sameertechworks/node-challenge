const Joi = require('@hapi/joi') 
const schemas = {
  // book create schema
  bookCreate: Joi.object().keys({ 
    title: Joi.string().min(1).max(50).required(),
    author: Joi.string().min(1).max(50).required() 
  }),

  // book update schema
  bookUpdate: Joi.object().keys({
    title: Joi.string().min(1).max(50).required(), 
    author: Joi.string().min(1).max(50).required()
  }),

  // Delete one book schema
  bookDelete: { 
    slug: Joi.string().min(1).required() 
  }
};

module.exports = schemas;