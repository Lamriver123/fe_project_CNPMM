import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage.tsx";
import HomePage from "./pages/auth/HomePage.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";
import Body from "./components/layout/Body.tsx";
import ProductsPage from "./pages/products/ProductsPage.tsx";
import ProductDetailPage from "./pages/products/ProductDetailPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import { setToken, updateUser } from "./redux/authSlice.ts";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const user = localStorage.getItem("user");
    if (token) {
      dispatch(setToken({ token, refreshToken: refreshToken ?? undefined }));
    }
    if (user) {
      dispatch(updateUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Body>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Body>
      <Footer />
    </BrowserRouter>
  );
}
