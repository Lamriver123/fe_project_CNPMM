
# UTEShop Frontend

> **Frontend cho hệ thống thương mại điện tử** được xây dựng với React + TypeScript, Redux Toolkit và các thư viện UI hiện đại.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple.svg)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Tổng quan

Đây là frontend của một dự án e-commerce hoàn chỉnh, cung cấp giao diện người dùng cho cả khách hàng và quản trị viên. Ứng dụng được xây dựng với các công nghệ hiện đại và tuân thủ best practices.

### Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **React** | 19.1.1 | Framework chính |
| **TypeScript** | 4.9 | Ngôn ngữ lập trình |
| **Redux Toolkit** | 2.8.2 | Quản lý state |
| **React Router** | 7.8.2 | Điều hướng |
| **Axios** | 1.11.0 | HTTP client |
| **Ant Design** | 5.27.3 | UI components |
| **Bootstrap** | 5.3.7 | CSS framework |
| **Tailwind CSS** | 4.1.13 | Utility-first CSS |
| **Socket.io** | 4.8.1 | WebSocket real-time |
| **Framer Motion** | 12.23.12 | Animation library |

### Tính năng chính

#### Phần Client
-  **Trang chủ** - Hiển thị sản phẩm nổi bật, danh mục
-  **Cửa hàng** - Duyệt và tìm kiếm sản phẩm
-  **Chi tiết sản phẩm** - Xem thông tin, đánh giá, thêm giỏ hàng
-  **Giỏ hàng** - Quản lý sản phẩm, cập nhật số lượng
-  **Thanh toán** - Quy trình checkout hoàn chỉnh
-  **Hồ sơ cá nhân** - Quản lý thông tin, đơn hàng, đánh giá
-  **Đơn hàng** - Theo dõi trạng thái đơn hàng

####  Phần Admin
-  **Dashboard** - Thống kê tổng quan với biểu đồ
-  **Quản lý sản phẩm** - CRUD sản phẩm, danh mục
-  **Quản lý đơn hàng** - Xem và cập nhật trạng thái đơn hàng
-  **Quản lý người dùng** - Thông tin và phân quyền user
-  **Báo cáo** - Thống kê doanh thu, sản phẩm bán chạy

##  Mục tiêu đồ án

Đồ án này là một **hệ thống thương mại điện tử hoàn chỉnh** gồm hai phần chính:
- **Frontend** (dự án này): Giao diện người dùng được xây dựng với React + TypeScript
- **Backend**: API server cung cấp dữ liệu và xử lý logic nghiệp vụ

###  Mục tiêu chính

1. **Tạo ứng dụng e-commerce đầy đủ chức năng** cho người dùng cuối
2. **Xây dựng hệ thống quản trị** mạnh mẽ cho admin
3. **Áp dụng các công nghệ hiện đại** và best practices
4. **Đảm bảo trải nghiệm người dùng tốt** với giao diện responsive

###  Tính năng đã triển khai

####  Xác thực & Bảo mật
- Đăng ký/đăng nhập với validation
- Xác thực OTP qua email/SMS
- Quản lý mật khẩu và đổi mật khẩu
- Phân quyền user/admin
- JWT token authentication

####  Trải nghiệm mua sắm
- Duyệt sản phẩm theo danh mục
- Tìm kiếm và lọc sản phẩm
- Xem chi tiết sản phẩm với hình ảnh
- Đánh giá và bình luận sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Quản lý giỏ hàng (thêm/xóa/cập nhật)

####  Thanh toán & Đơn hàng
- Quy trình checkout hoàn chỉnh
- Quản lý địa chỉ giao hàng
- Tích hợp cổng thanh toán
- Theo dõi trạng thái đơn hàng
- Lịch sử đơn hàng

####  Quản lý cá nhân
- Hồ sơ cá nhân
- Quản lý địa chỉ
- Lịch sử mua hàng
- Danh sách yêu thích
- Đánh giá sản phẩm

