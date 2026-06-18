import React, { useState } from 'react';
import { Home, AlertTriangle } from 'lucide-react';

export default function DashboardAdminPage({ onNavigateToDataKamar, onNavigateToReservasi, onNavigateToDataPenghuni, onNavigateToPembayaran, onNavigateToLaporan, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center space-x-3 text-white mb-6">
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="font-bold text-lg">d'cost boys D'K</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium transition-colors border-none cursor-pointer text-left">
            Dashboard
          </button>
          <button 
            onClick={onNavigateToDataKamar}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
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
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-slate-600">Admin</span>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <span className="text-slate-500 font-bold text-sm mb-4">Total Kamar</span>
              <span className="text-5xl font-bold text-blue-600">6</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <span className="text-slate-500 font-bold text-sm mb-4">Kamar Tersedia</span>
              <span className="text-5xl font-bold text-blue-600">4</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <span className="text-slate-500 font-bold text-sm mb-4">Reservasi Pending</span>
              <span className="text-5xl font-bold text-blue-600">2</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <span className="text-slate-500 font-bold text-sm mb-4">Belum Lunas</span>
              <span className="text-5xl font-bold text-blue-600">2</span>
            </div>
          </div>

          {/* Table Section */}
          <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-8">
            <div className="w-full">
              <div className="flex bg-slate-50 p-6 text-sm font-bold text-slate-500 border-b border-slate-100">
                <div className="flex-1">Notifikasi</div>
                <div className="flex-1">Sumber</div>
                <div className="flex-1">Status</div>
              </div>
              
              <div className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm">
                <div className="flex-1 text-slate-700">Reservasi baru AAA</div>
                <div className="flex-1 text-slate-500">Form Reservasi</div>
                <div className="flex-1 font-bold text-orange-500">Pending</div>
              </div>
              
              <div className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm">
                <div className="flex-1 text-slate-700">Pembayaran CCC</div>
                <div className="flex-1 text-slate-500">Jatuh Tempo</div>
                <div className="flex-1 font-bold text-red-500">Belum Lunas</div>
              </div>

              <div className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm">
                <div className="flex-1 text-slate-700">Update kamar</div>
                <div className="flex-1 text-slate-500">Data Kamar</div>
                <div className="flex-1 font-bold text-green-500">Tersedia</div>
              </div>
            </div>
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
