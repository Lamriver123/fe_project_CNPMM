import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product.ts";
import { formatPrice } from "../../utils/format.ts";

const ProductsPage = () => {
  // Mock data (bổ sung thêm field: sold, views, discount, createdAt)
const products: Product[] = [
  { 
    id: 1, 
    name: "Sản phẩm A", 
    price: 100000, 
    originalPrice: 120000, 
    discountPercent: 10, 
    image: "/images/product-a.jpg", 
    category: "Điện thoại", 
    sold: 120, 
    views: 500, 
    createdAt: 20240901 
  },
  { 
    id: 2, 
    name: "Sản phẩm B", 
    price: 150000, 
    originalPrice: 150000, 
    discountPercent: 0, 
    image: "/images/product-b.jpg", 
    category: "Laptop", 
    sold: 300, 
    views: 800, 
    createdAt: 20240902 
  },
  { 
    id: 3, 
    name: "Sản phẩm C", 
    price: 200000, 
    originalPrice: 210000, 
    discountPercent: 5, 
    image: "/images/product-c.jpg", 
    category: "Phụ kiện", 
    sold: 50, 
    views: 200, 
    createdAt: 20240903 
  },
  { 
    id: 4, 
    name: "Sản phẩm D", 
    price: 250000, 
    originalPrice: 312500, 
    discountPercent: 20, 
    image: "/images/product-d.jpg", 
    category: "Tablet", 
    sold: 80, 
    views: 1000, 
    createdAt: 20240904 
  },
  { 
    id: 5, 
    name: "Sản phẩm E", 
    price: 300000, 
    originalPrice: 352940, 
    discountPercent: 15, 
    image: "/images/product-e.jpg", 
    category: "Tai nghe", 
    sold: 500, 
    views: 2000, 
    createdAt: 20240905 
  },
  { 
    id: 6, 
    name: "Sản phẩm F", 
    price: 350000, 
    originalPrice: 500000, 
    discountPercent: 30, 
    image: "/images/product-f.jpg", 
    category: "Đồng hồ", 
    sold: 40, 
    views: 150, 
    createdAt: 20240906 
  },
  { 
    id: 7, 
    name: "Sản phẩm G", 
    price: 400000, 
    originalPrice: 400000, 
    discountPercent: 0, 
    image: "/images/product-g.jpg", 
    category: "Loa", 
    sold: 250, 
    views: 1200, 
    createdAt: 20240907 
  },
  { 
    id: 8, 
    name: "Sản phẩm H", 
    price: 450000, 
    originalPrice: 600000, 
    discountPercent: 25, 
    image: "/images/product-h.jpg", 
    category: "Gaming", 
    sold: 90, 
    views: 300, 
    createdAt: 20240908 
  },
];


  // Lấy 8 sản phẩm mới nhất
  const latestProducts = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);

  // Lấy 6 sản phẩm bán chạy nhất
  const bestSellerProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6);

  // Lấy 8 sản phẩm được xem nhiều nhất
  const mostViewedProducts = [...products].sort((a, b) => b.views - a.views).slice(0, 8);

  // Lấy 4 sản phẩm có % khuyến mãi cao nhất
  const discountProducts = [...products].sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0)).slice(0, 4);

  return (
    <div>
      <ProductsSection
        title="Sản phẩm mới nhất"
        subtitle="Khám phá 8 sản phẩm vừa ra mắt"
        products={latestProducts}
        formatPrice={formatPrice}
      />

      <ProductsSection
        title="Sản phẩm bán chạy"
        subtitle="Top 6 sản phẩm được mua nhiều nhất"
        products={bestSellerProducts}
        formatPrice={formatPrice}
      />

      <ProductsSection
        title="Sản phẩm xem nhiều"
        subtitle="8 sản phẩm được quan tâm nhiều nhất"
        products={mostViewedProducts}
        formatPrice={formatPrice}
      />

      <ProductsSection
        title="Khuyến mãi HOT"
        subtitle="4 sản phẩm có ưu đãi lớn nhất"
        products={discountProducts}
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default ProductsPage;
