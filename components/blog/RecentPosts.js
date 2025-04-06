export default function RecentPosts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* First Post */}
      <div className="col-span-1">
        <img src="https://vietair.com.vn/Media/Images/cau-song-han-ve-dem.jpg?p=1&w=790" alt="UX Review" className="w-full h-48 object-cover rounded-lg mb-4" />
        <span className="text-sm text-gray-500">Oliver Style • 1 Jan 2024</span>
        <h3 className="text-xl font-bold mt-2 mb-2">UX review presentations</h3>
        <p className="text-gray-600">How do you create compelling presentations that wow your colleagues and impress your managers?</p>
        <div className="mt-4 space-x-2">
          <span className="text-blue-600">#Design</span>
          <span className="text-purple-600">#Research</span>
        </div>
      </div>
      
      {/* Similar structure for other recent posts */}
    </div>
  );
}