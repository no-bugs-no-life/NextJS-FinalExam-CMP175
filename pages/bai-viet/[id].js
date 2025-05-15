import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MasterLayout from '@/components/layouts/MasterLayout';
import { articleService } from '@/services/articleService';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ArticleDetail() {
    const router = useRouter();
    const { id: slug } = router.query;
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticleData = async () => {
            if (!slug) return;

            try {
                console.log('Fetching article with slug:', slug);
                const articleResponse = await articleService.getArticleBySlug(slug);
                console.log('Article response:', articleResponse);

                if (articleResponse?.success && articleResponse?.data) {
                    console.log('Setting article data:', articleResponse.data);
                    setArticle(articleResponse.data);

                    try {
                        const relatedResponse = await articleService.getRelatedArticles(slug, 2);
                        console.log('Related articles response:', relatedResponse);
                        
                        if (relatedResponse?.success && relatedResponse?.data) {
                            setRelatedArticles(relatedResponse.data);
                        }
                    } catch (relatedError) {
                        console.error('Error fetching related articles:', relatedError);
                        // Don't set error state for related articles failure
                    }
                } else {
                    throw new Error('Invalid article data format');
                }
            } catch (err) {
                console.error('Error in fetchArticleData:', err);
                setError(err.message || 'Failed to load article');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            setLoading(true);
            setError(null);
            fetchArticleData();
        }
    }, [slug]);

    if (loading) {
        return (
            <MasterLayout>
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="animate-pulse space-y-8">
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        );
    }

    if (error) {
        return (
            <MasterLayout>
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="text-center text-red-600">
                        <h2 className="text-2xl font-bold mb-4">Error</h2>
                        <p>{error}</p>
                        <button 
                            onClick={() => router.back()} 
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </MasterLayout>
        );
    }

    if (!article) {
        return (
            <MasterLayout>
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="text-center text-gray-600">
                        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                        <button 
                            onClick={() => router.back()} 
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </MasterLayout>
        );
    }

    return (
        <MasterLayout>
            <article className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {/* Article Header */}
                    <header className="text-center space-y-4">
                        <div className="text-sm text-gray-600">
                            {article.category && (
                                <Link href={`/category/${article.category.slug}`}>
                                    <span className="text-indigo-600 hover:text-indigo-800">
                                        {article.category.name}
                                    </span>
                                </Link>
                            )}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            {article.title}
                        </h1>
                        <div className="text-gray-600 space-x-4">
                            {article.source && article.source.name && (
                                <span>From <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">{article.source.name}</a></span>
                            )}
                            <span>•</span>
                            <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
                            <span>•</span>
                            <span>{article.views} views</span>
                            {article.isCrawled && (
                                <>
                                    <span>•</span>
                                    <span>Crawled</span>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img 
                            src={article.thumbnail || 'https://via.placeholder.com/1200x630'} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Summary */}
                    <div className="text-xl text-gray-600 italic border-l-4 border-indigo-600 pl-4">
                        {article.summary}
                    </div>

                    {/* Article Content */}
                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags and Share Section */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="space-x-4">
                                <span className="text-gray-600">Share:</span>
                                <button 
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Twitter
                                </button>
                                <button 
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Facebook
                                </button>
                                <button 
                                    onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`, '_blank')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    LinkedIn
                                </button>
                            </div>
                            <div className="space-x-2">
                                {article.tags?.map((tag) => (
                                    <Link href={`/tag/${tag.slug}`} key={tag._id}>
                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200">
                                            #{tag.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="border-t border-gray-200 pt-8 mt-8">
                            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedArticles.map((relatedArticle) => (
                                    <Link href={`/bai-viet/${relatedArticle.slug}`} key={relatedArticle._id}>
                                        <div className="group cursor-pointer">
                                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                                                <img 
                                                    src={relatedArticle.thumbnail || 'https://via.placeholder.com/400x225'} 
                                                    alt={relatedArticle.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>
                                            <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-colors duration-200">
                                                {relatedArticle.title}
                                            </h3>
                                            <p className="text-gray-600 mt-2 line-clamp-2">
                                                {relatedArticle.summary}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </MasterLayout>
    );
}