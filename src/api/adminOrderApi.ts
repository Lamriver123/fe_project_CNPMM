import axiosClient from "./axiosClient.ts";
import { Order } from "../types/Order.ts";

export const adminOrderApi = {
  // Lấy danh sách đơn hàng
  getOrders: async (status?: string, isDelivered?: boolean) => {
    const params: any = {};
    if (status) params.status = status;
    if (isDelivered !== undefined) params.isDelivered = isDelivered;

    const res = await axiosClient.get<{ data: { orders: Order[] } }>(
      "/admin/orders",
      { params }
    );
    return res.data.data.orders;
  },

  // Cập nhật trạng thái đơn hàng
  updateStatus: async (orderId: string, newStatusOrder: string) => {
    const res = await axiosClient.put<{ data: Order }>(
      `/admin/orders/${orderId}/status`,
      { newStatusOrder }
    );
    return res.data;
  },
};
