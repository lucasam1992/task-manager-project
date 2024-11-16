import api from './Api';
import { Task, TaskData } from '../Interfaces/Task';

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (taskData: TaskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id: number, task: Task['status']) => {
  const response = await api.patch(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
