# DEVNEWS - WEBSITE TIN TỨC CÔNG NGHỆ

## 1. GIỚI THIỆU
Website tin tức công nghệ sử dụng Next.js, cho phép người dùng đọc và tương tác với các bài viết công nghệ. Hệ thống bao gồm quản lý người dùng, xác thực, và tương tác với bài viết.

## 2. CÔNG NGHỆ SỬ DỤNG

### Frontend
- **Next.js 13**: Framework React cho phép Server-Side Rendering và Static Site Generation
- **React 18**: Thư viện UI cho phép xây dựng giao diện người dùng tương tác
- **Tailwind CSS**: Framework CSS utility-first cho phép tạo giao diện nhanh chóng và tùy biến
- **Zustand**: Thư viện quản lý state đơn giản và hiệu quả, được sử dụng cho quản lý authentication
- **Axios**: Thư viện HTTP client cho phép giao tiếp với API

### Authentication & Authorization
- **JWT (JSON Web Tokens)**: Cơ chế xác thực người dùng
- **Local Storage**: Lưu trữ token xác thực
- **Protected Routes**: Bảo vệ các trang yêu cầu đăng nhập

### Development Tools
- **ESLint**: Công cụ phân tích code tĩnh để đảm bảo chất lượng code
- **Prettier**: Code formatter để duy trì style code nhất quán

## 3. CẤU TRÚC DỰ ÁN
```
project/
├── components/
│   ├── layouts/
│   │   ├── MasterLayout.js
│   │   └── Navbar.js
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── dang-nhap.js
│   ├── dang-ky.js
│   ├── trang-ca-nhan.js
│   └── bai-viet/
│       └── index.js
├── store/
│   └── useAuthStore.js
├── configs/
│   └── api.js
└── styles/
    └── globals.css
```

## 4. TÍNH NĂNG CHÍNH

### Xác thực người dùng
- Đăng nhập/Đăng ký tài khoản
- Xác thực JWT
- Bảo vệ route người dùng

### Quản lý người dùng
- Xem và cập nhật thông tin cá nhân
- Đăng xuất

### Quản lý bài viết
- Xem danh sách bài viết
- Tìm kiếm bài viết
- Hiển thị chi tiết bài viết

### Giao diện
- Responsive design
- Navigation bar thích ứng
- Loading states
- Error handling

## 5. HƯỚNG DẪN CÀI ĐẶT

1. **Clone dự án:**
```bash
git clone <repository-url>
cd <project-folder>
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Thiết lập môi trường:**
Tạo file `.env.local`:
```
NEXT_PUBLIC_API_URL=http://your-api-url
```

4. **Chạy development server:**
```bash
npm run dev
```

## 6. LƯU Ý TRIỂN KHAI
- Đảm bảo API endpoint được cấu hình đúng trong môi trường production
- Kiểm tra xử lý lỗi và validation
- Tối ưu performance với React.memo và useMemo khi cần thiết
- Đảm bảo bảo mật cho JWT tokens
```