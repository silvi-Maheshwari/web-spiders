# Task Management API

## Project Overview
This is a RESTful API for a Task Management Application built using Node.js, Express.js, and MongoDB. It allows users to create, retrieve, update, and delete tasks with various filtering, sorting, and pagination features.

## Features
- Task creation with validation
- Filtering and sorting tasks by status, priority, and due date
- Pagination support
- Soft delete implementation
- Error handling middleware
- API logging using Morgan

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: express-validator
- **Logging**: Morgan
- **Environment Configuration**: dotenv

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set up your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Database Schema and Sample Data
### Schema (`models/Task.js`)
```javascript
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String },
    status: { type: String, enum: ["TODO", "IN_PROGRESS", "COMPLETED"], default: "TODO" },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], required: true },
    dueDate: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
```

### Sample Data (`db/sampleData.js`)
```javascript
const Task = require("../models/Task");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Task.insertMany([
      {
        title: "Complete project documentation",
        description: "Write detailed API documentation",
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date(),
      },
      {
        title: "Fix authentication bug",
        description: "Resolve login issue",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
      }
    ]);
    console.log("Sample data inserted");
    process.exit();
  })
  .catch(err => console.error("Database connection error", err));
```

## API Endpoints
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| POST   | `/tasks`       | Create a new task |
| GET    | `/tasks`       | Retrieve all tasks (supports filtering, sorting, pagination) |
| GET    | `/tasks/:id`   | Retrieve a specific task |
| PUT    | `/tasks/:id`   | Update an existing task |
| DELETE | `/tasks/:id`   | Soft delete a task |

## Design Decisions
1. **Soft Delete Implementation**: Instead of permanently deleting tasks, a `deletedAt` field is used to mark tasks as deleted. This allows for easy data recovery if needed.
2. **Validation Layer**: `express-validator` ensures input data integrity before processing requests.
3. **Modular Code Structure**: Separated concerns into `models`, `routes`, `controllers`, and `middlewares` for maintainability.
4. **Pagination & Filtering**: Implemented query parameters to fetch relevant tasks efficiently.

## Development Workflow
- Frequent commits are made to show incremental progress.
- Git commits follow conventional commit messages (e.g., `feat: add filtering logic`).
- The database schema and sample data are included in the `db/` folder.

## Testing
- Use Postman or cURL to test API endpoints.
- Sample cURL request to create a task:
  ```bash
  curl -X POST http://localhost:5000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title": "New Task", "priority": "HIGH"}'
  ```

## Future Improvements
- Implement JWT authentication
- Add unit tests using Jest
- Improve error handling with detailed error codes



