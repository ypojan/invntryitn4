import { useState, useEffect } from 'react';
import Header from '../common/Header.jsx';
import Card from '../common/Card.jsx';

export default function EditDataBarang() {
  // Data yang akan di-edit (contoh data existing)
  const [namaBarang, setNamaBarang] = useState('Laptop');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Data dummy untuk dashboard
  const inventoryItems = [
    {
      title: "Laptop",
      total: 35,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
    {
      title: "Komputer",
      total: 50,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
    },
    {
      title: "Sparepart",
      total: 27,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
    },
    {
      title: "Mesin Printer",
      total: 6,
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80",
    },
    {
      title: "Projector",
      total: 20,
      image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&q=80",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert('Format file harus JPG atau PNG');
        return;
      }

      if (file.size > maxSize) {
        alert('Ukuran file maksimal 2MB');
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBatal = () => {
    // Reset ke data awal
    setNamaBarang('Laptop');
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleSimpan = () => {
    if (!namaBarang.trim()) {
      alert('Nama Barang harus diisi');
      return;
    }

    console.log('Data yang akan diupdate:', {
      namaBarang,
      file: selectedFile
    });

    alert('Data berhasil diupdate!');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Edit Data */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-xl mx-4">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Tambah Data Barang</h2>
          <button
            onClick={handleBatal}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 space-y-6">
          {/* Input Nama Barang */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <span className="text-red-500">*</span> Nama Barang
            </label>
            <input
              type="text"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              placeholder="Masukkan Nama Barang"
              className="w-full px-4 py-3 border-2 border-cyan-400 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <span className="text-red-500">*</span> Upload Gambar
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {!previewImage ? (
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Upload Gambar</p>
                    <p className="text-sm text-gray-400 mt-1">Format: JPG, PNG, maksimal 2MB</p>
                  </div>
                </label>
              ) : (
                <div className="relative">
                  <img src={previewImage} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-sm text-gray-600 mt-2">{selectedFile?.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleBatal}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSimpan}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}