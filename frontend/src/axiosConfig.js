import axios from "axios";

// Base URL
const baseURL = 'http://localhost:3200/api';

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const protectedInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { instance, protectedInstance };
