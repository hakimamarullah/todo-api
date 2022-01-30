const express = require('express')
const {logger} = require("../logger")

const middlewares = [
	logger,
	express.json(),
	express.urlencoded({extended: false})
]

module.exports = middlewares;