const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const varifyauth = require('../middlewares/verifyauth')


router.post('/tasks',varifyauth, taskController.createTask);
router.get('/tasks',varifyauth, taskController.getAllTasks);
router.get('/tasks/:id',varifyauth, taskController.getOneTask);
router.put('/tasks/:id',varifyauth, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
