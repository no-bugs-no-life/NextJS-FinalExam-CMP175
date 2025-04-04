import MasterLayout from '@/components/layouts/MasterLayout';
import { useRouter } from 'next/router'; // Import useRouter

export default function Home() {
  const router = useRouter(); // Khởi tạo router

  const handleViewArticle = () => {
    router.push("Register"); // Chuyển đến trang bai-bao.js
  };

  return (
    <MasterLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold">Welcome to DevNews</h1>
        <p className="mt-4">Your source for the latest technology news</p>

        {/* Nút chuyển đến trang baiba0.js */}
        <button
          onClick={handleViewArticle}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          style={{ width: '13%' }}
        >
          Đăng Ký Tài Khoản
        </button>
      </div>
    </MasterLayout>
  );
}
