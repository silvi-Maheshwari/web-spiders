const express = require('express');
const taskrouter = express.Router();
const taskmodel = require('../models/Task');
const validateTask = require('../validators/taskValidator');

taskrouter.get('/', async (req, res, next) => {
    try {
        let { status, priority, sort, order = 'asc', limit = 10, page = 1 } = req.query;

        let filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        let sortOptions = {};
        if (sort === 'createdAt' || sort === 'dueDate') {
            sortOptions[sort] = order === 'desc' ? -1 : 1;
        }

        limit = parseInt(limit);
        page = parseInt(page);
        const skip = (page - 1) * limit;

        const tasks = await taskmodel.find(filter)
            .sort(sortOptions)
            .limit(limit)
            .skip(skip);

        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
});

taskrouter.get('/:id', async (req, res,next) => {
    try {
        const id = req.params.id
        const data = req.body
        const gettask = await taskmodel.findOne({ _id: id })
        res.status(200).json(gettask);
    } catch (err) {
        // console.log('something went wrong', err)
        // res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
})

taskrouter.post('/', validateTask, async (req, res,next) => {
    try {
        const data = req.body;
        const createdata = await taskmodel.create(data);
        res.status(201).json(createdata);
    } catch (err) {
        // console.log('Something went wrong:', err);
        // res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
});
taskrouter.put('/:id', validateTask,async (req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatetask = await taskmodel.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );

        if (!updatetask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatetask);
    } catch (err) {
        // console.log('Something went wrong:', err);
        // res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
});

taskrouter.delete('/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const deletetask = await taskmodel.findByIdAndDelete(id)

        if (!deletetask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        // console.log('Something went wrong:', err);
        // res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
});
module.exports = taskrouter; 
