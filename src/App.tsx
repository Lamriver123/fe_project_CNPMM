import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Body from "./components/layout/Body.tsx";
import Footer from "./components/layout/Footer.tsx";
import Header from "./components/layout/Header.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import HomePage from "./pages/auth/HomePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage.tsx";
import CategoryPage from "./pages/products/CategoryPage.tsx";
import ProductDetailPage from "./pages/products/ProductDetailPage.tsx";
import ProductsPage from "./pages/products/ProductsPage.tsx";

export default function App() {
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
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Body>
      <Footer />
    </BrowserRouter>
  );
}
