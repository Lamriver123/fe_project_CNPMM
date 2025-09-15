// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice.ts";
import type { RootState } from "../../redux/store.ts";
import "./Navbar.css";
import { useCart } from "../../hooks/useCart.ts";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();

  // Đóng khi người dùng click ra ngoài Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    setIsDropdownOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { data } = cart || { data: { items: [], totalItems: 0, totalPrice: 0 } };
  const { totalItems } = data;

  return (
    <nav className="uts-navbar">
      <div className="uts-container">
        {/* Logo */}
        <Link className="uts-logo" to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFQ3JyNU4iAPI5aWf4ND9BL-7a0ijt0CeKTw&s"
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
          <button className="uts-icon-btn position-relative" aria-label="Cart" onClick={handleCartClick}>
            <i className="bi bi-cart"></i>
            <span className="uts-badge">{totalItems}</span>
          </button>

          {/* Auth buttons or User info */}
          {token && user ? (
            <div className="uts-user-info" ref={dropdownRef}>
              <div className="uts-user-dropdown">
                <span className="uts-username" onClick={toggleDropdown}>
                  Xin chào, {user.fullName}
                  <i className={`bi bi-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
                </span>
                {isDropdownOpen && (
                  <div className="uts-dropdown-menu">
                    <div className="uts-dropdown-item" onClick={handleProfileClick}>
                      <i className="bi bi-person"></i>
                      <span>Profile</span>
                    </div>
                    <div className="uts-dropdown-item" onClick={handleOrdersClick}>
                      <i className="bi bi-bag"></i>
                      <span>Đơn hàng của tôi</span>
                    </div>
                    <div className="uts-dropdown-divider"></div>
                    <div className="uts-dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
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
    </nav >
  );
};

export default Navbar;
