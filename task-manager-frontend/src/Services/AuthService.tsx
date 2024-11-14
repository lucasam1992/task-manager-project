import api from './Api';
import { LoginData } from '../Interfaces/Auth';
import { RegisterData } from '../Interfaces/Auth';

export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', data);
  localStorage.setItem('token', response.data.access_token);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
