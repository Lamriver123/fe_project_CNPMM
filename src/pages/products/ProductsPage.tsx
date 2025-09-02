import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product.ts";
import { formatPrice } from "../../utils/format.ts";

const ProductsPage = () => {
  // Mock data (bổ sung thêm field: sold, views, discount, createdAt)
  const products: Product[] = [
    {
    id: 1,
    name: "Balo UTE Premium",
    price: 299000,
    originalPrice: 399000,
    images: 
    [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
    ],
    // image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Balo",
    isHot: true,
    createdAt: Date.now(),
    sold: 120,
    views: 500,
    discountPercent: 25,
    stock: 20
  },
  {
    id: 2,
    name: "Áo Polo UTE Classic",
    price: 189000,
    originalPrice: 249000,
    images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop"],
    category: "Áo",
    isNew: true,
    createdAt: Date.now(),
    sold: 300,
    views: 800,
    discountPercent: 20,
     stock: 20,
  },
  {
    id: 3,
    name: "Nón Snapback UTE",
    price: 89000,
    images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop"],
    category: "Nón",
    createdAt: Date.now(),
    sold: 50,
    views: 200,
    discountPercent: 0,
     stock: 20,
  },
  {
    id: 4,
    name: "Dây đeo thẻ UTE",
    price: 45000,
    images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"],
    category: "Phụ kiện",
    createdAt: Date.now(),
    sold: 80,
    views: 1000,
    discountPercent: 10,
     stock: 20,
  },
  {
    id: 5,
    name: "Áo Hoodie UTE",
    price: 349000,
    originalPrice: 399000,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"],
    category: "Áo",
    isHot: true,
    createdAt: Date.now(),
    sold: 500,
    views: 2000,
    discountPercent: 15,
     stock: 20,
  },
  {
    id: 6,
    name: "Túi đeo chéo UTE",
    price: 159000,
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop"],
    category: "Túi",
    createdAt: Date.now(),
    sold: 40,
    views: 150,
    discountPercent: 5,
     stock: 20,
  },
  {
    id: 7,
    name: "Mũ Bucket UTE",
    price: 69000,
    images: ["https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&h=400&fit=crop"],
    category: "Nón",
    createdAt: Date.now(),
    sold: 250,
    views: 1200,
    discountPercent: 0,
     stock: 20,
  },
  {
    id: 8,
    name: "Balo Mini UTE",
    price: 199000,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"],
    category: "Balo",
    createdAt: Date.now(),
    sold: 90,
    views: 300,
    discountPercent: 30,
     stock: 20,
  }
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
