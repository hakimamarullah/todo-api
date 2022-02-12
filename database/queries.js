const getAllTodo = `SELECT id,content, to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete
            FROM TODOS ORDER BY due_date ASC`;


const getTodoById = `SELECT
            id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete FROM TODOS WHERE id=$1`;

const getTodoToUpdate = `SELECT
            id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete FROM TODOS WHERE id=$1`;

const updateTodo = `UPDATE TODOS SET
            content=$1,
            due_date=$2,
            complete=$3
            where id=$4 RETURNING id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete`;

const deleteById = `DELETE FROM TODOS WHERE id=$1
            RETURNING id, content, 
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete`;

const insert = "INSERT INTO todos (content, due_date) VALUES($1,$2) RETURNING id, content";


module.exports = {
    getAllTodo,
    getTodoById,
    getTodoToUpdate,
    updateTodo,
    deleteById,
    insert

}