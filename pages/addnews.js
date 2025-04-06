import React, { useState } from "react";
import { useRouter } from "next/router";

export default function AddNews() {
    const [newArticle, setNewArticle] = useState({
        title: "",
        image: "",
        category: "",
        description: "",
    });
    const [error, setError] = useState(""); // Error message state
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error message when user types
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewArticle((prev) => ({ ...prev, image: event.target.result })); // Save image as base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddArticle = () => {
        // Validate inputs
        if (!newArticle.title || !newArticle.image || !newArticle.category || !newArticle.description) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const storedPendingArticles = JSON.parse(localStorage.getItem("pendingArticles")) || [];
        const updatedPendingArticles = [
            ...storedPendingArticles,
            {
                ...newArticle,
                id: Date.now(), // Unique ID
                color: "bg-green-500", // Default color
                buttonText: "❤️ Yêu thích", // Default button text
                isDefault: false, // Mark as user-added
            },
        ];
        localStorage.setItem("pendingArticles", JSON.stringify(updatedPendingArticles));
        alert("Bài báo mới đã được gửi chờ duyệt!");
        router.push("/wait"); // Redirect to the wait page
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold">Thêm Bài Báo Mới</h1>
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="Tiêu đề"
                    value={newArticle.title}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Danh mục"
                    value={newArticle.category}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Mô tả"
                    value={newArticle.description}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
                <button
                    type="button"
                    onClick={handleAddArticle}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                    style={{ width: '7%' }}
                >
                    Thêm
                </button>
            </form>
        </div>
    );
}