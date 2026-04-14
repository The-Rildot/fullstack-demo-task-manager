"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../../features/auth/authService";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Card from "../../../components/Card";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password);
      router.push("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button onClick={handleRegister}>Register</Button>
    </Card>
  );
}