import React, { useState } from "react";
import "./AdminUsersPage.css";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: "U001",
    fullName: "Nguyễn Văn A",
    email: "a.nguyen@example.com",
    phone: "0901234567",
    role: "USER",
    isActive: true,
    createdAt: "2025-01-10",
  },
  {
    id: "U002",
    fullName: "Trần Thị B",
    email: "b.tran@example.com",
    phone: "0912345678",
    role: "ADMIN",
    isActive: true,
    createdAt: "2025-02-20",
  },
  {
    id: "U003",
    fullName: "Lê Văn C",
    email: "c.le@example.com",
    phone: "0987654321",
    role: "USER",
    isActive: false,
    createdAt: "2025-03-15",
  },
];

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  const deleteUser = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa user này?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="admin-users">
      <h2>Quản lý người dùng</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <span
                  className={`role-badge ${
                    u.role === "ADMIN" ? "admin" : "user"
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td>{u.createdAt}</td>
              <td>
                <span
                  className={`status-badge ${
                    u.isActive ? "active" : "inactive"
                  }`}
                >
                  {u.isActive ? "Hoạt động" : "Đã khóa"}
                </span>
              </td>
              <td className="actions">
                <button
                  className="btn small primary"
                  onClick={() => toggleActive(u.id)}
                >
                  {u.isActive ? "Khóa" : "Mở khóa"}
                </button>
                <button
                  className="btn small danger"
                  onClick={() => deleteUser(u.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", color: "#777" }}>
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
