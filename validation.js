const Joi = require("joi");

const register = {
	username: Joi.string()
	.min(5)
	.max(50)
	.required(),

	email: Joi.string()
	.email(),

	password: Joi.string().min(6).max(15)
}

const login = {
	username: Joi.string()
	.min(5)
	.max(50)
	.required(),

	password: Joi.string().min(6).max(15)
}

const registerValidation = (data)=>{
	const {error, value } = Joi.object(register).validate(data);
	return {error,value};
}

const loginValidation = (data)=>{
	const {error, value } = Joi.object(login).validate(data);
	return {error, value};
}

module.exports ={
	registerValidation,
	loginValidation
}