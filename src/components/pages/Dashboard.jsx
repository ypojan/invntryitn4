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
          {/* Title and Button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Master Data Seluruh Barang
            </h1>

            <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventoryItems.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                total={item.total}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
