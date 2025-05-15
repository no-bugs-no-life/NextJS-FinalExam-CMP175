import { useState, useEffect } from 'react';
import { articleService } from '@/services/articleService';
import Link from 'next/link';
import { format } from 'date-fns';

export default function FeaturedPost() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        console.log('[FeaturedPost] Fetching trending article...');
        const response = await articleService.getTrendingArticles(1);
        
        console.log('[FeaturedPost] API Response:', JSON.stringify(response, null, 2));
        
        const articles = articleService.getArticles(response);
        console.log('[FeaturedPost] Processed articles:', JSON.stringify(articles, null, 2));
        
        const featuredArticle = articles[0] || null;
        console.log('[FeaturedPost] Featured article:', JSON.stringify(featuredArticle, null, 2));
        
        setArticle(featuredArticle);
      } catch (err) {
        console.error('[FeaturedPost] Error:', err);
        setError(err.response?.data?.message || 'Failed to load featured article');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticle();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 p-8 rounded-lg animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 h-64 rounded-lg"></div>
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
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

  if (!article) {
    return (
      <div className="text-center text-gray-600 py-8">
        No featured article available
      </div>
    );
  }

  return (
    <Link href={`/bai-viet/${article.slug}`}>
      <div className="bg-gray-100 p-8 rounded-lg hover:bg-gray-50 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={article.thumbnail || 'https://via.placeholder.com/800x400'} 
              alt={article.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                {article.source?.name} • {format(new Date(article.publishedAt), 'd MMM yyyy')}
              </span>
              <span className="text-sm font-semibold text-indigo-600">
                {article.views} views
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
            <div className="space-x-2">
              {article.tags?.map((tag) => (
                <span key={tag._id} className="text-indigo-600">#{tag.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}