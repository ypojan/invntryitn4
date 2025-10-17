function Card({ title, total, image, icon }) {
  return (
    <div className="bg-blue-100 rounded-xl shadow-md hover:shadow-lg transition p-6 relative">
      {/* Info Icon */}
      <button className="absolute top-4 right-4 w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-600 hover:text-gray-600 transition">
        <span className="text-sm font-bold">i</span>
      </button>

      {/* Content */}
      <div className="flex flex-col items-center">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

        {/* Image/Icon */}
        <div className="w-32 h-32 mb-4 flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-contain" />
          ) : (
            <div className="text-6xl">{icon}</div>
          )}
        </div>

        {/* Total */}
        <p className="text-sm text-gray-600 mb-4">Total: <span className="font-bold">{total}</span></p>

        {/* Arrow Button */}
        <button className="ml-auto">
          <svg className="w-6 h-6 text-gray-600 hover:text-gray-800 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;