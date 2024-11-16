import api from './Api';
import { UserProfile } from '../Interfaces/User';

export const fetchUserProfile = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const updateUserProfile = async (id: number, data: Partial<UserProfile>) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async () => {
  await api.delete('/users/me');
};
