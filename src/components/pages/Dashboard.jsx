import Sidebar from "../common/Sidebar.jsx";
import Header from "../common/Header.jsx";
import Card from "../common/Card.jsx";

function Dashboard() {
  const inventoryItems = [
    {
      title: "Laptop",
      total: 35,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
    {
      title: "Komputer",
      total: 50,
      image:
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
    },
    {
      title: "Sparepart",
      total: 27,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
    },
    {
      title: "Mesin Printer",
      total: 6,
      image:
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80",
    },
    {
      title: "Projector",
      total: 20,
      image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&q=80",
    },
  ];

  // Data untuk chart
  const statusData = [
    { label: "Bagus", percentage: 60, color: "bg-sky-400" },
    { label: "Diperbaiki", percentage: 25, color: "bg-blue-600" },
    { label: "Rusak", percentage: 15, color: "bg-red-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <div className="p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Master Data Seluruh Barang
          </h1>

          {/* Search Bar and Button */}
          <div className="flex items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white border border-gray-300 rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-gray-400 transition"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tambah Data Button */}
            <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md ml-auto">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="font-semibold">Tambah Data</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
            {inventoryItems.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                total={item.total}
                image={item.image}
              />
            ))}
          </div>

          {/* Status Kondisi Barang Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Status Kondisi Barang
            </h2>

            <div className="flex items-center justify-between gap-12">
              {/* Legend */}
              <div className="flex-1 space-y-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${item.color} rounded`}></div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {item.label}
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          item.label === "Bagus"
                            ? "text-sky-400"
                            : item.label === "Diperbaiki"
                            ? "text-blue-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Donut Chart */}
              <div className="relative w-64 h-64">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="20"
                  />

                  {/* Bagus - 60% (Sky Blue) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="20"
                    strokeDasharray="150.8 251.2"
                    strokeDashoffset="0"
                  />

                  {/* Diperbaiki - 25% (Dark Blue) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="20"
                    strokeDasharray="62.8 251.2"
                    strokeDashoffset="-150.8"
                  />

                  {/* Rusak - 15% (Red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="20"
                    strokeDasharray="37.7 251.2"
                    strokeDashoffset="-213.6"
                  />
                </svg>

                {/* Center white circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full"></div>
                </div>

                {/* Percentage labels on chart with glassmorphism */}
                {/* Rusak - 15% (Top Right) */}
                <div className="absolute top-8 right-4">
                  <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-1 shadow-lg">
                    <span className="text-red-500 font-bold text-base">
                      15%
                    </span>
                  </div>
                </div>

                {/* Diperbaiki - 25% (Bottom Right) */}
                <div className="absolute bottom-8 right-4">
                  <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-1 shadow-lg">
                    <span className="text-blue-600 font-bold text-base">
                      25%
                    </span>
                  </div>
                </div>

                {/* Bagus - 60% (Left) */}
                <div className="absolute top-1/2 left-2 -translate-y-1/2">
                  <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-1 shadow-lg">
                    <span className="text-sky-400 font-bold text-base">
                      60%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
