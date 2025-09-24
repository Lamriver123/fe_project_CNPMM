import { Category } from "./Category";

export interface Product {
  _id: string;
  name: string;
  price: number;              // Giá bán thực tế
  originalPrice?: number;     // Giá gốc (nếu có khuyến mãi)
  discountPercent?: number;   // % khuyến mãi
  images: ProductImage[];     // Danh sách URL hình ảnh
  category: Category;
  slug: string;

  description?: string;       // Mô tả sản phẩm
  status?: "available" | "out_of_stock"; // Trạng thái kho

  // Dùng cho lọc/sắp xếp
  isNew?: boolean;            
  isHot?: boolean;            
  createdAt: number;          
  sold: number;               
  views: number;              
  quantity: number;           
}

export interface ProductImage {
  url: string;
  alt?: string;
}


// import { Category } from "./Category";

// export interface Product {
//   _id: string;
//   name: string;
//   price: number;              // Giá bán thực tế
//   originalPrice?: number;     // Giá gốc (nếu có khuyến mãi)
//   discountPercent?: number;   // % khuyến mãi
//   images: ProductImage[];       // Danh sách URL hình ảnh
//   category: Category;
//   slug: string;

//   // Dùng cho lọc/sắp xếp
//   isNew?: boolean;            // Sản phẩm mới
//   isHot?: boolean;            // Sản phẩm bán chạy
//   createdAt: number;          // Ngày thêm sản phẩm
//   sold: number;              // Số lượng đã bán
//   views: number;             // Số lượt xem
//   quantity: number;            // Số lượng trong kho
// }
// export interface ProductImage {
//   url: string;
//   alt?: string;
// }

