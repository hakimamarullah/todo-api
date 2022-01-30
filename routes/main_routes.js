const express = require("express");
const router = express.Router();
const {
	getAllTodo,
	getTodo,
	updateTodo,
	createTodo,
	deleteTodo } = require("../controller/main_controller")

router.get("/", getAllTodo);

router.get("/:id", getTodo);

router.put("/:id", updateTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

module.exports = router;