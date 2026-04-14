"use client";

import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../../features/tasks/taskService";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        const fetchTasks = async () => {
            const data = await getTasks();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleCreate = async () => {
        if (!title) return;

        await createTask(title);
        setTitle("");
        loadTasks();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleEditStart = (task: Task) => {
        setEditingId(task.id);
        setEditValue(task.title);
    };

    const handleEditSave = async (id: number) => {
        await updateTask(id, { title: editValue });
        setEditingId(null);
        loadTasks();
    };

    const handleToggle = async (task: Task) => {
        await updateTask(task.id, { completed: !task.completed });
        loadTasks();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

            {/* Create Task */}
            <Card>
                <div className="flex gap-2">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="New task..."
                    />
                    <Button onClick={handleCreate}>Add</Button>
                </div>
            </Card>

            {/* Task List */}
            <div className="mt-4 space-y-3">
                {tasks.map((t) => (
                    <Card key={t.id}>
                        <div className="flex justify-between items-center gap-2">

                            {/* Left side */}
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => handleToggle(t)}
                                />

                                {editingId === t.id ? (
                                    <Input
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                ) : (
                                    <span
                                        className={t.completed ? "line-through text-gray-400" : ""}
                                    >
                                        {t.title}
                                    </span>
                                )}
                            </div>

                            {/* Right side actions */}
                            <div className="flex gap-2">
                                {editingId === t.id ? (
                                    <Button onClick={() => handleEditSave(t.id)}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleEditStart(t)}>
                                        Edit
                                    </Button>
                                )}

                                <Button onClick={() => handleDelete(t.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}