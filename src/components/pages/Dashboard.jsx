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
    { label: "Bagus", percentage: 60, color: "#40B7FE" },
    { label: "Diperbaiki", percentage: 25, color: "#234FEA" },
    { label: "Rusak", percentage: 15, color: "#E62727" },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Content Area - Padding lebih besar untuk center */}
        <div className="py-8 px-16">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-6" style={{ color: "#1F2937" }}>
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
                  className="w-full rounded-full px-6 py-3 pr-12 focus:outline-none transition"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D1D5DB",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#9CA3AF")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#9CA3AF" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B5563")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9CA3AF")
                  }
                >
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
            <button
              className="px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-xl ml-auto"
              style={{ backgroundColor: "#334155", color: "#FFFFFF" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1E293B")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#334155")
              }
            >
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
          <div
            className="rounded-xl shadow-md p-8"
            style={{ backgroundColor: "#DBEAFE" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Status Kondisi Barang
            </h2>

            <div className="flex items-center justify-between gap-12">
              {/* Legend */}
              <div className="flex-1 space-y-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-12 h-8"
                      style={{
                        backgroundColor: item.color,
                        borderRadius: "12px",
                      }}
                    ></div>
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: "#1F2937" }}
                      >
                        {item.label}
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
                    stroke="#F0F0F0"
                    strokeWidth="20"
                  />

                  {/* Bagus - 60% (Sky Blue) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#38BDF8"
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
                    stroke="#2563EB"
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
                    stroke="#EF4444"
                    strokeWidth="20"
                    strokeDasharray="37.7 251.2"
                    strokeDashoffset="-213.6"
                  />
                </svg>

                {/* Percentage labels on chart with glassmorphism */}
                {/* Rusak - 15% (Top Right) */}
                <div className="absolute top-1 left-12 -translate-y-1/2">
                  <div
                    className="backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <span
                      className="font-bold text-base"
                      style={{ color: "#EF4444" }}
                    >
                      15%
                    </span>
                  </div>
                </div>

                {/* Bagus - 60% (Bottom Right) */}
                <div className="absolute bottom-8 right-3">
                  <div
                    className="backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <span
                      className="font-bold text-base"
                      style={{ color: "#38BDF8" }}
                    >
                      60%
                    </span>
                  </div>
                </div>

                {/* Diperbaiki - 25% (Left) */}
                <div className="absolute top-1/2 -left-10 -translate-y-1/2">
                  <div
                    className="backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <span
                      className="font-bold text-base"
                      style={{ color: "#2563EB" }}
                    >
                      25%
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