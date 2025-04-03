const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    status: Joi.string().valid("TODO", "IN_PROGRESS", "COMPLETED").default("TODO"),
    priority: Joi.string().valid("LOW", "MEDIUM", "HIGH").required(),
    dueDate: Joi.date().greater('now').optional(),
});

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json( error );
    }

    next();
};

module.exports = validateTask;
