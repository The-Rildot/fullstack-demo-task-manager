import { api } from "../../services/api";

export const register = async (email: string, password: string) => {
  const res = await api.post("/users", { email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};