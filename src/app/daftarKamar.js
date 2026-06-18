import React, { useState, useEffect } from 'react';
import { Home, User } from 'lucide-react';
import { getKamar } from './lib/dashboard/data_kamar';

export default function KamarPage({ onNavigateToDashboard, onNavigateToProfile, onNavigateToDetail, onNavigateToContact, onNavigateToFasilitas }) {
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKamar() {
      try {
        const data = await getKamar();
        setKamarList(data || []);
      } catch (err) {
        console.error("Gagal memuat kamar:", err);
      } finally {
        setLoading(false);
      }
    }
    loadKamar();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateToDashboard}>
            <Home className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
            <span className="font-bold text-slate-800 text-lg">d'cost boys D'K</span>
          </div>
          <div className="flex items-center space-x-8">
            <button onClick={onNavigateToDashboard} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors">Home</button>
            <span className="text-blue-600 font-bold text-sm">Kamar</span>
            <button onClick={onNavigateToFasilitas} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Fasilitas</button>
            <button onClick={onNavigateToContact} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Kontak</button>
            <button 
              onClick={onNavigateToProfile}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer border-none"
              title="Profil"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Daftar Kamar</h1>
          <p className="text-slate-500 text-lg">Temukan kamar berdasarkan nomor kamar dan tipe fasilitasnya.</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-end gap-6 mb-12">
          <div className="flex-1 w-full flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-500">Filter Harga</label>
            <input type="text" placeholder="Isi filter harga" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400" />
          </div>
          <div className="flex-1 w-full flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-500">Jenis Kamar</label>
            <input type="text" placeholder="AC / Non-AC" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400" />
          </div>
          <div className="flex-1 w-full flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-500">Status</label>
            <input type="text" placeholder="Semua status" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg transition-colors text-sm h-[42px]">
            Filter
          </button>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-slate-500 py-8">Memuat daftar kamar...</div>
          ) : kamarList.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-8">Tidak ada kamar tersedia saat ini.</div>
          ) : (
            kamarList.map((room, index) => {
              const isTersedia = room.ketersediaan === 'tersedia';
              const formattedPrice = room.harga
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(room.harga) + "/bln"
                : "-";

              return (
                <div key={room.id_kamar || index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                  <div className="w-full h-48 bg-slate-200 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-slate-400 font-semibold text-base">Foto kamar</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Kamar {room.nama_kamar}</h3>
                  <p className="text-slate-500 text-sm mb-2">Tipe {room.tipe_kamar}</p>
                  <p className="text-blue-600 font-bold text-sm mb-4">{formattedPrice}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-full ${isTersedia ? 'bg-green-500' : 'bg-red-500'}`}>
                      {isTersedia ? 'Tersedia' : 'Terisi'}
                    </span>
                    <button 
                      onClick={() => onNavigateToDetail && onNavigateToDetail(room)}
                      className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
