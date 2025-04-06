import { useState, useEffect } from 'react';
import MasterLayout from '@/components/layouts/MasterLayout';
import axiosInstance from '@/configs/api';

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchArticles = async (search = '') => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/v1/articles${search ? `?search=${search}` : ''}`);
            if (response.result) {
                setArticles(response.data);
            }
        } catch (err) {
            setError('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchArticles(searchTerm);
    };

    return (
        <MasterLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-6">Danh sách bài viết</h1>
                    
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm bài viết..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Tìm kiếm
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {article.thumbnail && (
                                    <img
                                        src={article.thumbnail}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                        <a
                                            href={`/bai-viet/${article.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Đọc thêm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && articles.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy bài viết nào
                    </div>
                )}
            </div>
        </MasterLayout>
    );
}