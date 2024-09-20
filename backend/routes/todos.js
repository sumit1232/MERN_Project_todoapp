// routes/todos.js
const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Add Todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    });
    try {
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get Todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).send('Todo not found');

        todo.completed = req.body.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).send('Todo not found');
        res.json({ message: 'Deleted Todo' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
