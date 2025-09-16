import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cartApi } from "../../api/cartApi.ts";
import { CategoryApi } from "../../api/categoryApi.ts";
import { productApi } from "../../api/productApi.ts";
import CommentsSection from "../../components/comments/CommentsSetion.tsx";
import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product";
import { formatPrice } from "../../utils/format.ts";
import "./ProductDetailPage.css";
// const mockProducts: Product[] = [
//   {
//     id: 1,
//     name: "Balo UTE Premium",
//     price: 299000,
//     originalPrice: 399000,
//     images: 
//     [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
//     ],
//     // image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
//     category: "Balo",
//     isHot: true,
//     createdAt: Date.now(),
//     sold: 120,
//     views: 500,
//     discountPercent: 25,
//     stock: 20
//   },
//   {
//     id: 2,
//     name: "Áo Polo UTE Classic",
//     price: 189000,
//     originalPrice: 249000,
//     images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop"],
//     category: "Áo",
//     isNew: true,
//     createdAt: Date.now(),
//     sold: 300,
//     views: 800,
//     discountPercent: 20,
//      stock: 20,
//   },
//   {
//     id: 3,
//     name: "Nón Snapback UTE",
//     price: 89000,
//     images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop"],
//     category: "Nón",
//     createdAt: Date.now(),
//     sold: 50,
//     views: 200,
//     discountPercent: 0,
//      stock: 20,
//   },
//   {
//     id: 4,
//     name: "Dây đeo thẻ UTE",
//     price: 45000,
//     images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"],
//     category: "Phụ kiện",
//     createdAt: Date.now(),
//     sold: 80,
//     views: 1000,
//     discountPercent: 10,
//      stock: 20,
//   },
//   {
//     id: 5,
//     name: "Áo Hoodie UTE",
//     price: 349000,
//     originalPrice: 399000,
//     images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"],
//     category: "Áo",
//     isHot: true,
//     createdAt: Date.now(),
//     sold: 500,
//     views: 2000,
//     discountPercent: 15,
//      stock: 20,
//   },
//   {
//     id: 6,
//     name: "Túi đeo chéo UTE",
//     price: 159000,
//     images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop"],
//     category: "Túi",
//     createdAt: Date.now(),
//     sold: 40,
//     views: 150,
//     discountPercent: 5,
//      stock: 20,
//   },
//   {
//     id: 7,
//     name: "Mũ Bucket UTE",
//     price: 69000,
//     images: ["https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&h=400&fit=crop"],
//     category: "Nón",
//     createdAt: Date.now(),
//     sold: 250,
//     views: 1200,
//     discountPercent: 0,
//      stock: 20,
//   },
//   {
//     id: 8,
//     name: "Balo Mini UTE",
//     price: 199000,
//     images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"],
//     category: "Balo",
//     createdAt: Date.now(),
//     sold: 90,
//     views: 300,
//     discountPercent: 30,
//      stock: 20,
//   }
// ];


export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProduct, setRelatedProduct] = useState<Product[] | null>(null);
  const [quantity, setQuantity] = useState(1);
  //const product = mockProducts.find((p) => p.id === Number(id));
  const navigate = useNavigate();

   const handleAddToCart = async () => {
    if (!product) return;

    try {
      await cartApi.addToCart(product._id, quantity);
      navigate("/cart");
    } catch (error) {
      console.error("❌ Lỗi khi thêm vào giỏ:", error);
      alert("Thêm vào giỏ hàng thất bại");
    }
  };
    useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const id = slug.split("-").pop() as string;
        console.log("product slug and id: ", slug, id)
        const res = await productApi.getProductById(id);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
  if (!product) return; // tránh gọi khi product chưa có

  const fetchRelatedProduct = async () => {
    try {
      const slug = `${product.category.name}-${product.category._id}`;
      const res = await CategoryApi.getProductsByCategoryPagination(slug);
      setRelatedProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchRelatedProduct();
}, [product?.category?._id]); 


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return <div className="p-4">❌ Không tìm thấy sản phẩm</div>;
  }

  const increment = () => {
    if (quantity < (product.quantity || 1)) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div>
      <div className="product-detail-container">
        {/* Swiper hình ảnh */}
        <div className="product-image">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]} 
          >
            {product.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img.url} alt={`${product.name} ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          {product.discountPercent ? (
            <div className="price-box">
              <span className="price">{formatPrice(product.price)}</span>
              <span className="original-price">{formatPrice(product.originalPrice!)}</span>
              <span className="discount">-{product.discountPercent}%</span>
            </div>
          ) : (
            <p className="price">{formatPrice(product.price)}</p>
          )}

          <p><strong>Danh mục:</strong> {product.category.name}</p>
          <p><strong>Đã bán:</strong> {product.sold}</p>
          <p><strong>Lượt xem:</strong> {product.views}</p>
          <p><strong>Ngày thêm:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
          <p><strong>Tồn kho:</strong> {product.quantity}</p>

          {/* Chọn số lượng */}
          <div className="quantity-selector">
            <button onClick={decrement}>-</button>
            <span>{quantity}</span>
            <button onClick={increment}>+</button>
          </div>

          {/* Nút thêm vào giỏ */}
          <button className="btn-add-cart" onClick={handleAddToCart}>
            🛒 Thêm {quantity} vào giỏ
          </button>
        </div>
      </div>

      <CommentsSection/>
      <ProductsSection
        title="Sản phẩm liên quan"
        products={relatedProduct ?? []}
        subtitle=""
        formatPrice={formatPrice}
      />
    </div>
  );
}