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
    ];

    const [articles, setArticles] = useState(defaultArticles);
    const [favorites, setFavorites] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null); // Track the article being edited
    const [editForm, setEditForm] = useState({
        title: "",
        category: "",
        description: "",
        image: "",
    });
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredArticles, setFilteredArticles] = useState(defaultArticles); // State for filtered articles

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const combinedArticles = [...defaultArticles, ...storedArticles];
        setArticles(combinedArticles);
        setFilteredArticles(combinedArticles); // Initially show all articles

        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter articles by title or category
        const filtered = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query)
        );
        setFilteredArticles(filtered);
    };

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
    };

    const handleRemoveArticle = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa bài báo này?");
        if (confirmDelete) {
            // Remove the article from the articles list
            const updatedArticles = articles.filter((article) => article.id !== id);
            setArticles(updatedArticles);
            setFilteredArticles(updatedArticles); // Update filtered articles
            localStorage.setItem(
                "articles",
                JSON.stringify(updatedArticles.filter((article) => !article.isDefault))
            );

            // Also remove the article from the favorites list
            const updatedFavorites = favorites.filter((fav) => fav.id !== id);
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            alert("Bài báo đã được xóa!");
        }
    };

    const handleEditArticle = (article) => {
        setEditingArticle(article.id); // Set the article being edited
        setEditForm({
            title: article.title,
            category: article.category,
            description: article.description,
            image: article.image,
        });
    };

    const handleSaveEdit = () => {
        const updatedArticles = articles.map((article) =>
            article.id === editingArticle
                ? { ...article, ...editForm }
                : article
        );
        setArticles(updatedArticles);

        // Reapply the search filter after saving
        const filtered = updatedArticles.filter(
            (article) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArticles(filtered);

        localStorage.setItem(
            "articles",
            JSON.stringify(updatedArticles.filter((article) => !article.isDefault))
        );

        // Update the favorites list if the edited article is in favorites
        const updatedFavorites = favorites.map((fav) =>
            fav.id === editingArticle
                ? { ...fav, ...editForm }
                : fav
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        setEditingArticle(null); // Exit editing mode
        alert("Bài báo đã được cập nhật!");
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditForm((prev) => ({ ...prev, image: event.target.result })); // Update the image in the edit form
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold">Danh Sách Bài Báo</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm (tiêu đề hoặc danh mục)..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 mb-4 w-full border border-gray-300 rounded"
            />

            <div className="flex justify-between mt-4">
                <div
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => (window.location.href = "/info")}
                    style={{ width: '15%' }}
                >
                    👨‍🦰Thông tin
                </div>

                <div
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => (window.location.href = "/addnews")}
                    style={{ width: '15%' }}
                >
                    ➕Thêm Báo
                </div>

                <div
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => (window.location.href = "/likenews")}
                    style={{ width: '15%' }}
                >
                    ♥️ Yêu Thích
                </div>
                <div
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => (window.location.href = "/wait")}
                    style={{ width: '15%' }}
                >
                    ⏳ Danh Sách Chờ Duyệt
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white p-4 shadow-lg rounded-lg">
                        {editingArticle === article.id ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditInputChange}
                                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                                    placeholder="Tiêu đề"
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={editForm.category}
                                    onChange={handleEditInputChange}
                                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                                    placeholder="Danh mục"
                                />
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditInputChange}
                                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                                    placeholder="Mô tả"
                                />
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                                />
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Lưu
                                </button>
                            </div>
                        ) : (
                            <>
                                <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded" />
                                <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                                <p className="text-sm text-gray-500">{article.category}</p>
                                <p className="mt-2 text-gray-700">{article.description}</p>
                                <button
                                    className={`mt-4 px-6 py-3 ${article.color} text-white rounded hover:opacity-75 text-xl block w-full`}
                                    onClick={() => toggleFavorite(article)}
                                    style={{ width: '40%' }}
                                >
                                    {favorites.some((fav) => fav.id === article.id) ? "💔 Bỏ thích" : "❤️ Yêu thích"}
                                </button>
                                {!article.isDefault && (
                                    <>
                                        <button
                                            className="mt-4 px-6 py-3 bg-red-500 text-white rounded hover:opacity-75 text-xl block w-full"
                                            onClick={() => handleRemoveArticle(article.id)}
                                            style={{ width: '40%' }}
                                        >
                                            Xóa
                                        </button>
                                        <button
                                            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:opacity-75 text-xl block w-full"
                                            onClick={() => handleEditArticle(article)}
                                            style={{ width: '40%' }}
                                        >
                                            Sửa
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}