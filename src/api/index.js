import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const signup = (formData) => API.post("/api/v1/user/signup", formData);
export const login = (formData) => API.post("/api/v1/user/login", formData);
