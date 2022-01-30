const db = require("../database/db")

const getAllTodo = async (req, res) => {
    try {
    	//const data = await db("SELECT * FROM TODOS ORDER BY due_date ASC");
    	res.status(200).json({ok: true})
    }
    catch(err) {
    	res.status(404).json({ok: false, msg:err.message})
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
    	if(!content || !due_date){
    		throw new Error("Content and due_date can't be empty");
    	}
    	const {command, rowCount, rows} = await db("INSERT INTO todos (content, due_date) VALUES($1,$2) RETURNING content",
    		content, due_date)
    	res.status(201).json({success: true, msg: "successfully added new to do", result:{command, rowCount, rows}})
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