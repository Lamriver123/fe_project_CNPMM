import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../components/forms/TextField.tsx";
import PasswordField from "../../components/forms/PasswordField.tsx";
import DateField from "../../components/forms/DateField.tsx";
import AuthCard from "../../components/layout/AuthCard.tsx";
import "../../components/layout/Auth.css";

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    dateOfBirth: "",
    gender: "male",
    address: "",
    role: "customer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: sau khi "đăng ký", chuyển qua trang nhập OTP
    nav("/verify-otp?email=" + encodeURIComponent(form.email));
  };

  return (
    <div className="auth-page">
      <AuthCard className="auth-card">
        {/* Header */}
        <h3 className="text-center mb-1 auth-title">
          <Link to="/login" className="inactive">Login</Link>
          {" | "}<span className="active">Register</span>
        </h3>
        {/* Subtitle */}
        <p className="text-center auth-subtitle mb-4">
          Create a new account to start shopping and selling with us.
        </p>

        {/* Form */}
        <form onSubmit={submit}>
          <TextField
            label="Full Name *"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Username *"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <div className="row">
            {/* Date of Birth */}
            <div className="col-md-6">
              <label className="form-label fw-semibold mb-1" htmlFor="dateOfBirth">
                Date of Birth *
              </label>
              <DateField
                label="Date of Birth"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange as any}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label fw-semibold d-block">Gender</label>
              <div className="d-flex gap-4 align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="genderMale"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="genderFemale"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>

          <TextField
            label="Email address *"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            label="Address *"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <PasswordField
            label="Password *"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <PasswordField
            label="Re-password *"
            name="repassword"
            value={form.repassword}
            onChange={handleChange}
          />

          <button className="btn btn-purple w-100" type="submit">
            Register
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
