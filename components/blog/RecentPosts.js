import { useState, useEffect } from 'react';
import { articleService } from '@/services/articleService';
import Link from 'next/link';
import { format } from 'date-fns';

export default function RecentPosts() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        console.log('[RecentPosts] Fetching recent articles...');
        const response = await articleService.getAllArticles({
          page: 1,
          limit: 3,
          sortBy: 'publishedAt',
          sortOrder: 'desc'
        });
        
        console.log('[RecentPosts] API Response:', JSON.stringify(response, null, 2));
        
        const recentArticles = articleService.getArticles(response);
        console.log('[RecentPosts] Recent articles:', JSON.stringify(recentArticles, null, 2));
        
        setArticles(recentArticles);
      } catch (err) {
        console.error('[RecentPosts] Error:', err);
        setError(err.response?.data?.message || 'Failed to load recent articles');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
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
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center text-gray-600 py-8">
        No recent articles available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link href={`/bai-viet/${article.slug}`} key={article._id}>
          <div className="group">
            <img 
              src={article.thumbnail || 'https://via.placeholder.com/400x200'} 
              alt={article.title} 
              className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity duration-300"
            />
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                {article.source?.name} • {format(new Date(article.publishedAt), 'd MMM yyyy')}
              </span>
              <span className="text-sm text-gray-500">
                {article.views} views
              </span>
            </div>
            <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
              {article.title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{article.summary}</p>
            <div className="mt-4 space-x-2">
              {article.tags?.map((tag) => (
                <span key={tag._id} className="text-indigo-600">#{tag.name}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}