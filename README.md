# DEVNEWS - WEBSITE TỔNG HỢP TIN TỨC CÔNG NGHỆ

## 1. GIỚI THIỆU
Devnews là website tổng hợp tin tức công nghệ từ nhiều nguồn uy tín như TechCrunch, The Verge, Wired. 
Dự án này cung cấp tính năng tóm tắt bài viết bằng AI và hỗ trợ đa ngôn ngữ, giúp người dùng 
dễ dàng tiếp cận thông tin công nghệ mới nhất.

## 2. TÍNH NĂNG CHÍNH
- Tổng hợp tin tức công nghệ theo thời gian thực
- Tóm tắt bài viết tự động bằng GeminiAI
- Hỗ trợ đa ngôn ngữ trên cùng một trang
- Truy cập trực tiếp đến nguồn bài viết gốc
- Bộ nhớ đệm Redis để tối ưu hiệu suất
- Giao diện tương thích với mọi thiết bị

## 3. CÔNG NGHỆ SỬ DỤNG
### Phần Frontend:
- Next.js
- React.js
- Tailwind CSS

### Phần Backend:
- Node.js
- Express.js
- MongoDB
- Redis

### Công nghệ AI và Dịch thuật:
- GeminiAI cho việc tóm tắt bài viết
- Google Translate API cho hỗ trợ đa ngôn ngữ

## 4. HƯỚNG DẪN CÀI ĐẶT
### Yêu cầu hệ thống:
- Node.js (phiên bản 18 trở lên)
- MongoDB
- Redis
- Khóa API của GeminiAI
- Khóa API của Google Translate

### Các bước cài đặt:
1. **Tải mã nguồn:**
   ```sh
   git clone https://github.com/yourusername/devnews.git
   ```
2. **Cài đặt các gói phụ thuộc:**
   ```sh
   npm install
   ```
3. **Thiết lập tệp môi trường:**
   Tạo tệp `.env` với các thông tin:
   ```env
   MONGODB_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_TRANSLATE_API_KEY=your_translate_api_key
   ```
4. **Chạy máy chủ phát triển:**
   ```sh
   npm run dev
   ```

## 5. KIẾN TRÚC HỆ THỐNG
- **Tầng Frontend:** Giao diện người dùng với Next.js
- **Tầng Backend:** API Express.js xử lý dữ liệu
- **Tầng Cơ sở dữ liệu:** MongoDB và Redis
- **Tầng AI:** Tích hợp GeminiAI

## 6. HƯỚNG PHÁT TRIỂN TƯƠNG LAI
- Tính năng cá nhân hóa nội dung
- Phát triển ứng dụng di động
- Cải thiện độ chính xác của AI
- Bổ sung thêm nhiều ngôn ngữ
- Tích hợp chia sẻ mạng xã hội

## 7. ĐÓNG GÓP
Mọi đóng góp đều được hoan nghênh. Vui lòng gửi Pull Request để đóng góp.

## 8. GIẤY PHÉP
Dự án này được cấp phép theo giấy phép MIT.

## 9. LIÊN HỆ
Link dự án: [https://github.com/yourusername/devnews](https://github.com/yourusername/devnews)

## 10. GHI CHÚ
Để biết thêm thông tin chi tiết về API và tài liệu kỹ thuật, vui lòng xem thư mục `/docs`.