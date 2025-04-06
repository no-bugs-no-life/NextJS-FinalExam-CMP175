import React, { useState, useEffect } from "react";

export default function LikeNews() {
    const [likedArticles, setLikedArticles] = useState([]);

    useEffect(() => {
        // Fetch liked articles from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setLikedArticles(storedFavorites);
    }, []);

    const handleRemoveFromFavorites = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa bài báo này khỏi danh sách yêu thích?");
        if (confirmDelete) {
            // Remove the article from the liked list
            const updatedFavorites = likedArticles.filter((article) => article.id !== id);
            setLikedArticles(updatedFavorites);

            // Update the favorites in localStorage
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            alert("Bài báo đã được xóa khỏi danh sách yêu thích!");
        }
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Danh Sách Yêu Thích</h1>
            {likedArticles.length === 0 ? (
                <p className="text-gray-500">Không có bài báo nào trong danh sách yêu thích.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {likedArticles.map((article) => (
                        <div key={article.id} className="bg-white p-4 shadow-lg rounded-lg">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                            <p className="text-sm text-gray-500">{article.category}</p>
                            <p className="mt-2 text-gray-700">{article.description}</p>
                            <button
                                className="mt-4 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 text-xl block w-full"
                                onClick={() => handleRemoveFromFavorites(article.id)}
                            >
                                Xóa Khỏi Yêu Thích
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}