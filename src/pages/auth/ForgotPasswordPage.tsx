import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordField from "../../components/forms/PasswordField.tsx";
import AuthCard from "../../components/layout/AuthCard.tsx";
import "../../components/layout/Auth.css";
import TextField from "../../components/forms/TextField.tsx";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "", repassword: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reset demo:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div className="auth-page">
      <AuthCard className="auth-card">
        {/* Header */}
        <h3 className="text-center mb-1 auth-title">Reset Password</h3>

        {/* Subtitle */}
        <p className="text-center auth-subtitle mb-4">
          Enter your email and new password.
        </p>

        {/* Form */}
        <form onSubmit={submit}>
          <label className="form-label fw-semibold">Email *</label>
          <TextField
            label="Email address *"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label className="form-label fw-semibold">New password *</label>
          <PasswordField
            label="New password *"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label className="form-label fw-semibold">Confirm password *</label>
          <PasswordField
            label="Confirm password *"
            name="repassword"
            value={form.repassword}
            onChange={handleChange}
          />

          <button className="btn btn-purple w-100" type="submit">
            Reset
          </button>

          <div className="text-center mt-3">
            <Link to="/login" className="forgot-link">Back to login</Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
