import { api } from "../../services/api";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (title: string) => {
  const res = await api.post("/tasks", { title });
  return res.data;
};