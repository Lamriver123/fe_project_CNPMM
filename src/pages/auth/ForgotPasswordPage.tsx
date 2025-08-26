import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordField from "../../components/forms/PasswordField.tsx";
import AuthCard from "../../components/layout/AuthCard.tsx";
import "../../components/layout/Auth.css";
import TextField from "../../components/forms/TextField.tsx";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "", repassword: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.repassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/v1/api/forgot-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          email: form.email,
          newPassword: form.password,
          otp: "123456" // This should come from OTP verification step
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setError(data.message || "Invalid request");
        } else {
          setError(data.message || "Password reset failed");
        }
        return;
      }

      if (!data.success) {
        setError(data.message || "Password reset failed");
        return;
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      
    } catch (err: any) {
      console.error("Password reset error:", err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        setError("Password reset failed due to network error");
      }
    } finally {
      setLoading(false);
    }
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
            type="email"
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

          {error && <div className="text-danger mb-2">{error}</div>}
          {success && <div className="text-success mb-2">{success}</div>}

          <button className="btn btn-purple w-100" type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="text-center mt-3">
            <Link to="/login" className="forgot-link">Back to login</Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
