import api from './Api';
import { TaskData } from '../Interfaces/Task';


export const fetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (taskData: TaskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id: number, taskData: Partial<TaskData>) => {
  const response = await api.patch(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
