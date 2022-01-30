const express = require("express")
const app = express()
const router = require("./routes/main_routes")
const middlewares = require("./middlewares/middlewares")
let port = process.env.PORT || 8000


//MIDDLEWARE
app.use(middlewares)

//ROUTES
app.use("/api/todo", router)


//HOME
app.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "api is online" })
})


//START SERVER
app.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
})