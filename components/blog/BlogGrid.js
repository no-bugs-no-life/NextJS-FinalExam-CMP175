export default function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="rounded-lg overflow-hidden">
        <img src="https://vietair.com.vn/Media/Images/cau-song-han-ve-dem.jpg?p=1&w=790" alt="Blog post" className="w-full h-48 object-cover" />
        <div className="p-4">
          <span className="text-sm text-gray-500">Steve Jobs • 1 Jan 2024</span>
          <h3 className="text-xl font-bold mt-2">Bill Walsh leadership lessons</h3>
          <p className="text-gray-600 mt-2">Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</p>
          <div className="mt-4 space-x-2">
            <span className="text-indigo-600">#Leadership</span>
            <span className="text-gray-600">#Management</span>
          </div>
        </div>
      </div>
    </div>
  );
}