import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Box, Select, MenuItem, TextField } from '@mui/material';
import { Task } from '../../Interfaces/Task';
import { TaskListProps } from '../../Interfaces/Task';
import { getTasks, createTask, updateTask } from '../../Services/TaskService';


const TaskList: React.FC<TaskListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; description: string }>({ title: '', description: ''});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response);
  };

  const handleCreateTask = async () => {
    try {
      const createdTask = await createTask({ ...newTask, status: 'Backlog' });
      setTasks((prevTasks) => [...prevTasks, createdTask]); 
      setNewTask({ title: '', description: '' });
      alert('Created Task!');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleStatusChange = async (id: number, status: Task['status']) => {
    try {
      await updateTask(id, status);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5">My Tasks</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <TextField label="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleCreateTask}>Create Task</Button>
      </Box>
      {tasks && tasks.length > 0 ? ( tasks.map((task) => (
      <Card key={task.id} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{task.title}</Typography>
          <Typography>{task.description}</Typography>
            <Box display="flex" gap={2}>
              <Select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
              >
                <MenuItem value="Backlog">Backlog</MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </Box>
        </CardContent>
      </Card>
      ))) : (<Typography variant="body1">No tasks available.</Typography>)}
    </Box>
  );
};

export default TaskList;
