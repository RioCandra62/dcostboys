import React, { useState } from 'react';
import { Home, AlertTriangle } from 'lucide-react';

export default function PembayaranPage({ onNavigateToDashboardAdmin, onNavigateToDataKamar, onNavigateToReservasi, onNavigateToDataPenghuni, onNavigateToLaporan, onNavigateToTambahPembayaran, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const payments = [
    { no: 1, name: 'FFF', room: 'Kamar 1', type: 'Tahunan', amount: 'Rp10.800.000', status: 'Lunas' },
    { no: 2, name: 'CCC', room: 'Kamar 3', type: 'Tahunan', amount: 'Rp10.800.000', status: 'Belum Lunas' },
    { no: 3, name: 'EEE', room: 'Kamar 4', type: 'Tahunan', amount: 'Rp8.400.000', status: 'Belum Lunas' },
  ];

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
          <button className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium transition-colors border-none cursor-pointer text-left">
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
            <p className="text-sm text-slate-500 mt-1">Input pembayaran tahunan dan update status lunas / belum lunas</p>
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
          
          {/* Filter Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-end gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-end">
              <div className="flex flex-col space-y-2 flex-1 sm:w-[250px]">
                <label className="text-sm font-medium text-slate-500">Pilih Penghuni</label>
                <input type="text" placeholder="AAA / CCC / EEE" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400" />
              </div>
              <div className="flex flex-col space-y-2 flex-1 sm:w-[250px]">
                <label className="text-sm font-medium text-slate-500">Periode</label>
                <input type="text" placeholder="Tahunan" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg transition-colors text-sm h-[42px] border-none cursor-pointer shrink-0">
                Search
              </button>
            </div>
            <button onClick={onNavigateToTambahPembayaran} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm text-sm border-none cursor-pointer h-[42px] shrink-0">
              Tambah Pembayaran
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="w-full min-w-[800px]">
              <div className="flex bg-slate-50 p-6 text-sm font-bold text-slate-500 border-b border-slate-100">
                <div className="w-16 px-4">No</div>
                <div className="flex-[1.5] px-4">Nama</div>
                <div className="flex-1 px-4">Kamar</div>
                <div className="flex-1 px-4">Jenis Bayar</div>
                <div className="flex-1 px-4">Jumlah</div>
                <div className="flex-1 px-4">Status</div>
              </div>
              
              <div className="flex flex-col">
                {payments.map((payment) => (
                  <div key={payment.no} className="flex items-center p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm">
                    <div className="w-16 px-4 text-slate-600">{payment.no}</div>
                    <div className="flex-[1.5] px-4 text-slate-700 font-medium">{payment.name}</div>
                    <div className="flex-1 px-4 text-slate-600">{payment.room}</div>
                    <div className="flex-1 px-4 text-slate-600">{payment.type}</div>
                    <div className="flex-1 px-4 text-slate-600">{payment.amount}</div>
                    <div className="flex-1 px-4 font-bold">
                      <span className={payment.status === 'Lunas' ? 'text-green-500' : 'text-red-500'}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <p className="text-orange-600 font-bold text-sm">Jika melewati jatuh tempo, sistem menampilkan notifikasi keterlambatan pembayaran.</p>
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
