import React, { useState, useEffect } from "react";

export default function SearchNews() {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        // Load articles from localStorage
        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        setArticles(storedArticles);
        setFilteredArticles(storedArticles); // Initially show all articles
    }, []);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        // Filter articles by title or category
        const filtered = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Tìm Kiếm Bài Báo</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm (tiêu đề hoặc danh mục)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 w-full border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="mt-2 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Tìm Kiếm
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <div key={article.id} className="bg-white p-4 shadow-lg rounded-lg">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                            <p className="text-sm text-gray-500">{article.category}</p>
                            <p className="mt-2 text-gray-700">{article.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Không tìm thấy bài báo nào phù hợp.</p>
                )}
            </div>
        </div>
    );
}