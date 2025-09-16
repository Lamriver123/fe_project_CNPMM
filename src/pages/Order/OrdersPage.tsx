import React, { useEffect, useState } from "react";
import { orderApi } from "../../api/orderApi.ts";
import { Order } from "../../types/Order";
import { toast } from "react-toastify";
import "./OrdersPage.css";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled";

const statusText: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  preparing: "Chuẩn bị hàng",
  delivering: "Đang giao",
  delivered: "Hoàn thành",
  cancelled: "Đã hủy",
};

// key dùng cho UI, filter gửi API
const tabOptions: { key: string; label: string; apiStatus?: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "new", label: "Chờ xác nhận", apiStatus: "pending" },
  { key: "preparing", label: "Chuẩn bị hàng", apiStatus: "preparing" },
  { key: "delivering", label: "Đang giao", apiStatus: "delivering" },
  { key: "completed", label: "Hoàn thành", apiStatus: "delivered" },
  { key: "cancelled", label: "Đã hủy", apiStatus: "cancelled" },
];

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gọi API mỗi khi đổi tab
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const tab = tabOptions.find((t) => t.key === activeTab);
        const statusParam = tab?.apiStatus;
        const res = await orderApi.getOrder(statusParam);
        setOrders(res.data.orders);
      } catch (err: any) {
        console.error(err);
        setError("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [activeTab]);

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    try {
      toast.info(currentStatus);
      await orderApi.updateStatus(orderId, currentStatus);
      toast.success("Cập nhật đơn hàng thành công!");
      const res = await orderApi.getOrder(currentStatus);
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };
  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  if (loading) {
    return <div className="orders-page">Đang tải đơn hàng...</div>;
  }
  if (error) {
    return (
      <div className="orders-page">
        <p>{error}</p>
        <button onClick={() => setActiveTab(activeTab)}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>Đơn hàng của tôi</h2>

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

      {/* Danh sách đơn hàng */}
      <div className="order-list">
        {orders.length === 0 ? (
          <p className="empty-text">Chưa có đơn hàng nào.</p>
        ) : (
          orders.map((order) => {
            const isExpanded = expandedOrders.includes(order._id);
            const showSeeMore = order.items.length > 1;

            return (
              <div className="order-card" key={order._id}>
                <div className="order-header">
                  <span>Mã đơn: {order._id}</span>
                  <span className={`status ${order.statusOrder?.toLowerCase()}`}>
                    {statusText[order.statusOrder as OrderStatus] || order.statusOrder}
                  </span>
                </div>

                <div className="order-items">
                  {(isExpanded ? order.items : order.items.slice(0, 1)).map(
                    (item, index) => (
                      <div className="order-item" key={index}>
                        <img src={item.product.images[0]?.url} alt={item.product.name} />
                        <div className="item-info">
                          <p className="name">{item.product.name}</p>
                          <p className="qty">Số lượng: {item.quantity}</p>
                          <p className="price">
                            {(item.product.price * item.quantity).toLocaleString()} đ
                          </p>
                          {order.statusOrder === "delivered" && (
                            <div className="item-actions">
                              {!item.isCommented && (
                                <button
                                  className="btn btn-warning btn-sm me-2 bg-opacity-25 hover-bg-opacity-50"
                                  style={{ backgroundColor: 'rgba(255,193,7,0.25)', borderColor: '#ffc107', color: '#856404' }}
                                >
                                  <i className="bi bi-star me-1"></i>
                                  Đánh giá
                                </button>
                              )}
                              <button
                                className="btn btn-success btn-sm bg-opacity-25 hover-bg-opacity-50"
                                style={{ backgroundColor: 'rgba(25,135,84,0.25)', borderColor: '#198754', color: '#0f5132' }}
                              >
                                <i className="bi bi-bag-plus me-1"></i>
                                Mua lại
                              </button>
                            </div>
                          )}

                          {order.statusOrder === "cancelled" && (
                            <div className="item-actions">
                              <button
                                className="btn btn-secondary btn-sm bg-opacity-25 hover-bg-opacity-50"
                                style={{ backgroundColor: 'rgba(108,117,125,0.25)', borderColor: '#6c757d', color: '#41464b' }}
                              >
                                <i className="bi bi-arrow-clockwise me-1"></i>
                                Mua lại
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                  {showSeeMore && (
                    <button
                      className="see-more-btn"
                      onClick={() => toggleExpand(order._id)}
                    >
                      {isExpanded ? "Thu gọn" : "Xem thêm"}
                    </button>
                  )}
                </div>

                <div className="order-footer">
                  <span>
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="total">
                    Tổng: {order.totalPrice.toLocaleString()} đ
                  </span>
                </div>

                <div className="order-actions">
                  {order.statusOrder === "delivering" && order.isDelivered === true && (
                    <button className="btn primary"
                    onClick={() => handleUpdateStatus(order._id, order.statusOrder)}>Đã nhận hàng</button>
                  )}
                  {(order.statusOrder === "pending" && 
                    <button className="btn danger"
                    onClick={() => handleUpdateStatus(order._id, order.statusOrder)}
                    >Hủy đơn hàng</button>
                  )}
                  
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
