import axios from 'axios';
import Cookies from 'js-cookie';
let URL = 'http://localhost:5001/api/users/';

const register = async (userData) => {
  try {
    const response = await axios.post(URL, userData);

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    Cookies.set('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(URL + 'login', userData);

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    Cookies.set('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

const logout = async () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    Cookies.remove('user');
  } catch (error) {
    throw error.message;
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;