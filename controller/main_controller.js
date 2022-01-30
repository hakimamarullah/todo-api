const db = require("../database/db")


const prettify = (object) => {
    return JSON.stringify(object, null, 4)
}

const getAllTodo = async (req, res) => {
    try {
        const data = await db(`SELECT id,content, to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete
            FROM TODOS ORDER BY due_date ASC`);
        console.log(data)
        res.header("Content-Type", "application/json")
        res.status(200).send(prettify({ ok: true, data: data.rows }))
    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))
    }

}

const getTodo = async (req, res) => {
    try {
        const data = await db(`SELECT
            id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete FROM TODOS WHERE id=$1`, req.params.id);
        res.header("Content-Type", "application/json");
        res.status(200).send(prettify({ ok: true, data: data.rows }))

    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))
    }
}

const updateTodo = async (req, res) => {
    try {
        let { content = undefined, due_date = undefined, complete = undefined } = req.body;
        const { rows } = await db(`SELECT
            id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete FROM TODOS WHERE id=$1`, req.params.id);

        content = content === '' ? rows[0].content : content;
        due_date = due_date === '' ? rows[0].due_date : due_date;
        complete = complete === undefined ? rows[0].complete : complete;

        const { rows: rowUpdated, command, oid, rowCount } = await db(`UPDATE TODOS SET
            content=$1,
            due_date=$2,
            complete=$3
            where id=$4 RETURNING id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete`, content, due_date, complete, req.params.id);


        res.header("Content-Type", "application/json")
        res.status(200).send(prettify({ ok: true, data: { rowUpdated, command, oid, rowCount } }))

    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))

    }
}

const deleteTodo = async (req, res) => {
    try {
        const deleted = await db(`DELETE FROM TODOS WHERE id=${req.params.id}
            RETURNING id, content, 
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete`);

        if (deleted.rows.length === 0) {
            throw new Error(`No entry with id: ${req.params.id}`);
        }

        res.header("Content-Type", "application/json")
        res.status(200).send(prettify({ ok: true, data: deleted }))

    } catch (err) {
        res.status(404).send(prettify({ ok: false, msg: err.message }))

    }
}

const createTodo = async (req, res) => {
    try {
        const { content, due_date } = req.body;
        if (!content || !due_date) {
            throw new Error("Content and due_date can't be empty");
        }
        const { command, rowCount, rows } = await db("INSERT INTO todos (content, due_date) VALUES($1,$2) RETURNING content",
            content, due_date)
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