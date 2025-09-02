import { useParams } from "react-router-dom";
import CommentsSection from "../../components/comments/CommentsSetion.tsx";
import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product";
import { formatPrice } from "../../utils/format.ts";
import "./ProductDetailPage.css";
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Balo UTE Premium",
    price: 299000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Balo",
    isHot: true,
    createdAt: Date.now(),
    sold: 120,
    views: 500,
    discountPercent: 25,
  },
  {
    id: 2,
    name: "Áo Polo UTE Classic",
    price: 189000,
    originalPrice: 249000,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
    category: "Áo",
    isNew: true,
    createdAt: Date.now(),
    sold: 300,
    views: 800,
    discountPercent: 20,
  },
  {
    id: 3,
    name: "Nón Snapback UTE",
    price: 89000,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop",
    category: "Nón",
    createdAt: Date.now(),
    sold: 50,
    views: 200,
    discountPercent: 0,
  },
  {
    id: 4,
    name: "Dây đeo thẻ UTE",
    price: 45000,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    category: "Phụ kiện",
    createdAt: Date.now(),
    sold: 80,
    views: 1000,
    discountPercent: 10,
  },
  {
    id: 5,
    name: "Áo Hoodie UTE",
    price: 349000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Áo",
    isHot: true,
    createdAt: Date.now(),
    sold: 500,
    views: 2000,
    discountPercent: 15,
  },
  {
    id: 6,
    name: "Túi đeo chéo UTE",
    price: 159000,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop",
    category: "Túi",
    createdAt: Date.now(),
    sold: 40,
    views: 150,
    discountPercent: 5,
  },
  {
    id: 7,
    name: "Mũ Bucket UTE",
    price: 69000,
    image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&h=400&fit=crop",
    category: "Nón",
    createdAt: Date.now(),
    sold: 250,
    views: 1200,
    discountPercent: 0,
  },
  {
    id: 8,
    name: "Balo Mini UTE",
    price: 199000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Balo",
    createdAt: Date.now(),
    sold: 90,
    views: 300,
    discountPercent: 30,
  }
];


export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-4">❌ Không tìm thấy sản phẩm</div>;
  }

 return (
    <div>
      <div className="product-detail-container">
      {/* Hình ảnh bên trái */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Thông tin bên phải */}
      <div className="product-info">
        <div>
          <h1 className="product-title">{product.name}</h1>

          {product.discountPercent ? (
            <div className="price-box">
              <span className="price">{product.price.toLocaleString()}₫</span>
              <span className="original-price">
                {product.originalPrice?.toLocaleString()}₫
              </span>
              <span className="discount">-{product.discountPercent}%</span>
            </div>
          ) : (
            <p className="price">{product.price.toLocaleString()}₫</p>
          )}

          <p>
            <strong>Danh mục:</strong> {product.category}
          </p>
          <p>
            <strong>Đã bán:</strong> {product.sold}
          </p>
          <p>
            <strong>Lượt xem:</strong> {product.views}
          </p>
          <p>
            <strong>Ngày thêm:</strong>{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
            
        {/* Nút mua hàng */}
        <button className="btn-add-cart">🛒 Thêm vào giỏ</button>
      </div>
    </div>
      <CommentsSection />
      <ProductsSection title="Sản phẩm liên quan" products={mockProducts} subtitle={""} formatPrice={formatPrice} />
    </div>
  );
}