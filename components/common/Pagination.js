export default function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Previous</button>
      <div className="flex space-x-2">
        <button className="px-3 py-1 rounded bg-gray-900 text-white">1</button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded">2</button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded">3</button>
        <span className="px-3 py-1">...</span>
        <button className="px-3 py-1 hover:bg-gray-100 rounded">10</button>
      </div>
      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Next</button>
    </div>
  );
}