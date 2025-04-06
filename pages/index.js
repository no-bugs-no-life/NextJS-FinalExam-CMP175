import MasterLayout from '@/components/layouts/MasterLayout'
import RecentPosts from '@/components/blog/RecentPosts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import Pagination from '@/components/common/Pagination'

export default function Home() {
  return (
    <MasterLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-4">THE BLOG</h1>
          <p className="text-xl text-gray-600">Recent blog posts</p>
        </div>

        <section className="mb-16">
          <RecentPosts />
        </section>

        <section className="mb-16">
          <FeaturedPost />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8">All blog posts</h2>
          <BlogGrid />
        </section>

        <Pagination />
      </div>
    </MasterLayout>
  );
}