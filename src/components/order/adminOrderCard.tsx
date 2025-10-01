import React from "react";
import { Order } from "../../types/Order.ts";
import "./adminOrderCard.css";

type Props = {
  order: Order;
  onUpdateStatus: (id: string, newStatus: string) => void;
};

const statusText: Record<string, string> = {
  NEW: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PREPARING: "Chuẩn bị hàng",
  DELIVERING: "Đang giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

const adminOrderCard: React.FC<Props> = ({ order, onUpdateStatus }) => {
  return (
    <div className="order-card">
      {/* Header */}
      <div className="order-header">
        <span>Mã đơn: {order._id}</span>
        <span className={`status ${order.statusOrder?.toLowerCase()}`}>
          {statusText[order.statusOrder] || order.statusOrder}
        </span>
      </div>

      {/* Buyer */}
      <div className="buyer-info">
        <p><b>Khách hàng:</b> {order.user.username}</p>
        <p><b>Email:</b> {order.user.email}</p>
      </div>

      {/* Items */}
      <div className="order-items">
        {order.items.map((item) => (
          <div className="order-item" key={item._id}>
            <img src={item.product.images[0]?.url} alt={item.product.name} />
            <div className="item-info">
              <p className="name">{item.product.name}</p>
              <p>Số lượng: {item.quantity}</p>
              <p className="price">
                {(item.product.price * item.quantity).toLocaleString()} đ
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="order-footer">
        <span>Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}</span>
        <span className="total">
          Tổng: {order.totalPrice.toLocaleString()} đ
        </span>
      </div>

      {/* Actions */}
      <div className="order-actions">
        {order.statusOrder === "NEW" && (
          <>
            <button
              className="btn primary"
              onClick={() => onUpdateStatus(order._id, "CONFIRMED")}
            >
              Duyệt đơn
            </button>
            <button
              className="btn danger"
              onClick={() => onUpdateStatus(order._id, "CANCELLED")}
            >
              Hủy đơn
            </button>
          </>
        )}

        {order.statusOrder === "CONFIRMED" && (
          <button
            className="btn primary"
            onClick={() => onUpdateStatus(order._id, "PREPARING")}
          >
            Chuyển sang chuẩn bị
          </button>
        )}

        {order.statusOrder === "PREPARING" && (
          <button
            className="btn primary"
            onClick={() => onUpdateStatus(order._id, "DELIVERING")}
          >
            Giao hàng
          </button>
        )}

        {order.statusOrder === "DELIVERING" && (
          <button
            className="btn primary"
            onClick={() => onUpdateStatus(order._id, "COMPLETED")}
          >
            Hoàn thành
          </button>
        )}
      </div>
    </div>
  );
};

export default adminOrderCard;
