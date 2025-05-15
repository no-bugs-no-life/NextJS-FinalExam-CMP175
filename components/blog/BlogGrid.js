import { useState, useEffect } from "react";
import { articleService } from "@/services/articleService";
import Link from "next/link";
import { format } from "date-fns";

export default function BlogGrid() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("[BlogGrid] Fetching articles...");
        const response = await articleService.getAllArticles({
          page: 1,
          limit: 9,
        });

        console.log("[BlogGrid] API Response:", JSON.stringify(response, null, 2));

        const articlesData = articleService.getArticles(response);
        const paginationData = articleService.getPagination(response);

        console.log("[BlogGrid] Articles data:", JSON.stringify(articlesData, null, 2));
        console.log("[BlogGrid] Pagination:", JSON.stringify(paginationData, null, 2));

        setArticles(articlesData);
        setPagination(paginationData);
      } catch (err) {
        console.error("[BlogGrid] Error:", err);
        setError(err.response?.data?.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  if (!articles.length) {
    return (
      <div className="text-center text-gray-600 py-8">No articles found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link href={`/bai-viet/${article.slug}`} key={article._id}>
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={article.thumbnail || "https://via.placeholder.com/400x200"}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {article.source?.name} •{" "}
                  {format(new Date(article.publishedAt), "d MMM yyyy")}
                </span>
                <span className="text-sm text-gray-500">
                  {article.views} views
                </span>
              </div>
              <h3 className="text-xl font-bold mt-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4 space-x-2">
                {article.tags?.map((tag) => (
                  <span key={tag._id} className="text-indigo-600">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
