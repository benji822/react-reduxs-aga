import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("http://localhost:5000/users");

export const createUserApi = async (user) =>
  await axios.post("http://localhost:5000/users", user);

export const deleteUserApi = async (userId) =>
  await axios.delete(`http://localhost:5000/users/${userId}`);

export const updateUserApi = async (userId, userinfo) =>
  await axios.put(`http://localhost:5000/users/${userId}`, userinfo);

export const searchUserApi = async (query) =>
  await axios.get(`http://localhost:5000/users?q=${query}`);

export const filterUserApi = async (value) =>
  await axios.get(`http://localhost:5000/users?status=${value}`);

export const sortUserApi = async (value) =>
  await axios.get(`http://localhost:5000/users?_sort=${value}&_order=asc`);