####  Hệ thống Admin
- Dashboard với thống kê tổng quan
- Quản lý sản phẩm (CRUD)
- Quản lý đơn hàng
- Quản lý người dùng
- Báo cáo và thống kê

###  Real-time Features
- Thông báo real-time với Socket.io
- Cập nhật trạng thái đơn hàng
- Thông báo khuyến mãi

##  Bắt đầu nhanh

###  Yêu cầu hệ thống

- **Node.js** >= 16.0.0 (khuyến nghị 18.x hoặc 20.x)
- **npm** >= 8.0.0 hoặc **yarn** >= 1.22.0
- **Git** để clone repository

###  Cài đặt và chạy

#### 1. Clone repository
```bash
git clone <repository-url>
cd FE-FINAL
```

#### 2. Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

#### 3. Cấu hình biến môi trường
Tạo file `.env.local` trong thư mục gốc:
```env
REACT_APP_API_URL=http://localhost:6969/v1/api
REACT_APP_SOCKET_URL=http://localhost:6969
```

#### 4. Chạy ứng dụng
```bash
# Development mode
npm start
# hoặc
yarn start
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

#### 5. Build cho production
```bash
npm run build
# hoặc
yarn build
```

#### 6. Chạy tests
```bash
npm test
# hoặc
yarn test
```

### 🔧 Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm start` | Chạy ứng dụng ở chế độ development |
| `npm run build` | Build ứng dụng cho production |
| `npm test` | Chạy test suite |
| `npm run eject` | Eject Create React App (không thể hoàn tác) |

## 📁 Cấu trúc dự án

```
src/
├── 📁 api/                    # API clients và configuration
│   ├── axiosClient.ts         # Axios configuration
│   ├── authApi.ts            # Authentication APIs
│   ├── productApi.ts         # Product APIs
│   ├── orderApi.ts           # Order APIs
│   └── ...
├── 📁 components/             # Reusable components
│   ├── 📁 layout/            # Layout components
│   │   ├── Header.tsx        # Main header
│   │   ├── Footer.tsx        # Footer
│   │   ├── Navbar.tsx        # Navigation
│   │   └── 📁 Admin/         # Admin layout
│   ├── 📁 forms/             # Form components
│   ├── 📁 cart/              # Shopping cart components
│   ├── 📁 products/          # Product components
│   └── 📁 profile/           # Profile components
├── 📁 pages/                  # Page components
│   ├── 📁 auth/              # Authentication pages
│   ├── 📁 products/          # Product pages
│   ├── 📁 cart/              # Cart page
│   ├── 📁 profile/           # Profile pages
│   └── 📁 Admin/             # Admin pages
├── 📁 hooks/                  # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useCart.ts            # Cart management hook
│   └── useProfile.ts         # Profile management hook
├── 📁 redux/                  # Redux store và slices
│   ├── store.ts              # Redux store configuration
│   └── authSlice.ts          # Authentication slice
├── 📁 types/                  # TypeScript type definitions
│   ├── User.ts               # User types
│   ├── Product.ts            # Product types
│   ├── Order.ts              # Order types
│   └── ...
├── 📁 utils/                  # Utility functions
│   ├── format.ts             # Formatting utilities
│   └── socket.ts             # Socket.io utilities
└── App.tsx                    # Main App component
```

## ⚙️ Cấu hình môi trường

### Biến môi trường

Tạo file `.env.local` trong thư mục gốc:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:6969/v1/api
REACT_APP_SOCKET_URL=http://localhost:6969

# Optional: Other configurations
REACT_APP_APP_NAME=E-Commerce App
REACT_APP_VERSION=1.0.0
```

### Cấu hình API

Hiện tại API base URL được cấu hình trong `src/api/axiosClient.ts`. Để sử dụng biến môi trường:

```typescript
// src/api/axiosClient.ts
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:6969/v1/api';
```
