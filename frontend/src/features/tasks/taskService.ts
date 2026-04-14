import { api } from "../../services/api";

export type TaskUpdate = {
  title?: string;
  completed?: boolean;
};

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (title: string) => {
  const res = await api.post("/tasks", { title });
  return res.data;
};

export const updateTask = async (id: number, data: TaskUpdate) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
 