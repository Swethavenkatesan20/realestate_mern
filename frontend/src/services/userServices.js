import { instance, protectedInstance } from '../axiosConfig';

const register = async (email, password, name, location, role) => {
  return instance.post('/users/register', { email, password, name, location, role });
};

const login = async (email, password) => {
  return instance.post('/users/login', { email, password });
};

const logout = async () => {
  return protectedInstance.post('/users/logout');
};

const getUser = async () => {
  return protectedInstance.get('/users/me');
};

export default { register, login, logout, getUser };
