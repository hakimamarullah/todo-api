const express = require('express')
const {logger} = require("../logger")
const bodyParser = require("body-parser")

const error = (err, req, res, next)=>{
	if(err)
		return res.send({ok: false, msg:err})
}

const middlewares = [
	logger,
	express.json(),
	bodyParser.json(),
	express.urlencoded({extended: false}),
]

module.exports = middlewares;