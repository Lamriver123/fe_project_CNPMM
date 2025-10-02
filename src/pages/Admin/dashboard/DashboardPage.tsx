import { useEffect, useState } from "react";
import { Product } from "../../../types/Product.ts";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { get10BestSellerProducts, getNewUsers, getRevenueStats } from "../../../api/adminApis.ts";
import "./DashboardPage.css";
import axiosClient from "../../../api/axiosClient.ts";

interface RevenueStat {
  month: string;
  revenue: number;
  orders: number;
}

interface Summary {
  revenue: string; // đã format sang $xx,xxx
  orders: number;
  users: number;
  growth: string; // ví dụ "+15%"
}

interface RevenueApiResponse {
  date: string;   // backend trả "2025-09"
  revenue: number;
  orders: number;
}

interface NewUserApiResponse {
  date: string,
  users: number
}

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
  
  const navigate = useNavigate();
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");
  const [userData, setUserData] = useState<{ date: string; users: number }[]>([]);
  const [chartData, setChartData] = useState<RevenueStat[]>([]);
  const [summary, setSummary] = useState<Summary>({
    revenue: "0VND",
    orders: 0,
    users: 0,
    growth: "+0%",
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topSoldProducts = await get10BestSellerProducts(); // trả về Product[]
        setProducts(topSoldProducts);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
  const fetchData = async () => {
    try {
      // Gọi 2 API song song
      const [revenueRes, usersRes] = await Promise.all([
        getRevenueStats(from, to, "month"),
        getNewUsers(from, to, "month"),
        ]);

        // Format revenue data
        const apiData: RevenueStat[] = revenueRes.map((d: RevenueApiResponse) => {
          const monthIndex = parseInt(d.date.split("-")[1]) - 1;
          const monthNames = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
          ];
          return {
            month: monthNames[monthIndex],
            revenue: d.revenue,
            orders: d.orders,
          };
        });
        setChartData(apiData);

        // Format user data
        const usersApiData : NewUserApiResponse[] = usersRes.map((d: NewUserApiResponse) => {
          return {
            date: d.date,
            users: d.users,
          };
        });
        setUserData(usersApiData);

        // Tổng hợp stat card
        const totalRevenue = apiData.reduce((sum, d) => sum + d.revenue, 0);
        const totalOrders = apiData.reduce((sum, d) => sum + d.orders, 0);
        const totalUsers = usersApiData.reduce((sum, d) => sum + d.users, 0);

        setSummary({
          revenue: `${totalRevenue.toLocaleString()} VND`,
          orders: totalOrders,
          users: totalUsers,
          growth: "+15%", // TODO: có thể tính growth nếu cần
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [from, to]);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">📊 Dashboard</h2>
        <div className="dashboard-filters">
  <label>
    📅 Từ ngày:
    <input
      type="date"
      value={from}
      onChange={(e) => setFrom(e.target.value)}
      className="dashboard-input"
    />
  </label>

  <label>
    📅 Đến ngày:
    <input
      type="date"
      value={to}
      onChange={(e) => setTo(e.target.value)}
      className="dashboard-input"
    />
  </label>
</div>

      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard icon={FiDollarSign} title="Doanh thu" value={summary.revenue} color="green" />
        <StatCard icon={FiShoppingCart} title="Đơn hàng" value={summary.orders} color="blue" />
        <StatCard icon={FiUsers} title="Người dùng mới" value={summary.users} color="purple" />
        <StatCard icon={FiTrendingUp} title="Tăng trưởng" value={summary.growth} color="orange" />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-box">
          <h3 className="chart-title">Doanh thu theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
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
          <h3 className="chart-title">Đơn hàng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" name="Đơn hàng" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

        {/* Người dùng mới */}
        <div className="chart-box">
          <h3 className="chart-title">Người dùng mới</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#60a5fa" name="Người dùng mới" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3 className="chart-title">Top 10 sản phẩm bán chạy</h3>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="sold"
              name="Đã bán"
              fill="#f97316"
              // ⬇️ Move the onClick handler to the Bar component
              onClick={(data : Product, index) => {
                // 'data' here is the actual data object (the Product) for the clicked bar
                console.log("Product clicked:", data);
                // Assuming 'data' is of type Product
        
                if (data && data._id) {
                  navigate(`/products/${data._id}`);
                }
              }}
            />
          </BarChart>
        </ResponsiveContainer>
        </div>

        {/* Toast container phải có */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
        

      </div>
  );
}
