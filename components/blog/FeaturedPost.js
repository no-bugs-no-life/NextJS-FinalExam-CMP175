export default function FeaturedPost() {
  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src="https://vietair.com.vn/Media/Images/cau-song-han-ve-dem.jpg?p=1&w=790" alt="Climate Change" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Climate Endgame: Exploring catastrophic climate change scenarios</h3>
          <p className="text-gray-600 mb-4">Understanding the potential consequences of extreme climate events and their impact on global systems.</p>
          <div className="space-x-2">
            <span className="text-blue-600">#Climate</span>
            <span className="text-green-600">#Research</span>
          </div>
        </div>
      </div>
    </div>
  );
}