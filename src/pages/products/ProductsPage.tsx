import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product.ts";
import { formatPrice } from "../../utils/format.ts";


const ProductsPage = () => {
  // Dữ liệu giả
  const products: Product[] = [
    { id: 1, name: "Sản phẩm A", price: 100000, image: "/images/product-a.jpg", category: "Điện thoại" },
    { id: 2, name: "Sản phẩm B", price: 150000, image: "/images/product-b.jpg", category: "Laptop" },
    { id: 3, name: "Sản phẩm C", price: 200000, image: "/images/product-c.jpg", category: "Phụ kiện" },
    { id: 4, name: "Sản phẩm D", price: 250000, image: "/images/product-d.jpg", category: "Tablet" },
    { id: 5, name: "Sản phẩm E", price: 300000, image: "/images/product-e.jpg", category: "Tai nghe", isNew: true },
    { id: 6, name: "Sản phẩm F", price: 350000, image: "/images/product-f.jpg", category: "Đồng hồ" },
    { id: 7, name: "Sản phẩm G", price: 400000, image: "/images/product-g.jpg", category: "Loa", isHot: true },
    { id: 8, name: "Sản phẩm H", price: 450000, image: "/images/product-h.jpg", category: "Gaming" },
  ];

  return (
    <ProductsSection
      title="Sản phẩm nổi bật"
      subtitle="Khám phá các sản phẩm mới nhất và được ưa chuộng nhất"
      products={products}
      formatPrice={formatPrice} // Hàm định dạng giá (giả sử giá đã được định dạng sẵn)
    />
  );
};

export default ProductsPage;
