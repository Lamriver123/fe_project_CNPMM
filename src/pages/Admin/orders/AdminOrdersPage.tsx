import React, { useEffect, useState } from "react";
import { adminOrderApi } from "../../../api/adminOrderApi.ts";
import { Order } from "../../../types/Order";
import AdminOrderCard from "../../../components/order/adminOrderCard.tsx";
import "./AdminOrdersPage.css";

const tabOptions = [
  { key: "all", label: "Tất cả" },
  { key: "new", label: "Chờ xác nhận", filter: ["NEW"] },
  { key: "preparing", label: "Chuẩn bị hàng", filter: ["PREPARING"] },
  { key: "delivering", label: "Đang giao", filter: ["DELIVERING"] },
  { key: "delivered", label: "Đã giao", filter: ["DELIVERED"] },
  { key: "completed", label: "Hoàn thành", filter: ["COMPLETED"] },
  { key: "cancelled", label: "Đã hủy", filter: ["CANCELLED"] },
];

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await adminOrderApi.getOrders();
      setOrders(res);
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    await adminOrderApi.updateStatus(id, newStatus);
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, statusOrder: newStatus } : o
      )
    );
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((o) =>
          tabOptions.find((t) => t.key === activeTab)?.filter?.includes(o.statusOrder)
        );

  return (
    <div className="orders-page">
      <h2>Quản lý đơn hàng</h2>

      {/* Tabs */}
      <div className="order-tabs">
        {tabOptions.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="order-list">
        {filteredOrders.length === 0 ? (
          <p className="empty-text">Không có đơn hàng.</p>
        ) : (
          filteredOrders.map((order) => (
            <AdminOrderCard
              key={order._id}
              order={order}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
