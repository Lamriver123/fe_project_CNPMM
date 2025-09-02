export interface Product {
  id: number;
  name: string;
  price: number;              // Giá bán thực tế
  originalPrice?: number;     // Giá gốc (nếu có khuyến mãi)
  discountPercent?: number;   // % khuyến mãi
  images: string[];       // Danh sách URL hình ảnh
  category: string;

  // Dùng cho lọc/sắp xếp
  isNew?: boolean;            // Sản phẩm mới
  isHot?: boolean;            // Sản phẩm bán chạy
  createdAt: number;          // Ngày thêm sản phẩm
  sold: number;              // Số lượng đã bán
  views: number;             // Số lượt xem
  stock: number;            // Số lượng trong kho
}
