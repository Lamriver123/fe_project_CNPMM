import React, { useState } from "react";
import { Product } from "../../../types/Product";
import { Category } from "../../../types/Category";
import "./ProductDialog.css";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
};

export default function AddProductDialog({ isOpen, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<Product>({
    _id: "",
    name: "",
    price: 0,
    discountPercent: 0,
    quantity: 0,
    sold: 0,
    description: "",
    category: { _id: "c1", name: "Thời trang", slug: "thoi-trang" } as Category,
    views: 0,
    images: [],
    status: "available",
    slug: "",
    createdAt: Date.now(),
  },
  
);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>➕ Thêm sản phẩm</h3>

        <div className="form-group">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Giá</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>URL ảnh</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({
                ...formData,
                images: [{ url: e.target.value, alt: formData.name }],
              })
            }
          />
          {formData.images[0] && (
            <img src={formData.images[0].url} alt="" className="preview-img" />
          )}
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Hủy</button>
          <button className="btn btn-primary" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
}
