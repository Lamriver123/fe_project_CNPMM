import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordField from "../../components/forms/PasswordField.tsx";
import AuthCard from "../../components/layout/AuthCard.tsx";
import "../../components/layout/Auth.css";
import TextField from "../../components/forms/TextField.tsx";

export default function LoginPage() {
  const [form, setForm] = useState({ email:"",repassword: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login demo:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div className="auth-page">
      <AuthCard className="auth-card">
        {/* Header */}
        <h3 className="text-center mb-1 auth-title">
          Reset Password
        </h3>

        {/* Subtitle */}
        {/* <p className="text-center auth-subtitle mb-4">
          If you have an account, sign in with your username or email address.
        </p> */}

        {/* Form */}
        <form onSubmit={submit}>
          
          <label className="form-label fw-semibold">
                Email *
            </label>
            <TextField
                label="Username or email address *"
                name="email"
                value={form.email}
                onChange={handleChange}
            />

          <label className="form-label fw-semibold">
            Password *
          </label>
          <PasswordField
            label="Password *"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label className="form-label fw-semibold">
            Re-password *
          </label>
          <PasswordField
            label="Pe-password *"
            name="repassword"
            value={form.repassword}
            onChange={handleChange}
          />

          

          <button className="btn btn-purple w-100" type="submit">
            Reset
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
