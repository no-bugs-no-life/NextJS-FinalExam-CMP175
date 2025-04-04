import React, { useState, useEffect } from "react";

export default function LikeNews() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorite = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa bài báo này khỏi danh sách yêu thích?");
        if (confirmDelete) {
            const updatedFavorites = favorites.filter((article) => article.id !== id);
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            alert("Bài báo đã được xóa khỏi danh sách yêu thích!");
        }
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold">Danh Sách Yêu Thích</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {favorites.map((article) => (
                    <div key={article.id} className="bg-white p-4 shadow-lg rounded-lg">
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded" />
                        <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                        <p className="text-sm text-gray-500">{article.category}</p>
                        <p className="mt-2 text-gray-700">{article.description}</p>
                        <button
                            className="mt-4 px-6 py-3 bg-red-500 text-white rounded hover:opacity-75 text-xl block w-full"
                            onClick={() => handleRemoveFavorite(article.id)}
                        >
                            Xóa khỏi Yêu Thích
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}