import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product.ts";
import { formatPrice } from "../../utils/format.ts";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // 👈 danh mục fetch từ BE
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 📌 fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:6969/v1/api/products?page=1");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:6969/v1/api/products/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/category/${selected}`); // 👉 redirect sang CategoryPage
    }
  };

  // --- logic lọc như cũ ---
  const latestProducts = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const bestSellerProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6);
  const mostViewedProducts = [...products].sort((a, b) => b.views - a.views).slice(0, 8);
  const discountProducts = [...products].sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0)).slice(0, 4);

  return (
      <div className="mx-auto px-4 flex flex-row width-full justify-center items-center">
        {/* 👇 Combo box chọn category */}
        <div className="flex justify-center items-center mb-8 gap-6">
    <label
      htmlFor="category"
      className="text-lg font-semibold text-gray-700"
    >
      Chọn danh mục:
    </label>

    <select
      id="category"
      className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handleCategoryChange}
      defaultValue=""
    >
      <option value="" disabled>
        -- Chọn category --
      </option>
      {categories.map((cate) => (
        <option key={cate} value={cate}>
          {cate}
        </option>
      ))}
    </select>

  </div>


      {/* Sections */}
      <ProductsSection
        title="Sản phẩm mới nhất"
        subtitle="Khám phá 8 sản phẩm vừa ra mắt"
        products={latestProducts}
        formatPrice={formatPrice}
      />

      <ProductsSection
        title="Sản phẩm bán chạy"
        subtitle="Top 6 sản phẩm được mua nhiều nhất"
        products={bestSellerProducts}
        formatPrice={formatPrice}
      />

      <ProductsSection
        title="Sản phẩm xem nhiều"
        subtitle="8 sản phẩm được quan tâm nhiều nhất"
        products={mostViewedProducts}
        formatPrice={formatPrice}
      />

      <ProductsSection
        title="Khuyến mãi HOT"
        subtitle="4 sản phẩm có ưu đãi lớn nhất"
        products={discountProducts}
        formatPrice={formatPrice}
      />
    </div>
  );

};

export default ProductsPage;
