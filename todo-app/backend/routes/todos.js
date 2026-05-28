const express = require("express");

const router = express.Router();

const Todo = require("../models/Todo");



// GET ALL TODOS
router.get("/", async (req, res) => {

    try {

        const todos = await Todo.find()
        .sort({ createdAt: -1 });

        res.json(todos);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});




// CREATE TODO
router.post("/", async (req, res) => {

    try {

        const todo = new Todo({
            text: req.body.text
        });

        const savedTodo = await todo.save();

        res.status(201).json(savedTodo);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});




// UPDATE TODO
router.put("/:id", async (req, res) => {

    try {

        const updatedTodo =
        await Todo.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(updatedTodo);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});




// DELETE TODO
router.delete("/:id", async (req, res) => {

    try {

        await Todo.findByIdAndDelete(req.params.id);

        res.json({
            message: "Todo Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;