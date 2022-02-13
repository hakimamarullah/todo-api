const getAllTodo = `SELECT USERS.username,id,content, to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete
            FROM USERS INNER JOIN TODOS ON USERS.username=$1 ORDER BY due_date ASC`;


const getTodoById = `SELECT
            id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete FROM TODOS, USERS WHERE id=$1 and USERS.username=$2`;

const getTodoToUpdate = `SELECT
            id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete FROM TODOS WHERE id=$1 and username=$2`;

const updateTodo = `UPDATE TODOS SET
            content=$1,
            due_date=$2,
            complete=$3
            where id=$4 and username=$5 RETURNING username, id,content,
            to_char(due_date, 'YYYY-MM-DD HH24:MI:SS') as due_date,
            to_char(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at,
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete`;

const deleteById = `DELETE FROM TODOS WHERE id=$1 and username=$2
            RETURNING id, content, 
            to_char(completed_at, 'YYYY-MM-DD HH24:MI:SS') as completed_at,
            complete`;

const insert = "INSERT INTO todos (username, content, due_date) VALUES($1,$2,$3) RETURNING id, content";

const register = "INSERT INTO USERS (username, email, password) VALUES($1, $2, $3) RETURNING username";

const login = "SELECT username, password FROM USERS WHERE username=$1";

const update_user_last_login = "UPDATE USERS SET last_login=$2 WHERE username=$1 RETURNING to_char(last_login, 'YYYY-MM-DD HH24:MI:SS') as last_login"

module.exports = {
    getAllTodo,
    getTodoById,
    getTodoToUpdate,
    updateTodo,
    deleteById,
    insert,
    register,
    login,
    update_user_last_login

}