import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeliveryAddress } from '../../hooks/useDeliveryAddress.ts';
import { CartItem } from '../../types/Cart';
import { Voucher } from '../../api/voucherApi';
import { paymentApi } from '../../api/paymentApi.ts';
import { Button, Tag, Modal, Spin } from 'antd';
import { PlusOutlined, HomeOutlined, EditOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import './CheckoutPage.css';
import AddressFormModal from './AddressFormModal.tsx';
import { CreateAddressPayload, DeliveryAddress } from '../../types/deliveryAddress.ts';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const { items, voucher, xu: usedXu } = (state || {}) as { items: CartItem[], voucher: Voucher | null, xu: number };

    const {
        addresses,
        loading: addressLoading,
        error,
        getDefaultAddress,
        createAddress,
        updateAddress,
        deleteAddress,
    } = useDeliveryAddress();

    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<DeliveryAddress | null>(null);
    const [paymentResultModal, setPaymentResultModal] = useState({ visible: false, message: '' });

    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (!items || items.length === 0) {
            toast.error('Không có sản phẩm để thanh toán. Đang quay về giỏ hàng...');
            setTimeout(() => navigate('/cart'), 2000);
        }
    }, [items, navigate]);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const defaultAddress = getDefaultAddress();
            if (defaultAddress) setSelectedAddressId(defaultAddress._id);
        }
    }, [addresses, getDefaultAddress, selectedAddressId]);

    // Tính toán lại giá trị đơn hàng
    const { subTotal, voucherDiscount, finalPrice } = useMemo(() => {
        const subTotal = items?.reduce((sum, item) => {
            const priceAfterDiscount = item.product.price * (1 - (item.product.discount || 0) / 100);
            return sum + priceAfterDiscount * item.quantity;
        }, 0) || 0;

        let voucherDiscount = 0;
        if (voucher) {
            if (voucher.type === 'percentage') {
                voucherDiscount = (subTotal * voucher.discountValue) / 100;
            } else {
                voucherDiscount = voucher.discountValue;
            }
        }

        const finalPrice = Math.max(0, subTotal - voucherDiscount - (usedXu || 0));
        return { subTotal, voucherDiscount, finalPrice };
    }, [items, voucher, usedXu]);

    // --- Address CRUD Handlers ---
    const handleOpenModal = (address: DeliveryAddress | null = null) => {
        setEditingAddress(address);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setEditingAddress(null);
    };

    const handleFormSubmit = async (values: CreateAddressPayload) => {
        let result;
        if (editingAddress) {
            result = await updateAddress(editingAddress._id, values);
        } else {
            result = await createAddress(values);
        }

        if (result.success) {
            toast.success(editingAddress ? 'Cập nhật địa chỉ thành công!' : 'Thêm địa chỉ thành công!');
            handleCloseModal();
        } else {
            toast.error(result.message || 'Có lỗi xảy ra.');
        }
    };

    const handleDelete = (addressId: string) => {
        setAddressToDelete(addressId); // Lưu ID của địa chỉ cần xóa
        setIsDeleteConfirmVisible(true);
    };

    const confirmDelete = async () => {
        if (!addressToDelete) return; // Nếu không có id thì không làm gì cả

        const result = await deleteAddress(addressToDelete);
        if (result.success) {
            toast.success('Xóa địa chỉ thành công!');
            if (selectedAddressId === addressToDelete) {
                setSelectedAddressId(null);
            }
        } else {
            toast.error(result.message || 'Xóa địa chỉ thất bại.');
        }

        // Đóng modal sau khi xử lý xong
        setIsDeleteConfirmVisible(false);
        setAddressToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteConfirmVisible(false);
        setAddressToDelete(null);
    };

    // --- Payment Handler ---
    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.warn('Vui lòng chọn địa chỉ giao hàng.');
            return;
        }
        try {
            const payload = {
                items: items.map(item => item.product._id),
                voucherCode: voucher?.code || null,
                usedXu: Number(usedXu) || 0,
                deliveryAddressId: selectedAddressId,
            };
            const res = await paymentApi.createQr(payload);

            if (res.success && res.url) {
                const paymentWindow = window.open(res.url, "_blank");

                if (!paymentWindow) {
                    Modal.error({ title: "Lỗi", content: "Không thể mở tab thanh toán. Vui lòng kiểm tra cài đặt trình duyệt của bạn." });
                    return;
                }

                // Lắng nghe kết quả từ tab thanh toán
                const handleMessage = (event: MessageEvent) => {
                    if (event.origin !== window.location.origin) return;

                    const { status } = event.data;
                    let message = "";
                    switch (status) {
                        case "paid": message = "Thanh toán thành công!"; break;
                        case "failed": message = "Thanh toán thất bại!"; break;
                        case "invalid": message = "Giao dịch không hợp lệ!"; break;
                        case "notfound": message = "Không tìm thấy đơn hàng!"; break;
                        default: message = "Có lỗi xảy ra trong quá trình thanh toán.";
                    }

                    setPaymentResultModal({ visible: true, message });
                    window.removeEventListener("message", handleMessage);
                };

                window.addEventListener("message", handleMessage);
            } else {
                Modal.error({ title: "Lỗi", content: "Không tạo được link thanh toán" });
            }
        } catch (err) {
            console.error("Error creating payment:", err);
            Modal.error({ title: "Lỗi", content: "Có lỗi xảy ra khi tạo thanh toán" });
        }
    };

    if (!items || items.length === 0) {
        return <div className="checkout-page-loading"><Spin size="large" /></div>;
    }

    return (
        <div className="checkout-page-redesigned">
            <div className="checkout-container">
                <div className="checkout-main">
                    <h1 className="checkout-title"><ShoppingCartOutlined /> Xác nhận đơn hàng</h1>
                    <div className="delivery-address-section">
                        <h2 className='section-title'><HomeOutlined /> Địa chỉ nhận hàng</h2>
                        {addressLoading && <Spin />}
                        {error && <p className="error-text">{error}</p>}
                        <div className="address-grid">
                            {addresses.map((addr) => (
                                <div
                                    key={addr._id}
                                    className={`address-card ${selectedAddressId === addr._id ? 'selected' : ''}`}
                                    onClick={() => setSelectedAddressId(addr._id)}
                                >
                                    {addr.defaultAddress && <Tag className="default-tag" color="blue">Mặc định</Tag>}
                                    <div className="address-card-info">
                                        <p className="name">{addr.nameBuyer}</p>
                                        <p className="phone">{addr.phoneNumber}</p>
                                        <p className="address">{addr.addressName}</p>
                                    </div>
                                    <div className="address-actions">
                                        <Button icon={<EditOutlined />} size="small" onClick={(e) => { e.stopPropagation(); handleOpenModal(addr); }} />
                                        <Button icon={<DeleteOutlined />} size="small" danger onClick={(e) => { e.stopPropagation(); handleDelete(addr._id); }} />
                                    </div>
                                </div>
                            ))}
                            <div className="add-address-card" onClick={() => handleOpenModal()}>
                                <PlusOutlined />
                                <span>Thêm địa chỉ mới</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="checkout-sidebar">
                    <div className="order-summary">
                        <h2 className='section-title'>Tóm tắt đơn hàng</h2>
                        <div className="summary-items">
                            {items.map(item => (
                                <div className="summary-item" key={item.product._id}>
                                    <img src={item.product.images[0].url} alt={item.product.name} className="summary-item-img" />
                                    <div className="summary-item-details">
                                        <p className='summary-item-name'>{item.product.name}</p>
                                        <p className='summary-item-qty'>SL: {item.quantity}</p>
                                    </div>
                                    <p className='summary-item-price'>
                                        {(item.product.price * (1 - (item.product.discount || 0) / 100) * item.quantity).toLocaleString()}đ
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="summary-calculations">
                            <div className="summary-line">
                                <span>Tạm tính</span>
                                <span>{subTotal.toLocaleString()}đ</span>
                            </div>
                            {voucherDiscount > 0 && (
                                <div className="summary-line">
                                    <span>Voucher <Tag color="green">{voucher?.code}</Tag></span>
                                    <span className='discount-value'>- {voucherDiscount.toLocaleString()}đ</span>
                                </div>
                            )}
                            {usedXu > 0 && (
                                <div className="summary-line">
                                    <span>Sử dụng xu</span>
                                    <span className='discount-value'>- {usedXu.toLocaleString()} xu</span>
                                </div>
                            )}
                            <div className="summary-line total">
                                <span>Tổng cộng</span>
                                <span className='total-price'>{finalPrice.toLocaleString()}đ</span>
                            </div>
                        </div>
                        <Button type="primary" danger block size="large" className="place-order-btn" onClick={handlePlaceOrder} loading={addressLoading}>
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>

            <AddressFormModal
                visible={isModalVisible}
                loading={addressLoading}
                initialData={editingAddress}
                onCancel={handleCloseModal}
                onSubmit={handleFormSubmit}
            />

            <Modal
                title="Xác nhận xóa địa chỉ"
                open={isDeleteConfirmVisible}
                onOk={confirmDelete}
                onCancel={cancelDelete}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true, loading: addressLoading }}
            >
                <p>Bạn có chắc muốn xóa địa chỉ này? Hành động này không thể hoàn tác.</p>
            </Modal>

            <Modal
                open={paymentResultModal.visible}
                onCancel={() => setPaymentResultModal({ ...paymentResultModal, visible: false })}
                footer={[
                    <Button key="close" onClick={() => setPaymentResultModal({ ...paymentResultModal, visible: false })}>Đóng</Button>,
                    paymentResultModal.message.includes("🎉") && (
                        <Button key="orders" type="primary" onClick={() => navigate('/orders')}>Xem đơn hàng</Button>
                    ),
                ]}
                centered
            >
                <p style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>{paymentResultModal.message}</p>
            </Modal>
        </div>
    );
};

export default CheckoutPage;