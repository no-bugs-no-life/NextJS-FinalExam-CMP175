import React, { useState, useEffect } from "react";

export default function BaiBao() {
    const defaultArticles = [
        {
            id: 1,
            title: "Máy bay Mỹ gặp sự cố, đánh rơi bia mục tiêu xuống nhà dân",
            image: "img/maybay.jpg",
            category: "Hàng Không",
            description: "Máy bay của tập đoàn quân sự tư nhân Mỹ đánh rơi bia mục tiêu xuống ngôi nhà ở tây nam nước Anh khi đang hạ cánh khẩn cấp.",
            color: "bg-red-500",
            buttonText: "❤️ Yêu thích",
            isDefault: true,
        },
        {
            id: 2,
            title: "Ukraine cáo buộc Nga tập kích bệnh viện quân y ở Kharkov",
            image: "img/nga.jpg",
            category: "Chiến Tranh - Chính Trị",
            description: "Kiev cáo buộc Moskva tập kích bằng máy bay không người lái nhằm vào bệnh viện quân y ở Kharkov, khiến binh sĩ Ukraine bị thương.",
            color: "bg-red-500",
            buttonText: "❤️ Yêu thích",
            isDefault: true,
        },
        {
            id: 3,
            title: "Cầu thủ xuất sắc nhất năm của FIFA gọi tên Mbappe",
            image: "img/mbappe.jpg",
            category: "Thể thao",
            description: "Mbappe được vinh danh là cầu thủ xuất sắc nhất năm của FIFA nhờ thành tích ấn tượng.",
            color: "bg-red-500",
            buttonText: "❤️ Yêu thích",
            isDefault: true,
        },
        {
            id: 4,
            category: "Công Nghệ",
            img: "img/dinhchi.jpg",
            title: "Nam sinh dùng AI qua mặt loạt công ty công nghệ bị đình chỉ học",
            content: "Mỹ - Đại học Columbia đình chỉ học một năm với Chungin \"Roy\" Lee, người tạo ra công cụ AI để gian lận ở vòng phỏng vấn của các công ty công nghệ",
            color: "yellow",
            isDefault: true,
        },
        {
            id: 5,
            category: "Chứng Khoán",
            img: "img/kinhte.jpg",
            title: "'Cá mập' PYN Elite Fund: Cổ phiếu công nghệ đang được định giá cao",
            content: "Quỹ ngoại PYN Elite Fund chốt lời cổ phiếu công nghệ như FPT và CMG vì có giá cao và cảnh báo thị trường về rủi ro bong bóng dotcom.",
            color: "purple",
            isDefault: true,
        },
        {
            id: 6,
            category: "Podcasts",
            img: "img/chualanh.jpg",
            title: "Nhiều người trẻ tỏ ra bận rộn vì áp lực sa thải",
            content: "Gõ bàn phím thật to, liên tục chạy ra hành lang nghe điện thoại dù đầu dây kia không có ai...",
            color: "red",
            isDefault: true,
        },
        {
            id: 7,
            category: "Podcasts",
            img: "img/tho.jpg",
            title: "Ngột ngạt với môi trường làm việc đến 'khó thở'",
            content: "Sau 7 tháng nhảy việc, tôi chưa thể làm quen được với môi trường mới...",
            color: "blue",
            isDefault: true,
        }
    ];

    const [articles, setArticles] = useState(defaultArticles);
    const [favorites, setFavorites] = useState([]);
    const [editArticle, setEditArticle] = useState(null);
    const [newArticle, setNewArticle] = useState({
        title: "",
        image: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        setArticles([...defaultArticles, ...storedArticles]);
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);


    const toggleFavorite = (article) => {
        const isFavorite = favorites.some((fav) => fav.id === article.id);
        let updatedFavorites;

        if (isFavorite) {
            const confirmDelete = window.confirm("Bạn có chắc muốn xóa bài báo này khỏi danh sách yêu thích?");
            if (confirmDelete) {
                updatedFavorites = favorites.filter((fav) => fav.id !== article.id);
                alert("Bài báo đã được xóa khỏi danh sách yêu thích!");
            } else {
                return; // Nếu người dùng hủy, không làm gì cả
            }
        } else {
            updatedFavorites = [...favorites, article];
            alert(`Bài báo "${article.title}" đã được thêm vào danh sách yêu thích!`);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        setArticles(
            articles.map((a) =>
                a.id === article.id
                    ? { ...a, buttonText: isFavorite ? "❤️ Yêu thích" : "💔 Bỏ thích" }
                    : a
            )
        );
    };

    const handleRemoveArticle = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa bài báo này?");
        if (confirmDelete) {
            const updatedArticles = articles.filter((article) => article.id !== id);
            setArticles(updatedArticles);
            localStorage.setItem(
                "articles",
                JSON.stringify(updatedArticles.filter((article) => !article.isDefault))
            );
        }
    };

    const handleEditArticle = (article) => {
        if (!article.isDefault) {
            window.location.href = `/updatenews?id=${article.id}`;
        } else {
            alert("Bạn không thể chỉnh sửa bài báo mặc định!");
        }
    };

    const handleUpdateArticle = () => {
        const updatedArticles = articles.map((article) =>
            article.id === editArticle.id ? { ...editArticle, ...newArticle } : article
        );
        setArticles(updatedArticles);
        localStorage.setItem(
            "articles",
            JSON.stringify(updatedArticles.filter((article) => !article.isDefault))
        );
        setEditArticle(null);
        setNewArticle({ title: "", image: "", category: "", description: "" });
    };

    return (
        <div className="px-6 py-8">

            <h1 className="text-3xl font-bold">Danh Sách Bài Báo</h1>

            <div
                className="add-article-btn bg-blue-500 text-white px-4 py-2 rounded mt-6 cursor-pointer block"
                onClick={() => (window.location.href = "/addnews")}
                style={{ width: '7%' }}
            >
                Thêm Bài Báo
            </div>

            <button
                className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 block"
                onClick={() => (window.location.href = "/likenews")}
                style={{ width: '7%' }}
            >
                Yêu Thích
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white p-4 shadow-lg rounded-lg">
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded" />
                        <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                        <p className="text-sm text-gray-500">{article.category}</p>
                        <p className="mt-2 text-gray-700">{article.description}</p>
                        <button
                            className={`mt-4 px-6 py-3 ${article.color} text-white rounded hover:opacity-75 text-xl block w-full`}
                            onClick={() => toggleFavorite(article)}
                            style={{ width: '25%' }}

                        >
                            {favorites.some((fav) => fav.id === article.id) ? "💔 Bỏ thích" : "❤️ Yêu thích"}
                        </button>
                        {!article.isDefault && (
                            <>
                                <button
                                    className="mt-4 px-6 py-3 bg-red-500 text-white rounded hover:opacity-75 text-xl block w-full"
                                    onClick={() => handleRemoveArticle(article.id)}
                                    style={{ width: '25%' }}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:opacity-75 text-xl block w-full"
                                    onClick={() => handleEditArticle(article)}
                                    style={{ width: '25%' }}
                                >
                                    Sửa
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {editArticle && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Bài Báo</h2>
                    <form>
                        <input
                            type="text"
                            name="title"
                            placeholder="Tiêu đề"
                            value={newArticle.title}
                            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="URL ảnh"
                            value={newArticle.image}
                            onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Danh mục"
                            value={newArticle.category}
                            onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <textarea
                            name="description"
                            placeholder="Mô tả"
                            value={newArticle.description}
                            onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={handleUpdateArticle}
                            className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Cập nhật
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}