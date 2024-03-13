const escape = require('escape-html');
const express = require('express');
const router = express.Router();
const openDB = require('../database/database');

// Create a new task
router.post('/add', async (req, res) => {
  const { name, email, text } = req.body;
  try {
    const db = await openDB();
    await db.run('INSERT INTO todo (name, email, text, status) VALUES (?, ?, ?, 0)', [name, email, text]);
    res.status(201).json({ message: 'Task created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get count of tasks
router.get('/count', async (req, res) => {
  try {
    const db = await openDB();
    const count = await db.get('SELECT COUNT(*) AS count FROM todo');
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all tasks
router.get('/list/:limit-:offset/:order', async (req, res) => {
  try {
    const db = await openDB();
    const order = escape(req.params.order);
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    const tasks = await db.all(`SELECT * FROM todo ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single task by id
router.get('/get/:id', async (req, res) => {
  try {
    const db = await openDB();
    const task = await db.get('SELECT * FROM todo WHERE id = ?', [parseInt(req.params.id)]);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.patch('/update/:id', async (req, res) => {
  const { text, status } = req.body;
  try {
    const db = await openDB();
    const result = await db.run('UPDATE todo SET text = ?, status = ? WHERE id = ?', [text, status, parseInt(req.params.id)]);
    if (result.changes) {
      res.status(200).json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
