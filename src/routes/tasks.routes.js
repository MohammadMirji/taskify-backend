const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, tasksController.getAllTasks);
router.post('/', protect, tasksController.createTask);
router.get('/:id', protect, tasksController.getTaskById); // if you have it
router.put('/:id', protect, tasksController.updateTask);
router.delete('/:id', protect, tasksController.deleteTask);

module.exports = router;
