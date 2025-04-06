import MasterLayout from '@/components/layouts/MasterLayout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleViewArticle = () => {
    router.push("Register");
  };

  const sampleArticles = [
    {
      id: 1,
      title: "Máy bay Mỹ gặp sự cố, đánh rơi bia mục tiêu xuống nhà dân",
      image: "img/maybay.jpg",
      category: "Hàng Không",
      description: "Máy bay của tập đoàn quân sự tư nhân Mỹ đánh rơi bia mục tiêu xuống ngôi nhà ở tây nam nước Anh khi đang hạ cánh khẩn cấp.",
    },
    {
      id: 2,
      title: "Ukraine cáo buộc Nga tập kích bệnh viện quân y ở Kharkov",
      image: "img/nga.jpg",
      category: "Chiến Tranh - Chính Trị",
      description: "Kiev cáo buộc Moskva tập kích bằng máy bay không người lái nhằm vào bệnh viện quân y ở Kharkov, khiến binh sĩ Ukraine bị thương.",
    },
    {
      id: 3,
      title: "Cầu thủ xuất sắc nhất năm của FIFA gọi tên Mbappe",
      image: "img/mbappe.jpg",
      category: "Thể thao",
      description: "Mbappe được vinh danh là cầu thủ xuất sắc nhất năm của FIFA nhờ thành tích ấn tượng.",
    },
  ];

  return (
    <MasterLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}


        {/* Main Title */}
        <h2 className="text-9xl font-bold text-center">THE BLOG</h2>

        <hr className="border-gray-300 my-4" />

        {/* "Đăng Ký" Button */}
        <div className="flex justify-start">
          <button
            onClick={handleViewArticle}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            style={{ width: '10%' }}
          >
            Tài Khoản
          </button>
        </div>


        {/* Recent Blog Posts */}
        <h3 className="text-xl font-semibold mb-4">Recent blog posts</h3>
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-5 space-y-7">
            <img
              src="img/hinhcanphong.jpg"
              className="w-full h-60 rounded-lg transform hover:scale-110 transition duration-300 object-cover"
              alt="Office"
            />
            <div>
              <h1 className="text-blue-600 font-semibold leading-tight">Olivia Rhye • 1 Jan 2023</h1>
              <h3 className="text-lg font-bold leading-tight">UX review presentations</h3>
              <p className="text-gray-600">
                How do you create compelling presentations that wow your colleagues and impress your managers?
              </p>
            </div>
            <div className="mt-2 space-x-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">Design</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Research</span>
              <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs font-semibold rounded">Presentation</span>
            </div>
          </div>
          <div className="col-span-5 space-y-4">
            {sampleArticles.map((article) => (
              <div key={article.id} className="flex items-start">
                <div className="w-4/12">
                  <img
                    src={article.image}
                    className="w-full h-auto rounded-lg transform hover:scale-110 transition duration-300"
                    alt={article.title}
                  />
                </div>
                <div className="w-6/12 pl-4">
                  <p className="text-purple-600 font-semibold">Phoenix Baker • 1 Jan 2023</p>
                  <h4 className="text-lg font-bold">{article.title}</h4>
                  <p className="text-gray-600">{article.description}</p>
                  <div className="mt-2 space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}

      </div>
    </MasterLayout>
  );
}