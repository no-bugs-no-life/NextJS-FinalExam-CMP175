import React, { useState, useEffect } from "react";

export default function Wait() {
    const [pendingArticles, setPendingArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null); // Track the article being edited
    const [editForm, setEditForm] = useState({
        title: "",
        category: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        // Load pending articles from localStorage
        const storedPendingArticles = JSON.parse(localStorage.getItem("pendingArticles")) || [];
        setPendingArticles(storedPendingArticles);
    }, []);

    const handleApprove = (article) => {
        // Move the article from pending to approved
        const updatedPendingArticles = pendingArticles.filter((item) => item.id !== article.id);
        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const updatedArticles = [...storedArticles, article];

        setPendingArticles(updatedPendingArticles);
        localStorage.setItem("pendingArticles", JSON.stringify(updatedPendingArticles));
        localStorage.setItem("articles", JSON.stringify(updatedArticles));

        alert(`Bài báo "${article.title}" đã được duyệt!`);
    };

    const handleReject = (articleId) => {
        // Remove the article from pending
        const updatedPendingArticles = pendingArticles.filter((item) => item.id !== articleId);
        setPendingArticles(updatedPendingArticles);
        localStorage.setItem("pendingArticles", JSON.stringify(updatedPendingArticles));

        alert("Bài báo đã bị từ chối!");
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
        const updatedPendingArticles = pendingArticles.map((article) =>
            article.id === editingArticle
                ? { ...article, ...editForm }
                : article
        );
        setPendingArticles(updatedPendingArticles);
        localStorage.setItem("pendingArticles", JSON.stringify(updatedPendingArticles));

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
            <h1 className="text-3xl font-bold mb-6">Danh Sách Bài Báo Chờ Duyệt</h1>
            {pendingArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingArticles.map((article) => (
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
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-40 object-cover rounded"
                                    />
                                    <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                                    <p className="text-sm text-gray-500">{article.category}</p>
                                    <p className="mt-2 text-gray-700">{article.description}</p>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={() => handleApprove(article)}
                                        >
                                            Duyệt
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={() => handleReject(article.id)}
                                        >
                                            Từ Chối
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => handleEditArticle(article)}
                                        >
                                            Sửa
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Không có bài báo nào đang chờ duyệt.</p>
            )}
        </div>
    );
}