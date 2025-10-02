import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import "./AdminHeader.css";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // TODO: xóa token / clear localStorage rồi redirect về trang login
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAdmin");
    }
    window.location.href = "/login";
  };

  return (
    <header className="admin-header">
      {/* Slogan */}
      <div className="slogan">
        <h2>✨ Quản trị dễ dàng, vận hành hiệu quả ✨</h2>
      </div>

      {/* Actions */}
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <div className="avatar-wrapper">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="avatar"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="dropdown-menu1">
              <button className="dropdown-item1" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
