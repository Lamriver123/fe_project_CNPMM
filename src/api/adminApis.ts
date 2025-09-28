import axiosClient from "./axiosClient.ts";


export const getRevenueStats = async (
  from: string,
  to: string,
  groupBy: "day" | "month"
) => {
  const res = await axiosClient.get(`/admin/stats/revenue`, {
    params: { from, to, groupBy },
  });
  return res.data;
};
