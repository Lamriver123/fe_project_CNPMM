// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice.ts";
import type { RootState } from "../../redux/store.ts";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  // Debug: Log Redux state
  console.log("Navbar - Redux state:", { user, token });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <nav className="uts-navbar">
      <div className="uts-container">
        {/* Logo */}
        <Link className="uts-logo" to="/">
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="uts-logo-img"
          />
          <span className="uts-logo-text">UTEShop</span>
        </Link>

        {/* Menu */}
        <ul className="uts-navlinks">
          <li>
            <Link to="/home">Trang chủ</Link>
          </li>
          <li>
            <Link to="/products">Sản phẩm</Link>
          </li>
          <li>
            <Link to="/about">Giới thiệu</Link>
          </li>
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
        </ul>

        {/* Search bar */}
        <div className="uts-search">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, danh mục hoặc thương hiệu..."
            aria-label="Search products"
          />
          <button aria-label="Search">
            <i className="bi bi-search"></i>
          </button>
        </div>

        {/* Actions */}
        <div className="uts-actions">
          {/* Wishlist */}
          <button className="uts-icon-btn" aria-label="Wishlist">
            <i className="bi bi-heart"></i>
          </button>

          {/* Cart */}
          <button className="uts-icon-btn position-relative" aria-label="Cart">
            <i className="bi bi-cart"></i>
            <span className="uts-badge">2</span>
          </button>

          {/* Auth buttons or User info */}
          {token && user ? (
            <div className="uts-user-info">
              <span className="uts-username">
                Xin chào, {user.fullName || user.username || user.email}
              </span>
              <button
                className="uts-btn uts-btn-logout"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <button
                className="uts-btn uts-btn-login"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
              <button
                className="uts-btn uts-btn-signup"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
