const db = require("../database/db")
const query = require("../database/queries")


const prettify = (object) => {
    return JSON.stringify(object, null, 4)
}

const validateRowsResult = (object)=>{
    if(object.rows.length === 0)
        throw new Error("Entry Not Found");
}

const getAllTodo = async (req, res) => {
    try {
        const data = await db(query.getAllTodo, req.query.username);
        res.header("Content-Type", "application/json")
        res.status(200).send(prettify({ ok: true, data: data.rows }))
    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))
    }

}

const getTodo = async (req, res) => {
    try {
        const data = await db(query.getTodoById, req.params.id, req.query.username);

        validateRowsResult(data);

        res.header("Content-Type", "application/json");
        res.status(200).send(prettify({ ok: true, data: data.rows }))

    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))
    }
}

const updateTodo = async (req, res) => {
    try {
        let { content = '', due_date = '', complete = undefined } = req.body;
        const { rows } = await db(query.getTodoToUpdate, req.params.id, req.query.username);

        validateRowsResult({rows: rows});
        content = content === '' ? rows[0].content : content;
        due_date = due_date === '' ? rows[0].due_date : due_date;
        complete = complete === undefined ? rows[0].complete : complete;

        const { rows: rowUpdated, command, oid, rowCount } = await db(query.updateTodo, content, due_date, complete, req.params.id, req.query.username);


        res.header("Content-Type", "application/json")
        res.status(200).send(prettify({ ok: true, data: { rowUpdated, command, oid, rowCount } }))

    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))

    }
}

const deleteTodo = async (req, res) => {
    try {
        const deleted = await db(query.deleteById,req.params.id, req.query.username);

        validateRowsResult(deleted);

        res.header("Content-Type", "application/json")
        res.status(200).send(prettify({ ok: true, data: deleted.rows }))

    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))

    }
}

const createTodo = async (req, res) => {
    try {
        const { username, content, due_date } = req.body;
        if (!content || !due_date || !username) {
            console.log(req.body)
            throw new Error("Content and due_date can't be empty");
        }
        const { command, rowCount, rows } = await db(query.insert,username,content, due_date)
        res.status(201).json({ success: true, msg: "successfully added new to do", result: { command, rowCount, rows } })
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message })
    }
}


module.exports = {
    getAllTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    createTodo
}