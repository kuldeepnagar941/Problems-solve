const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    const { title } = req.body;
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
        return res.status(400).json({ message: "Task already exists" });
    }
    const task = new Task(data);
    await task.save();
    res.status(201).json(data);
};

exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate("assignedTo");;
    res.status(200).json(tasks);
};

exports.getOneTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
        return res.status(400).json({ message: "Task does not exist" });
    }
    res.status(200).json(task);
};

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(task);
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json(task);
};
