import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-600">
          <span>© {currentYear}</span>
          
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            Twitter
          </Link>
          
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            LinkedIn
          </Link>
          
          <Link href="mailto:contact@devnews.com" className="hover:text-gray-900">
            Email
          </Link>
          
          <Link href="/rss" className="hover:text-gray-900">
            RSS feed
          </Link>
          
          <Link href="https://feedly.com/i/add?url=https://devnews.com/rss" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            Add to Feedly
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;