import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function UpdateNews() {
    const router = useRouter();
    const { id } = router.query; // Lấy ID bài báo từ URL
    const [article, setArticle] = useState(null);
    const [updatedArticle, setUpdatedArticle] = useState({
        title: "",
        image: "",
        category: "",
        description: "",
    });

    // Lấy thông tin bài báo từ localStorage khi trang được tải
    useEffect(() => {
        if (id) {
            const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
            const foundArticle = storedArticles.find((article) => article.id === parseInt(id));
            if (foundArticle) {
                setArticle(foundArticle);
                setUpdatedArticle(foundArticle);
            } else {
                alert("Không tìm thấy bài báo!");
                router.push("/bai-bao");
            }
        }
    }, [id, router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedArticle((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUpdatedArticle((prev) => ({ ...prev, image: event.target.result })); // Lưu nội dung hình ảnh dưới dạng base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = () => {
        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const updatedArticles = storedArticles.map((article) =>
            article.id === parseInt(id) ? { ...article, ...updatedArticle } : article
        );
        localStorage.setItem("articles", JSON.stringify(updatedArticles));
        alert("Bài báo đã được cập nhật!");
        router.push("/bai-bao");
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold">Chỉnh Sửa Bài Báo</h1>
            {article ? (
                <form>
                    <input
                        type="text"
                        name="title"
                        placeholder="Tiêu đề"
                        value={updatedArticle.title}
                        onChange={handleInputChange}
                        className="p-2 mb-2 w-full border border-gray-300 rounded"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="p-2 mb-2 w-full border border-gray-300 rounded"
                    />
                    {updatedArticle.image && (
                        <img
                            src={updatedArticle.image}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                    )}
                    <input
                        type="text"
                        name="category"
                        placeholder="Danh mục"
                        value={updatedArticle.category}
                        onChange={handleInputChange}
                        className="p-2 mb-2 w-full border border-gray-300 rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Mô tả"
                        value={updatedArticle.description}
                        onChange={handleInputChange}
                        className="p-2 mb-2 w-full border border-gray-300 rounded"
                    />
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Cập nhật
                    </button>
                </form>
            ) : (
                <p>Đang tải thông tin bài báo...</p>
            )}
        </div>
    );
}