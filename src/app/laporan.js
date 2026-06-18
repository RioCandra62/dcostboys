import React, { useState } from 'react';
import { Home, AlertTriangle } from 'lucide-react';

export default function LaporanPage({ onNavigateToDashboardAdmin, onNavigateToDataKamar, onNavigateToReservasi, onNavigateToDataPenghuni, onNavigateToPembayaran, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const transactions = [
    { no: 1, date: '01 Mei 2026', description: 'Pembayaran Sewa', in: 'Rp700.000', out: '-', balance: 'Rp700.000' },
    { no: 2, date: '05 Mei 2026', description: 'Pembayaran Sewa', in: 'Rp800.000', out: '-', balance: 'Rp1.500.000' },
    { no: 3, date: '10 Mei 2026', description: 'Pembelian Alat Kebersihan', in: '-', out: 'Rp200.000', balance: 'Rp1.300.000' },
    { no: 4, date: '15 Mei 2026', description: 'Pembayaran Sewa', in: 'Rp850.000', out: '-', balance: 'Rp2.150.000' },
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
          <button 
            onClick={onNavigateToPembayaran}
            className="w-full flex items-center px-4 py-3 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors bg-transparent border-none cursor-pointer text-left"
          >
            Pembayaran
          </button>
          <button className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium transition-colors border-none cursor-pointer text-left">
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
          <h1 className="text-2xl font-bold text-slate-900">Laporan</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-slate-600">Admin</span>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1">
          
          {/* Summary Cards */}
          <div className="relative mb-8">
            {/* Download Button positioned behind cards conceptually or right side */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center -mr-2">
              {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-colors shadow-sm text-sm border-none cursor-pointer h-full translate-x-4 flex items-center justify-end pr-6">
                Unduh
              </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <span className="text-slate-500 font-bold text-sm mb-2">Total Pemasukan</span>
                <span className="text-3xl font-bold text-slate-900">Rp27.750.000</span>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <span className="text-slate-500 font-bold text-sm mb-2">Total Pengeluaran</span>
                <span className="text-3xl font-bold text-slate-900">Rp2.300.000</span>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col mr-6 md:mr-10">
                <span className="text-slate-500 font-bold text-sm mb-2">Laba Bersih</span>
                <span className="text-3xl font-bold text-slate-900">Rp25.450.000</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="w-full min-w-[800px]">
              <div className="flex bg-slate-50 p-4 text-sm font-bold text-slate-500 border-b border-slate-100">
                <div className="w-16 px-4">No</div>
                <div className="flex-1 px-4">Tanggal</div>
                <div className="flex-[1.5] px-4">Keterangan</div>
                <div className="flex-1 px-4">Pemasukan</div>
                <div className="flex-1 px-4">Pengeluaran</div>
                <div className="flex-1 px-4">Saldo</div>
              </div>
              
              <div className="flex flex-col">
                {transactions.map((transaction) => (
                  <div key={transaction.no} className="flex items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm">
                    <div className="w-16 px-4 text-slate-600">{transaction.no}</div>
                    <div className="flex-1 px-4 text-slate-600">{transaction.date}</div>
                    <div className="flex-[1.5] px-4 text-slate-700 font-medium">{transaction.description}</div>
                    <div className="flex-1 px-4 text-slate-600">{transaction.in}</div>
                    <div className="flex-1 px-4 text-slate-600">{transaction.out}</div>
                    <div className="flex-1 px-4 text-slate-600">{transaction.balance}</div>
                  </div>
                ))}
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
