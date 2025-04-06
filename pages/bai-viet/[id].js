import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MasterLayout from '@/components/layouts/MasterLayout';

export default function ArticleDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState({
        title: 'Sample Article Title',
        author: 'John Doe',
        date: 'January 1, 2024',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        imageUrl: 'https://picsum.photos/800/400'
    });

    return (
        <MasterLayout>
            <article className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {/* Article Header */}
                    <header className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {article.title}
                        </h1>
                        <div className="text-gray-600">
                            <span>By {article.author}</span>
                            <span className="mx-2">•</span>
                            <span>{article.date}</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        {article.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-700 leading-relaxed mb-6">
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>

                    {/* Share and Tags Section */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="space-x-4">
                                <span className="text-gray-600">Share:</span>
                                <button className="text-gray-600 hover:text-gray-900">Twitter</button>
                                <button className="text-gray-600 hover:text-gray-900">Facebook</button>
                                <button className="text-gray-600 hover:text-gray-900">LinkedIn</button>
                            </div>
                            <div className="space-x-2">
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                    Technology
                                </span>
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                    Web Development
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map((item) => (
                                <div key={item} className="group cursor-pointer">
                                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                                        <img 
                                            src={`https://picsum.photos/400/225?random=${item}`}
                                            alt={`Related article ${item}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-lg group-hover:text-gray-600">
                                        Related Article Title {item}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </MasterLayout>
    );
}