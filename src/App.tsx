<<<<<<< HEAD
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Body from "./components/layout/Body.tsx";
import Footer from "./components/layout/Footer.tsx";
import Header from "./components/layout/Header.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import HomePage from "./pages/auth/HomePage.tsx";
=======
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> 0c8b5585ab47bf03fafcbd47f767e35d438dfb0b
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage.tsx";
import CategoryPage from "./pages/products/CategoryPage.tsx";
import ProductDetailPage from "./pages/products/ProductDetailPage.tsx";
<<<<<<< HEAD
import ProductsPage from "./pages/products/ProductsPage.tsx";
=======
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import { setToken, updateUser } from "./redux/authSlice.ts";
import { useDispatch } from "react-redux";
import { profileApi } from "./api/profileApi.ts";
>>>>>>> 0c8b5585ab47bf03fafcbd47f767e35d438dfb0b

export default function App() {
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (token) {
          dispatch(setToken({ token, refreshToken: refreshToken ?? undefined }));
        }

        // Gọi API lấy thông tin user
        const response = await profileApi.getProfile();
        if (response?.data) {
          dispatch(updateUser(response.data));
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchProfile();
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
<<<<<<< HEAD
          <Route path="/category/:category" element={<CategoryPage />} />
=======
          <Route path="/profile" element={<ProfilePage />} />
>>>>>>> 0c8b5585ab47bf03fafcbd47f767e35d438dfb0b
        </Routes>
      </Body>
      <Footer />
    </BrowserRouter>
  );
}
