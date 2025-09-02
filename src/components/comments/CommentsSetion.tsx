  import "./CommentsSection.css";
  const mockComments = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    content: "Sản phẩm rất đẹp, chất lượng tốt!",
    date: Date.now() - 86400000, // 1 ngày trước
  },
  {
    id: 2,
    name: "Trần Thị B",
    content: "Giao hàng nhanh, đóng gói cẩn thận.",
    date: Date.now() - 3600000, // 1 giờ trước
  },
  {
    id: 3,
    name: "Lê Văn C",
    content: "Màu sắc giống hình, nhưng size hơi nhỏ.",
    date: Date.now() - 7200000, // 2 giờ trước
  },
];


export default function CommentsSection() {
  return (
    <div className="comments-section">
      <h2>Bình luận</h2>
        {/* Form bình luận */}
        <div className="comment-form">
        <img
            src="https://i.pravatar.cc/50"
            alt="avatar"
            className="comment-avatar"
        />
        <textarea
            placeholder="Viết bình luận..."
            className="comment-input"
        ></textarea>
        <button type="submit" className="btn-submit-comment">
            Gửi
        </button>
        </div>


      {/* Danh sách bình luận */}
      <div className="comment-list">
        {mockComments.map((c) => (
          <div key={c.id} className="comment-item">
            <strong>{c.name}</strong> <span className="comment-date">{new Date(c.date).toLocaleString()}</span>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
    );
}