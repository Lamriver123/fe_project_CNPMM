import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../components/forms/TextField.tsx";
import PasswordField from "../../components/forms/PasswordField.tsx";
import AuthCard from "../../components/layout/AuthCard.tsx";
import "../../components/layout/Auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch("/v1/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          username: form.email, // Backend expects 'username' field
          password: form.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid username or password");
        } else if (response.status === 400) {
          setError(data.message || "Please check your input");
        } else {
          setError(data.message || "Login failed");
        }
        return;
      }

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      // Lưu token vào localStorage nếu remember me được chọn
      if (form.remember && data.token) {
        localStorage.setItem('token', data.token);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }

      console.log("Login successful:", data);
      
      // Redirect to dashboard or home page
      navigate("/dashboard");
      
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        setError("Login failed due to network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthCard className="auth-card">
        {/* Header */}
        <h3 className="text-center mb-1 auth-title">
          <span className="active">Login</span>{" | "}
          <Link to="/register" className="inactive">Register</Link>
        </h3>

        {/* Subtitle */}
        <p className="text-center auth-subtitle mb-4">
          If you have an account, sign in with your username or email address.
        </p>

        {/* Form */}
        <form onSubmit={submit}>
          <label className="form-label fw-semibold">Username or Email *</label>
          <TextField
            label="Username or email address *"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <label className="form-label fw-semibold">Password *</label>
          <PasswordField
            label="Password *"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                id="remember"
                className="form-check-input"
                type="checkbox"
                name="remember"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="forgot-link">
              Lost your password?
            </Link>
          </div>

          {error && <div className="text-danger mb-2">{error}</div>}
          <button className="btn btn-purple w-100" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
