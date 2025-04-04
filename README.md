# DEVNEWS - WEBSITE TIN TỨC CÔNG NGHỆ

## 1. GIỚI THIỆU
Website tổng hợp tin tức công nghệ sử dụng Next.js, hiển thị dữ liệu từ API bên ngoài với giao diện hiện đại và đa ngôn ngữ.

## 2. CÔNG NGHỆ SỬ DỤNG
- Next.js 14 (App Router)
- React.js 18
- Tailwind CSS
- React Query
- next-i18next

## 3. CẤU TRÚC DỰ ÁN
```
devnews/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── article/[id]/page.tsx
│   │   └── category/[category]/page.tsx
├── components/
│   ├── ArticleCard.tsx
│   ├── ArticleGrid.tsx
│   ├── Header.tsx
├── lib/
│   ├── api.ts
├── hooks/
│   ├── useArticles.ts
```

## 4. HƯỚNG DẪN CÀI ĐẶT

1. **Clone dự án:**
   ```sh
   git clone https://github.com/yourusername/devnews.git
   cd devnews
   ```

2. **Cài đặt dependencies:**
   ```sh
   npm install
   ```

3. **Thiết lập .env.local:**
   ```
   NEXT_PUBLIC_NEWS_API_URL=https://api.example.com/news
   NEXT_PUBLIC_API_KEY=your_api_key
   ```

4. **Chạy môi trường phát triển:**
   ```sh
   npm run dev
   ```

5. **Build cho production:**
   ```sh
   npm run build
   npm start
   ```

## 5. TÍNH NĂNG CHÍNH
- Hiển thị tin tức từ API
- Phân trang và tìm kiếm bài viết
- Lọc theo danh mục
- Hỗ trợ đa ngôn ngữ (Việt-Anh)
- Chế độ sáng/tối
- Tối ưu SEO

## 6. LƯU Ý KHI TRIỂN KHAI
- Đảm bảo API key hợp lệ
- Cấu hình Next.js cho SSR/ISR phù hợp
- Tối ưu hóa hình ảnh với Next/Image