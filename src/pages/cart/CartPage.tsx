import React from "react";
import { useNavigate } from "react-router-dom";
import CartSummary from "../../components/cart/CartSummary.tsx";
import { CartItem as CartItemType } from "../../types/Cart.ts";
import CartItem from "../../components/cart/CartItem.tsx";
import EmptyCart from "../../components/cart/EmptyCart.tsx";
import { useCart } from "../../hooks/useCart.ts";
import "./CartPage.css";

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, loading, error, updateQuantity, removeItem, clearCart, refetch } = useCart();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/products');
    };

    const handleClearCart = async () => {
        if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
            try {
                await clearCart();
            } catch (err) {
                console.error('Error clearing cart:', err);
            }
        }
    };

    if (loading) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="loading-spinner">
                        <i className="bi bi-arrow-clockwise"></i>
                        <span>Đang tải giỏ hàng...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="error-message">
                        <i className="bi bi-exclamation-triangle"></i>
                        <p>{error}</p>
                        <button onClick={refetch} className="retry-btn">
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const { data } = cart || { data: { items: [], totalItems: 0, totalPrice: 0 } };
    const { items, totalItems, totalPrice } = data;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1 className="cart-title">
                        <i className="bi bi-cart3"></i>
                        Giỏ hàng của bạn
                    </h1>
                    <p className="cart-subtitle">
                        {totalItems > 0
                            ? `Bạn có ${totalItems} sản phẩm trong giỏ hàng`
                            : 'Giỏ hàng của bạn đang trống'
                        }
                    </p>
                </div>

                {totalItems === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-section">
                            <div className="cart-items-header">
                                <h2>Sản phẩm trong giỏ</h2>
                                <button
                                    className="clear-cart-btn"
                                    onClick={handleClearCart}
                                >
                                    <i className="bi bi-trash"></i>
                                    Xóa tất cả
                                </button>
                            </div>

                            <div className="cart-items-list">
                                {items.map((item: CartItemType) => (
                                    <CartItem
                                        key={item.product._id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemoveItem={removeItem}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary-section">
                            <CartSummary
                                totalItems={totalItems}
                                totalPrice={totalPrice}
                                onCheckout={handleCheckout}
                                onContinueShopping={handleContinueShopping}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
