import { Bell } from "lucide-react";
import "./AdminHeader.css";

export default function AdminHeader() {
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
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="avatar"
        />
      </div>
    </header>
  );
}
