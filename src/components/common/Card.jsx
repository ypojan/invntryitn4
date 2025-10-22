function Card({ title, total, image, icon }) {
  return (
    <div className="bg-blue-100 rounded-xl shadow-xl hover:shadow-lg transition p-3 relative max-w-[350px]">
      {/* Three Dots Icon */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="19" r="2"/>
        </svg>
      </button>

      {/* Content */}
      <div className="flex flex-col items-center">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

        {/* Image/Icon */}
        <div className="w-56 h-56 mb-4 flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-contain" />
          ) : (
            <div className="text-5xl">{icon}</div>
          )}
        </div>

        {/* Total and Arrow - Sejajar */}
        <div className="w-full flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Total: <span className="font-bold">{total}</span>
          </p>
          
          <button>
            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;