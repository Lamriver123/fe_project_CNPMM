import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartSummary from "../../components/cart/CartSummary.tsx";
import { CartItem as CartItemType } from "../../types/Cart.ts";
import CartItem from "../../components/cart/CartItem.tsx";
import EmptyCart from "../../components/cart/EmptyCart.tsx";
import { useCart } from "../../hooks/useCart.ts";
import { paymentApi } from "../../api/paymentApi.ts";
import { Modal } from "antd";   // 👉 dùng popup
import "./CartPage.css";

const CartPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, loading, error, updateQuantity, removeItem, clearCart, refetch } = useCart();
    const [modal, setModal] = useState<{ visible: boolean; message: string }>({
        visible: false,
        message: "",
    });
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // ✅ Khi load CartPage, kiểm tra status từ query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get("status");

        if (status) {
            let message = "";
            switch (status) {
                case "paid":
                    message = "🎉 Thanh toán thành công!";
                    break;
                case "failed":
                    message = "❌ Thanh toán thất bại!";
                    break;
                case "invalid":
                    message = "⚠️ Giao dịch không hợp lệ!";
                    break;
                case "notfound":
                    message = "🔎 Không tìm thấy đơn hàng!";
                    break;
                default:
                    message = "Có lỗi xảy ra trong quá trình thanh toán.";
            }
            setModal({ visible: true, message });

            // Xóa query param để tránh popup lặp lại khi F5
            navigate("/cart", { replace: true });
        }
    }, [location, navigate]);

    const handleToggleItem = (productId: string) => {
        setSelectedItems(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleToggleAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]); // bỏ chọn tất cả
        } else {
            setSelectedItems(items.map(item => item.product._id)); // chọn tất cả
        }
    };

    const handleCheckout = async () => {
        try {
            const res = await paymentApi.createQr(selectedItems);
            console.log("Thanh toán response:", res);

            if (res.success && res.url) {
                window.location.href = res.url; // redirect sang VNPay
            } else {
                Modal.error({ title: "Lỗi", content: "Không tạo được link thanh toán" });
            }
        } catch (err) {
            console.error("Error creating QR payment:", err);
            Modal.error({ title: "Lỗi", content: "Có lỗi xảy ra khi tạo thanh toán" });
        }
    };

    const handleContinueShopping = () => {
        navigate("/products");
    };

    const handleClearCart = async () => {
        if (window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
            try {
                await clearCart();
            } catch (err) {
                console.error("Error clearing cart:", err);
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
    const isAllSelected = items.length > 0 && selectedItems.length === items.length;

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
                            : "Giỏ hàng của bạn đang trống"}
                    </p>
                </div>

                {totalItems === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-section">
                            <div className="cart-items-header">
                                <input
                                    type="checkbox" className="custom-checkbox"
                                    checked={isAllSelected}
                                    onChange={handleToggleAll}
                                />
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
                                        checked={selectedItems.includes(item.product._id)}
                                        onToggle={() => handleToggleItem(item.product._id)}
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

            <Modal
                open={modal.visible}
                onCancel={() => setModal({ ...modal, visible: false })}
                footer={null}
                centered
            >
                <p style={{ fontSize: "16px" }}>{modal.message}</p>
            </Modal>
        </div>
    );
};

export default CartPage;
