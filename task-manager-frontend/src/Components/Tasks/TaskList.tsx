import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Box, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { Task } from '../../Interfaces/Task';
import { TaskListProps } from '../../Interfaces/Task';


const TaskList: React.FC<TaskListProps> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; description: string }>({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>('/api/tasks', { headers: { Authorization: `Bearer ${token}` } });
    setTasks(response.data);
  };

  const handleCreateTask = async () => {
    await axios.post('/api/tasks', newTask, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  const handleStatusChange = async (id: number, status: Task['status']) => {
    await axios.patch(`/api/tasks/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  return (
    <Box>
      <Typography variant="h5">My Tasks</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <TextField label="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleCreateTask}>Create Task</Button>
      </Box>
      {tasks.map(task => (
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
      ))}
    </Box>
  );
};

export default TaskList;
