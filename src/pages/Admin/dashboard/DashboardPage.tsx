import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import "./DashboardPage.css";

const data = [
  { month: "Jan", revenue: 4000, orders: 240, users: 80 },
  { month: "Feb", revenue: 3000, orders: 221, users: 75 },
  { month: "Mar", revenue: 5000, orders: 229, users: 90 },
  { month: "Apr", revenue: 4780, orders: 200, users: 88 },
  { month: "May", revenue: 5890, orders: 218, users: 110 },
  { month: "Jun", revenue: 6390, orders: 250, users: 130 },
  { month: "Jul", revenue: 7490, orders: 300, users: 150 },
  { month: "Aug", revenue: 4000, orders: 240, users: 80 },
  { month: "Sep", revenue: 3000, orders: 221, users: 75 },
  { month: "Oct", revenue: 5000, orders: 229, users: 90 },
  { month: "Nov", revenue: 4780, orders: 200, users: 88 },
  { month: "Dec", revenue: 5890, orders: 218, users: 110 },
];

const StatCard = ({ icon: Icon, title, value, color }: any) => (
  <div className="stat-card">
    <div className={`stat-icon ${color}`}>
      <Icon className="icon" />
    </div>
    <div className="stat-info">
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  </div>
);

export default function DashboardPage() {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("all");

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">📊 Dashboard</h2>
        <div className="dashboard-filters">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="dashboard-select"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="dashboard-select"
          >
            <option value="all">Tất cả</option>
            <option value="1">Tháng 1</option>
            <option value="2">Tháng 2</option>
            <option value="3">Tháng 3</option>
            <option value="4">Tháng 4</option>
            <option value="5">Tháng 5</option>
            <option value="6">Tháng 6</option>
            <option value="7">Tháng 7</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard icon={FiDollarSign} title="Doanh thu" value="$58,947" color="green" />
        <StatCard icon={FiShoppingCart} title="Đơn hàng" value="1,230" color="blue" />
        <StatCard icon={FiUsers} title="Người dùng" value="560" color="purple" />
        <StatCard icon={FiTrendingUp} title="Tăng trưởng" value="+15%" color="orange" />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-box">
          <h3 className="chart-title">Doanh thu theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#34d399" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3 className="chart-title">Đơn hàng & Người dùng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" name="Đơn hàng" />
              <Line type="monotone" dataKey="users" stroke="#a855f7" name="Người dùng mới" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
