import React, { useState } from 'react';
import { Home, User, LogOut } from 'lucide-react';

export default function ProfilePage({ onNavigateToDashboard, onNavigateToKamar, onNavigateToContact, onNavigateToFasilitas, onNavigateToDetail, onNavigateToEditProfile, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateToDashboard}>
            <Home className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
            <span className="font-bold text-slate-800 text-lg">d'cost boys D'K</span>
          </div>
          <div className="flex items-center space-x-8">
            <button onClick={onNavigateToDashboard} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={onNavigateToKamar} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Kamar</button>
            <button onClick={onNavigateToFasilitas} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Fasilitas</button>
            <button onClick={onNavigateToContact} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Kontak</button>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Profil Saya</h1>
          <p className="text-slate-500 text-lg">Kelola data akun dan pantau status booking kamar.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Bagian Kiri: Profil & Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-6">
              
              {/* Header Profil */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">AAA</h2>
                  <p className="text-slate-500">Calon Penghuni</p>
                </div>
              </div>

              {/* Form Data */}
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-slate-500">Email</label>
                  <input 
                    type="email" 
                    value="aaa@email.com" 
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 focus:outline-none text-sm cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-slate-500">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    value="0812-xxxx-xxxx" 
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 focus:outline-none text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button onClick={onNavigateToEditProfile} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm text-sm cursor-pointer border-none">
                Edit Profil
              </button>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="flex-1 bg-white hover:bg-red-50 text-red-500 font-semibold py-3.5 rounded-xl transition-colors shadow-sm border border-slate-100 text-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Bagian Kanan: Status Booking */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Status Booking</h2>
              
              <div className="mb-4">
                <h3 className="font-bold text-slate-900 text-lg mb-1">Kamar 1</h3>
                <p className="text-slate-500 text-sm mb-4">Tipe AC &middot; Tanggal masuk: 01 Juni 2026</p>
                <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block">
                  Pending
                </span>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => onNavigateToDetail && onNavigateToDetail({ name: 'Kamar 1', type: 'Tipe AC', price: 'Rp900.000/bln', status: 'Pending' })}
                  className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-[400px] flex flex-col items-center shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Konfirmasi Logout</h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Apakah kamu yakin ingin keluar dari akun?
            </p>
            
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8 border border-red-100">
              <LogOut className="w-10 h-10" strokeWidth={2.5} />
            </div>

            <div className="flex w-full items-center">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 text-blue-600 font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer bg-transparent border-none hover:bg-slate-50"
              >
                Batal
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors cursor-pointer border-none shadow-sm"
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
