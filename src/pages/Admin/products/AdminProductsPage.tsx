import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { FiBox } from "react-icons/fi";
import { Category } from "../../../types/Category";
import { Product } from "../../../types/Product";
import AddProductDialog from "./AddProductDialog.tsx";
import "./AdminProductsPage.css";
import EditProductDialog from "./EditProductDialog.tsx";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      _id: "1",
      name: "Áo thun nam",
      price: 199000,
      discountPercent: 10,
      quantity: 20,
      sold: 5,
      description: "Áo thun nam cotton 100%",
      category: { _id: "c1", name: "Thời trang", slug: "thoi-trang" } as Category,
      views: 50,
      images: [{ url: "https://hidola.com/upload/sanpham/31891665.jpg" }],
      status: "available",
      slug: "ao-thun-nam",
      createdAt: Date.now(),
    },
    {
      _id: "2",
      name: "Áo thun nam",
      price: 199000,
      discountPercent: 10,
      quantity: 20,
      sold: 5,
      description: "Áo thun nam cotton 100%",
      category: { _id: "c1", name: "Thời trang", slug: "thoi-trang" } as Category,
      views: 50,
      images: [{ url: "https://hidola.com/upload/sanpham/31891665.jpg" }],
      status: "available",
      slug: "ao-thun-nam",
      createdAt: Date.now(),
    },
    {
      _id: "3",
      name: "Áo thun nam",
      price: 199000,
      discountPercent: 10,
      quantity: 20,
      sold: 5,
      description: "Áo thun nam cotton 100%",
      category: { _id: "c1", name: "Thời trang", slug: "thoi-trang" } as Category,
      views: 50,
      images: [{ url: "https://hidola.com/upload/sanpham/31891665.jpg" }],
      status: "available",
      slug: "ao-thun-nam",
      createdAt: Date.now(),
    },
    {
      _id: "4",
      name: "Áo thun nam",
      price: 199000,
      discountPercent: 10,
      quantity: 20,
      sold: 5,
      description: "Áo thun nam cotton 100%",
      category: { _id: "c1", name: "Thời trang", slug: "thoi-trang" } as Category,
      views: 50,
      images: [{ url: "https://hidola.com/upload/sanpham/31891665.jpg" }],
      status: "available",
      slug: "ao-thun-nam",
      createdAt: Date.now(),
    },
  ]);

  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Lọc
  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter((p) => p.category?.name === filterCategory);



  const handleAdd = (data: Product) => {
    setProducts((prev) => [...prev, { ...data, _id: Date.now().toString() }]);
    setIsAddOpen(false);
  };

  const handleEdit = (data: Product) => {
    setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2><FiBox /> Quản lý sản phẩm</h2>
        <div className="actions">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            <option value="Thời trang">Thời trang</option>
            <option value="Giày dép">Giày dép</option>
          </select>
          <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      

      {/* Bảng sản phẩm */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Giảm</th>
            <th>Số lượng</th>
            <th>Đã bán</th>
            <th>Lượt xem</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td>
                {p.images?.[0] ? (
                  <img src={p.images[0].url} alt={p.name} className="product-img" />
                ) : (
                  <span className="no-img">No Image</span>
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.category?.name}</td>
              <td>{p.price.toLocaleString()} đ</td>
              <td>{p.discountPercent ?? 0}%</td>
              <td>{p.quantity}</td>
              <td>{p.sold}</td>
              <td>{p.views}</td>
              <td className={p.status === "available" ? "status-available" : "status-out"}>
                {p.status === "available" ? "Còn hàng" : "Hết hàng"}
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => { setEditingProduct(p); setIsEditOpen(true); }}
                >Sửa</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p._id)}
                >Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialogs */}
      <AddProductDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAdd}
      />
      {editingProduct && (
        <EditProductDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={handleEdit}
          product={editingProduct}
        />
      )}
    </div>
  );
}
