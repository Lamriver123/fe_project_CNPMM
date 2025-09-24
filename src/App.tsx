import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { profileApi } from "./api/profileApi.ts";

// admin pages
import DashboardPage from "./pages/Admin/dashboard/DashboardPage.tsx";
import AdminProductsPage from "./pages/Admin/products/AdminProductsPage.tsx";
import AdminOrdersPage from "./pages/Admin/orders/AdminOrdersPage.tsx";

//import AdminReportsPage from "./pages/Admin/reports/AdminReportsPage.tsx";
import AdminUsersPage from "./pages/Admin/users/AdminUsersPage.tsx";

// layouts
import ClientLayout from "./components/layout/ClientLayout.tsx";
import AdminLayout from "./components/layout/Admin/AdminLayout.tsx";

import Body from "./components/layout/Body.tsx";
import Footer from "./components/layout/Footer.tsx";
import Header from "./components/layout/Header.tsx";
import Navbar from "./components/layout/Navbar.tsx";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import HomePage from "./pages/auth/HomePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage.tsx";
import CartPage from "./pages/cart/CartPage.tsx";
import OrdersPage from "./pages/Order/OrdersPage.tsx";
import CategoryPage from "./pages/products/CategoryPage.tsx";
import ProductDetailPage from "./pages/products/ProductDetailPage.tsx";
import ProductsPage from "./pages/products/ProductsPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import { setToken, updateUser } from "./redux/authSlice.ts";
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
      <Routes>
        {/* Client */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          {/* <Route path="reports" element={<AdminReportsPage />} /> */}
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );


  // return (
  //   <BrowserRouter>
  //     <Header />
  //     <Navbar />
  //     <Body>
  //       <Routes>
  //         <Route path="/" element={<Navigate to="/home" />} />
  //         <Route path="/home" element={<HomePage />} />
  //         <Route path="/login" element={<LoginPage />} />
  //         <Route path="/register" element={<RegisterPage />} />
  //         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  //         <Route path="/verify-otp" element={<VerifyOtpPage />} />
  //         <Route path="/products" element={<ProductsPage />} />
  //         <Route path="/products/:slug" element={<ProductDetailPage />} />

  //         <Route path="/category/:slug" element={<CategoryPage />} />
  //         <Route path="/profile" element={<ProfilePage />} />

  //         <Route path="/orders" element={<OrdersPage />} />
  //         <Route path="/cart" element={<CartPage />} />
  //       </Routes>
  //     </Body>
  //     <Footer />
  //   </BrowserRouter>
  // );
}
