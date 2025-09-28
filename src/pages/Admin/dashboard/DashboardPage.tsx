import { useEffect, useState } from "react";
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
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getRevenueStats } from "../../../api/adminApis.ts";
import "./DashboardPage.css";

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
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");

  // const [year, setYear] = useState("2025");
  // const [month, setMonth] = useState("1");
  const [chartData, setChartData] = useState<RevenueStat[]>([]);
  const [summary, setSummary] = useState<Summary>({
    revenue: "0VND",
    orders: 0,
    users: 0,
    growth: "+0%",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // // Lấy khoảng thời gian theo year
        // const from = `${year}-01-01`;
        // const to = `${year}-12-31`;

        const res = await getRevenueStats(from, to, "month");
        console.log(res);
    
          const apiData: RevenueStat[] = res.map((d: RevenueApiResponse) => {
            console.log(d);
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

          // Tổng hợp cho stat card
          const totalRevenue = apiData.reduce((sum, d) => sum + d.revenue, 0);
          const totalOrders = apiData.reduce((sum, d) => sum + d.orders, 0);

          setSummary({
            revenue: `$${totalRevenue.toLocaleString()} VND`,
            orders: totalOrders,
            users: 560,
            growth: "+15%",
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
        <StatCard icon={FiUsers} title="Người dùng" value={summary.users} color="purple" />
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
    </div>
  );
}
