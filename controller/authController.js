const db = require("../database/db")
const query = require("../database/queries")
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation")
const timeNow = require("../timestampcustom")

//REMOVE NON-ALPHANUMERIC CHARACTER
const regex = /[^\w\s]/gi;



const register = async (req, res) => {
    const { error, value } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ ok: false, msg: error.details[0].message.replace(regex, "") })
    }

    try {
        //PASSWORD ENCRYPTION
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const { rows } = await db(query.register, req.body.username, req.body.email, hashedPassword)
        res.status(201).json({ success: true, msg: "registration success", result: { rows } })
    } catch (err) {
        res.status(400).json({ success: false, msg: err.detail })
    }
}

const login = async (req, res) => {
    const { error, value } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ ok: false, msg: error.details[0].message.replace(regex, "") })
    }

    try {
        //QUERY PASSWORD FROM DB
        const { rows: user } = await db(query.login, req.body.username)

        if (!user[0]) {
            return res.status(404).json({ success: false, msg: "user not found" })
        }

        //AUTHENTICATE USER PASSWORD
        const valid = await bcrypt.compare(req.body.password, user[0].password)

        if (!valid) {
            return res.status(403).json({ success: false, msg: "Wrong password" })
        }

        //UPDATE LAST LOGIN
        const { rows } = await db(query.update_user_last_login, user[0].username, timeNow());

        res.status(201).json({ success: valid, msg: "login success", time: rows[0].last_login })
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message })
    }
}

module.exports = { register, login }