const db = require("../database/db")

const getAllTodo = async (req, res) => {
    try {

    }
    catch(err) {

    }

}

const getTodo = async (req, res) => {
    try {

    }
    catch(err) {

    }
}

const updateTodo = async (req, res) => {
    try {

    }
    catch(err) {

    }
}

const deleteTodo = async (req, res) => {
    try {

    }
    catch(err) {

    }
}

const createTodo = async (req, res) => {
    try {
    	const {content, due_date} = req.body;
    	const newTodo = await db("INSERT INTO todos (content, due_date) VALUES($1,$2)",
    		content, due_date)
    	res.status(201).json({success: true, msg: "successfully added new to do"})
    }
    catch(err) {
    	res.status(400).json({success: false, msg: err.message})
    }
}


module.exports = {
    getAllTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    createTodo
}