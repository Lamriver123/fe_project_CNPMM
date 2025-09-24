import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice.ts";
import type { RootState } from "../../../redux/store.ts";
import "./AdminNavbar.css";

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-container">
        {/* Logo */}
        <Link to="/admin/dashboard" className="admin-logo">
          <span>UTEShop Admin</span>
        </Link>

        {/* Menu */}
        <ul className="admin-navlinks">
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/reports">Reports</Link>
          </li>
        </ul>

        {/* User */}
        {token && user ? (
          <div className="admin-user" ref={dropdownRef}>
            <span className="admin-username" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {user.fullName}
              <i className={`bi bi-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
            </span>
            {isDropdownOpen && (
              <div className="admin-dropdown">
                <div className="admin-dropdown-item" onClick={() => navigate("/profile")}>
                  <i className="bi bi-person"></i> Profile
                </div>
                <div className="admin-dropdown-divider"></div>
                <div className="admin-dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default AdminNavbar;
