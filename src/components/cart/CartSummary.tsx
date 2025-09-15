import React from "react";
import { formatPrice } from "../../utils/format.ts";
import "./CartSummary.css";

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
    onCheckout: () => void;
    onContinueShopping?: () => void;
}

export default function CartSummary({ totalItems, totalPrice, onCheckout, onContinueShopping }: CartSummaryProps) {
    return (
        <div className="cart-summary">
            <h3 className="summary-title">Tóm tắt đơn hàng</h3>

            <div className="summary-details">
                <div className="summary-row">
                    <span>Tổng sản phẩm:</span>
                    <span>{totalItems} sản phẩm</span>
                </div>

                <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span className="shipping-fee">
                        {totalPrice > 500000 ? "Miễn phí" : formatPrice(30000)}     {/*mua trên 500k mới được free ship :))*/}
                    </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total-row">
                    <span>Tổng cộng:</span>
                    <span className="total-amount">
                        {formatPrice(totalPrice + (totalPrice > 500000 ? 0 : 30000))}
                    </span>
                </div>
            </div>

            <div className="summary-actions">
                <button
                    className="checkout-btn"
                    onClick={onCheckout}
                    disabled={totalItems === 0}
                >
                    <i className="bi bi-credit-card"></i>
                    Thanh toán
                </button>

                <button
                    className="continue-shopping-btn"
                    onClick={onContinueShopping}
                >
                    <i className="bi bi-arrow-left"></i>
                    Tiếp tục mua sắm
                </button>
            </div>

            {totalPrice > 500000 && (
                <div className="free-shipping-notice">
                    <i className="bi bi-truck"></i>
                    <span>Bạn được miễn phí vận chuyển!</span>
                </div>
            )}
        </div>
    );
}
