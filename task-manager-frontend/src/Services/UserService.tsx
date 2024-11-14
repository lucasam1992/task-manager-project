import api from './Api';
import { UserProfile } from '../Interfaces/User';

export const fetchUserProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateUserProfile = async (data: Partial<UserProfile>) => {
  const response = await api.put('/users/me', data);
  return response.data;
};

export const deleteUser = async () => {
  await api.delete('/users/me');
};
