import React, { useState } from 'react';
import { Home, AlertTriangle } from 'lucide-react';

export default function TambahPembayaranPage({ onNavigateToPembayaran, onNavigateToDashboardAdmin, onNavigateToDataKamar, onNavigateToReservasi, onNavigateToDataPenghuni, onNavigateToLaporan, onLogout }) {
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
          <button 
            onClick={onNavigateToDashboardAdmin}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
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
            className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium transition-colors border-none cursor-pointer text-left"
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
            <h1 className="text-2xl font-bold text-slate-900">Pembayaran Sewa</h1>
            <p className="text-sm text-slate-500 mt-1">Input pembayaran penghuni kos</p>
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
          
          {/* Breadcrumb */}
          <div className="mb-6 text-sm font-bold text-slate-500">
            <span className="cursor-pointer hover:text-blue-600 transition-colors" onClick={onNavigateToPembayaran}>Pembayaran</span> 
            <span className="mx-2">/</span> 
            <span className="text-slate-400">Tambah Pembayaran</span>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Form Pembayaran</h2>
            <p className="text-slate-500 text-sm mb-10">Masukkan data pembayaran penghuni yang sudah terdaftar.</p>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Form Inputs */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Nama Penghuni *</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 appearance-none bg-white cursor-pointer">
                      <option value="" disabled selected hidden>Pilih penghuni</option>
                      <option value="AAA">AAA</option>
                      <option value="CCC">CCC</option>
                      <option value="EEE">EEE</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <span className="text-[10px]">&#9660;</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Kamar</label>
                  <input type="text" placeholder="Kamar 2" disabled className="w-full px-4 py-3.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Tipe Kamar</label>
                  <input type="text" placeholder="Non AC" disabled className="w-full px-4 py-3.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Periode Pembayaran *</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 appearance-none bg-white cursor-pointer">
                      <option value="Tahunan">Tahunan</option>
                      <option value="Bulanan">Bulanan</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <span className="text-[10px]">&#9660;</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Tanggal Pembayaran *</label>
                  <input type="text" defaultValue="01 Juni 2026" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Metode Pembayaran *</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 appearance-none bg-white cursor-pointer">
                      <option value="Transfer Bank">Transfer Bank</option>
                      <option value="Tunai">Tunai</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <span className="text-[10px]">&#9660;</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Catatan</label>
                  <textarea placeholder="Tambahkan catatan pembayaran" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 min-h-[100px] resize-none"></textarea>
                </div>
              </div>

              {/* Right Column - Summary & Upload */}
              <div className="flex-[0.8] flex flex-col space-y-6">
                
                {/* Summary Box */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Ringkasan Pembayaran</h3>
                  
                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex">
                      <span className="w-32 font-bold text-slate-500">Nama</span>
                      <span className="font-bold text-slate-900 flex-1">AAA</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-bold text-slate-500">Kamar</span>
                      <span className="font-bold text-slate-900 flex-1">Kamar 2</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-bold text-slate-500">Tipe</span>
                      <span className="font-bold text-slate-900 flex-1">Non AC</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-bold text-slate-500">Biaya</span>
                      <span className="font-bold text-slate-900 flex-1">Rp700.000 / bulan</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-bold text-slate-500">Tagihan Tahunan</span>
                      <span className="font-bold text-slate-900 flex-1">Rp8.400.000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Status Pembayaran *</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 appearance-none bg-white cursor-pointer">
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Lunas">Belum Lunas</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <span className="text-[10px]">&#9660;</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Bukti */}
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Bukti Pembayaran</label>
                  <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors h-[140px]">
                    <span className="text-blue-600 font-bold mb-2">Upload File</span>
                    <span className="text-slate-400 text-xs">PNG / JPG / PDF</span>
                  </div>
                </div>

                {/* Buttons (pushed to bottom) */}
                <div className="flex items-center justify-end gap-6 mt-auto pt-8">
                  <button onClick={onNavigateToPembayaran} className="text-blue-600 font-bold bg-transparent border-none cursor-pointer text-sm hover:text-blue-800 transition-colors">
                    Batal
                  </button>
                  <button onClick={onNavigateToPembayaran} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-sm text-sm border-none cursor-pointer">
                    Simpan Pembayaran
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-blue-600 font-bold text-sm">Flow: Data Penghuni &rarr; Tambah Pembayaran &rarr; Simpan Pembayaran &rarr; Masuk Tabel Pembayaran &rarr; Laporan</p>
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
