import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";
import Body from "./components/layout/Body.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Navbar/>
      <Body>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
        </Routes>
      </Body>
      <Footer/>
    </BrowserRouter>
  );
}
