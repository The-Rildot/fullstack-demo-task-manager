"use client";

import { useEffect, useState } from "react";
import { getTasks, createTask } from "../../features/tasks/taskService";
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

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

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

    const handleCreate = async () => {
        if (!title) return;

        await createTask(title);
        setTitle("");
        loadTasks();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

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

            <div className="mt-4 space-y-3">
                {tasks.map((t) => (
                    <Card key={t.id}>
                        <div className="flex justify-between">
                            <span>{t.title}</span>
                            <span className="text-sm text-black">
                                {t.completed ? "Done" : "Pending"}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}