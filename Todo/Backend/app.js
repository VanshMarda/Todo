const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const tasksFilePath = path.join(__dirname, 'tasks.json');

let tasks = [];
try {
  tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
} catch (error) {
  console.error('Error reading tasks file:', error);
}

function saveTasksToFile() {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing tasks file:', error);
  }
}

app.get('/tasks', (req, res) => { // endpoint to get all the tasks initially
  try {
    const tasksData = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ error: 'Error reading tasks file' });
  }
});

app.post('/Addtasks', (req, res) => {
  const { id, task, time } = req.body;
  if (!task || !time) {
    return res.status(400).json({ error: 'Task and time are required' });
  }
  tasks.push({ id, task, time });
  saveTasksToFile(); // Save tasks to file
  console.log(tasks);
  res.status(201).json({ message: 'Task added successfully' });
});

app.delete('/deleteTask/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToFile(); // Save tasks to file
    console.log(tasks);
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.put('/updateTask/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { task, time } = req.body;
  console.log('Received data:', { taskId, task, time }); 
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], task, time };
    saveTasksToFile(); // Save tasks to file
    res.status(200).json({ message: 'Task updated successfully', task: tasks[index] });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
