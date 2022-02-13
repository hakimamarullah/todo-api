const express = require("express")
const app = express()
const router = require("./routes/main_routes")
const authRouter = require("./routes/authRouter")
const middlewares = require("./middlewares/middlewares")
const {PORT} = require("./config.env")

//MIDDLEWARE
app.use(middlewares)

//ROUTES
app.use("/api/todo", router)
app.use("/api/user", authRouter)


//ERROR HANDLER BODY-PARSER
app.use((err, req, res, next)=> {

  res.status(500).json({ok:false, msg: err.message});

});

//HOME
app.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "api is online" })
})


//START SERVER
app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
})