import axiosInstance from '@/configs/api';

export const articleService = {
    getAllArticles: async (params = {}) => {
        try {
            const response = await axiosInstance.get('/articles', { params });
            return response.data;
        } catch (error) {
            console.error('[ArticleService] getAllArticles error:', error);
            throw error;
        }
    },

    getTrendingArticles: async (limit = 5) => {
        try {
            const response = await axiosInstance.get('/articles/trending', { params: { limit } });
            return response.data;
        } catch (error) {
            console.error('[ArticleService] getTrendingArticles error:', error);
            throw error;
        }
    },

    getArticleBySlug: async (slug) => {
        try {
            console.log('[ArticleService] Fetching article with slug:', slug);
            const response = await axiosInstance.get(`/articles/slug/${slug}`);
            const articleData = response.data;
            console.log('[ArticleService] Article response:', articleData);

            // Handle both wrapped and unwrapped response formats
            if (articleData.success && articleData.data) {
                return articleData;
            } else if (articleData._id) { // Direct article object
                return {
                    success: true,
                    message: 'Article retrieved successfully',
                    data: articleData
                };
            } else {
                throw new Error('Invalid article data format');
            }
        } catch (error) {
            console.error('[ArticleService] getArticleBySlug error:', error);
            throw error;
        }
    },

    getArticleById: async (id) => {
        try {
            const response = await axiosInstance.get(`/articles/${id}`);
            return response.data;
        } catch (error) {
            console.error('[ArticleService] getArticleById error:', error);
            throw error;
        }
    },

    getRelatedArticles: async (slug, limit = 5) => {
        try {
            console.log('[ArticleService] Fetching related articles for slug:', slug);
            const response = await axiosInstance.get(`/articles/slug/${slug}/related`, { params: { limit } });
            const relatedData = response.data;
            console.log('[ArticleService] Related articles response:', relatedData);

            // Handle both wrapped and unwrapped response formats
            if (relatedData.success && relatedData.data) {
                return relatedData;
            } else if (Array.isArray(relatedData)) { // Direct array of articles
                return {
                    success: true,
                    message: 'Related articles retrieved successfully',
                    data: relatedData
                };
            } else {
                throw new Error('Invalid related articles data format');
            }
        } catch (error) {
            console.error('[ArticleService] getRelatedArticles error:', error);
            throw error;
        }
    },

    getPagination: (response) => {
        // For paginated responses
        if (response?.pagination) {
            return response.pagination;
        }
        // For responses with data.pagination
        if (response?.data?.pagination) {
            return response.data.pagination;
        }
        return {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0
        };
    },

    getArticles: (response) => {
        console.log('[ArticleService] Processing response:', JSON.stringify(response, null, 2));
        
        // For direct array responses (trending)
        if (Array.isArray(response)) {
            return response;
        }

        // For paginated responses with articles array
        if (response?.articles && Array.isArray(response.articles)) {
            return response.articles;
        }

        // For responses with data.articles
        if (response?.data?.articles && Array.isArray(response.data.articles)) {
            return response.data.articles;
        }

        // For single article response
        if (response?.data && !Array.isArray(response.data)) {
            return [response.data];
        }

        return [];
    }
}; 