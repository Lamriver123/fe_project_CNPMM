import React, { useState } from "react";
import OTPInput from "../../components/forms/OTPInput.tsx";
import AuthCard from "../../components/layout/AuthCard.tsx";
import TextField from "../../components/forms/TextField.tsx";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // 6 số OTP

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Nối mảng thành chuỗi "123456"
    console.log("Email:", email, "OTP:", otpCode);
  };

  return (
    <div className="auth-page">
        <AuthCard className="auth-page">
            <h4 className="text-center">Verify OTP</h4>
            <form onSubmit={submit}>
                <TextField
                label="Email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <div className="mb-3">
                <label className="form-label">Enter 6-digit code</label>
                <OTPInput length={6} value={otp} onChange={setOtp} />
                </div>

                <button className="btn btn-purple w-100" type="submit">
                Verify
                </button>
            </form>
        </AuthCard>
    </div>
  );
}
