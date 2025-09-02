import "./Product.css";
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isHot?: boolean;
}

interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
}

export default function ProductCard({ product, formatPrice }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.isNew && <span className="badge badge-new">Mới</span>}
        {product.isHot && <span className="badge badge-hot">Hot</span>}
        <div className="product-actions">
          <button className="action-btn wishlist-btn">
            <i className="bi bi-heart"></i>
          </button>
          <button className="action-btn quick-view-btn">
            <i className="bi bi-eye"></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-category">{product.category}</div>
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
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
