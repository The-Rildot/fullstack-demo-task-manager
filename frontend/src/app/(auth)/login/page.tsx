"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../features/auth/authService";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Card from "../../../components/Card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login(email, password);
      localStorage.setItem("token", res.access_token);
      router.push("/tasks");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Card>
  );
}