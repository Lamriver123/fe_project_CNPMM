import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // để lấy category từ URL
import ProductsSection from "../../components/products/ProductsSection.tsx";
import { Product } from "../../types/Product.ts";
import { formatPrice } from "../../utils/format.ts";

const CategoryPage = () => {
  const { category } = useParams(); // ví dụ: /category/Ao
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:6969/v1/api/products?category=${category}&page=${pageNum}&limit=6`
      );
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      // giả sử API trả về { data: [], totalPages: 5 }
      setProducts(data.data || []);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products by category:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [category, page]);

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Danh mục: {category}
      </h1>

      <ProductsSection
        title={`Sản phẩm trong ${category}`}
        subtitle={`Trang ${page}/${totalPages}`}
        products={products}
        formatPrice={formatPrice}
      />

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
