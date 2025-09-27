import React, { useState } from "react";
import { Product } from "../../../types/Product";
import "./ProductDialog.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
  product: Product;
};

export default function EditProductDialog({ isOpen, onClose, onSave, product }: Props) {
  const [formData, setFormData] = useState<Product>(product);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="addModal">
        <h3>✏️ Sửa sản phẩm</h3>

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
            value={formData.images[0]?.url || ""}
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
