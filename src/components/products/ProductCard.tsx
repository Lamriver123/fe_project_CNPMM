import { useNavigate } from "react-router-dom";
import "./Product.css";
import { Product } from "../../types/Product";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { profileApi } from "../../api/profileApi.ts";
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   category: string;
//   isNew?: boolean;
//   isHot?: boolean;
// }

interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
}

export default function ProductCard({ product, formatPrice }: ProductCardProps) {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const handleCardClick = async () => {
    console.log("Product cart with slug and id: ", product.slug, product._id)
    
    // Add to viewed products if user is logged in
    if (token) {
      try {
        await profileApi.addToViewedProducts(product._id);
      } catch (error) {
        console.error("Error adding to viewed products:", error);
      }
    }
    navigate(`/products/${product.slug}-${product._id}`);
};

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.images[0].url} alt={product.name} />
        {product.isNew && <span className="badge badge-new">Mới</span>}
        {product.isHot && <span className="badge badge-hot">Hot</span>}
        <div className="product-actions">
          <button className="action-btn wishlist-btn">
            <i className="bi bi-heart"></i>
          </button>
          <button className="action-btn quick-view-btn"
            onClick={handleCardClick}>
            <i className="bi bi-eye"></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-category">{product.category.name}</div>
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price * (1 - product.discount / 100))}</span>
          {product.originalPrice && (
            <span className="original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <button className="btn btn-add-cart">
          <i className="bi bi-cart-plus"></i>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
