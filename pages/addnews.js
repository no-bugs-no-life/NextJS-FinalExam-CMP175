import React, { useState } from "react";
import { useRouter } from "next/router";

export default function AddNews() {
    const [newArticle, setNewArticle] = useState({
        title: "",
        image: "",
        category: "",
        description: "",
    });
    const [error, setError] = useState(""); // Biến lưu thông báo lỗi
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle((prev) => ({ ...prev, [name]: value }));
        setError(""); // Xóa thông báo lỗi khi người dùng nhập
    };

    const handleAddArticle = () => {
        // Kiểm tra nếu bất kỳ trường nào để trống
        if (!newArticle.title || !newArticle.image || !newArticle.category || !newArticle.description) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const updatedArticles = [
            ...storedArticles,
            {
                ...newArticle,
                id: Date.now(),
                color: "bg-green-500",
                buttonText: "❤️ Yêu thích",
                isDefault: false,
            },
        ];
        localStorage.setItem("articles", JSON.stringify(updatedArticles));
        alert("Bài báo mới đã được thêm!");
        router.push("/bai-bao");
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
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setNewArticle({ ...newArticle, image: event.target.result }); // Lưu nội dung hình ảnh dưới dạng base64
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
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
                {error && <p className="text-red-500 mb-2">{error}</p>} {/* Hiển thị thông báo lỗi */}
                <button
                    type="button"
                    onClick={handleAddArticle}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                    style={{ width: '3.5%' }}
                >
                    Thêm
                </button>
            </form>
        </div>
    );
}