const Joi = require('@hapi/joi');

const registrationValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        password2: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports = {
    registrationValidation,
    loginValidation
};