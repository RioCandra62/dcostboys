import React, { useState, useEffect } from 'react';
import { Home, AlertTriangle } from 'lucide-react';
import { getKamar } from './lib/dashboard/data_kamar';

export default function DataKamarPage({ onNavigateToDashboardAdmin, onNavigateToReservasi, onNavigateToDataPenghuni, onNavigateToPembayaran, onNavigateToLaporan, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKamar() {
      try {
        const data = await getKamar();
        setKamarList(data || []);
      } catch (err) {
        console.error("Gagal memuat data kamar:", err);
      } finally {
        setLoading(false);
      }
    }
    loadKamar();
  }, []);

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center space-x-3 text-white mb-6">
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="font-bold text-lg">d'cost boys D'K</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={onNavigateToDashboardAdmin}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
            Dashboard
          </button>
          <button 
            className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium transition-colors border-none cursor-pointer text-left"
          >
            Data Kamar
          </button>
          <button 
            onClick={onNavigateToReservasi}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
            Reservasi
          </button>
          <button 
            onClick={onNavigateToDataPenghuni}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
            Data Penghuni
          </button>
          <button 
            onClick={onNavigateToPembayaran}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
            Pembayaran
          </button>
          <button 
            onClick={onNavigateToLaporan}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
            Laporan
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center px-4 py-3 w-full hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manajemen Data Kamar</h1>
            <p className="text-sm text-slate-500 mt-1">Tambah, edit, hapus, dan update status kamar</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-slate-600">Admin</span>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1">
          
          <div className="flex justify-end mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm text-sm border-none cursor-pointer">
              + Tambah Kamar
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="w-full min-w-[800px]">
              <div className="flex bg-slate-50 p-4 text-sm font-bold text-slate-500 border-b border-slate-100">
                <div className="w-16 px-4">No</div>
                <div className="flex-1 px-4">Nama Kamar</div>
                <div className="flex-1 px-4">Tipe Kamar</div>
                <div className="flex-1 px-4">Harga Sewa</div>
                <div className="flex-1 px-4">Status</div>
                <div className="flex-1 px-4">Aksi</div>
              </div>
              
              <div className="flex flex-col">
                {loading ? (
                  <div className="p-6 text-center text-slate-500">Memuat data kamar...</div>
                ) : kamarList.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">Belum ada data kamar.</div>
                ) : (
                  kamarList.map((room, index) => (
                    <div key={room.id_kamar || index} className="flex items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm">
                      <div className="w-16 px-4 text-slate-600">{index + 1}</div>
                      <div className="flex-1 px-4 text-slate-700 font-medium">Kamar {room.nama_kamar}</div>
                      <div className="flex-1 px-4 text-slate-600">{room.tipe_kamar || "-"}</div>
                      <div className="flex-1 px-4 text-slate-600">
                        {room.harga
                          ? new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(room.harga)
                          : "-"}
                      </div>
                      <div className="flex-1 px-4 font-bold flex items-center cursor-pointer">
                        <span className={room.ketersediaan === 'tersedia' ? 'text-green-500 mr-2' : 'text-red-500 mr-2'}>
                          {room.ketersediaan === 'tersedia' ? 'Tersedia' : 'Terisi'}
                        </span>
                        <span className="text-[10px] text-slate-800">&#9660;</span>
                      </div>
                      <div className="flex-1 px-4 text-slate-600 text-sm">
                        <button className="hover:text-blue-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600">Edit</button>
                        <span className="mx-2">-</span>
                        <button className="hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600">Hapus</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-8">
            <p className="text-blue-600 font-bold text-sm mb-2">Update status kamar dilakukan melalui dropdown pada kolom Status.</p>
            <p className="text-blue-600 font-bold text-sm">Setelah disimpan, data kamar otomatis diperbarui pada website publik.</p>
          </div>

        </div>
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-xl flex flex-col items-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Keluar dari Admin Panel</h2>
            <p className="text-slate-500 mb-8 text-center text-sm">Sesi akan diakhiri. Pastikan semua data sudah tersimpan.</p>
            
            <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-8">
              <AlertTriangle className="w-10 h-10 text-red-500" strokeWidth={2.5} />
            </div>

            <div className="flex w-full gap-4">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 text-blue-600 font-bold bg-transparent border-none cursor-pointer hover:bg-slate-50 rounded-xl transition-colors"
              >
                Kembali
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold border-none cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
