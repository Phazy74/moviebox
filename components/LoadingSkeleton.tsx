export default function LoadingSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      <div className="bg-gray-700 h-96 w-full"></div>
      <div className="p-4">
        <div className="bg-gray-700 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-700 h-4 w-1/2 mt-2 rounded"></div>
      </div>
    </div>
  );
}