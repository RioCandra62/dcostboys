import React from 'react';
import { Home, User } from 'lucide-react';

export default function DashboardPage({ onNavigateToProfile, onNavigateToKamar, onNavigateToDetail, onNavigateToContact, onNavigateToFasilitas }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
            <span className="font-bold text-slate-800 text-lg">d'cost boys D'K</span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-blue-600 font-semibold text-sm">Home</a>
            <button onClick={onNavigateToKamar} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none">Kamar</button>
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
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Cari Kos Nyaman di d'cost boys D'K
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Hunian nyaman, lokasi strategis, fasilitas lengkap, dan booking kamar online.
            </p>
            <button onClick={onNavigateToKamar} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Lihat Kamar
            </button>
          </div>
          <div className="flex-1 w-full h-[350px] md:h-[400px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300">
            <span className="text-slate-400 font-semibold text-xl">Hero foto kos</span>
          </div>
        </section>

        {/* Features Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-28">
            <h3 className="font-bold text-slate-800 mb-1 text-lg">Harga Terjangkau</h3>
            <p className="text-slate-500 text-sm">Mulai dari Rp700.000/bln</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-28">
            <h3 className="font-bold text-slate-800 mb-1 text-lg">Lokasi Strategis</h3>
            <p className="text-slate-500 text-sm">Dekat kampus & pusat kota</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-28">
            <h3 className="font-bold text-slate-800 mb-1 text-lg">Fasilitas Lengkap</h3>
            <p className="text-slate-500 text-sm">AC / Non-AC, WiFi, kamar mandi</p>
          </div>
        </section>

        {/* Kamar Pilihan */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Kamar Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tipe AC */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="w-full h-40 bg-slate-200 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-400 font-semibold text-base">Foto kamar</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Tipe AC</h3>
              <p className="text-slate-500 text-sm mb-2">Kamar dengan AC</p>
              <p className="text-blue-600 font-bold text-sm mb-4">Rp900.000/bln</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Tersedia</span>
                <button 
                  onClick={() => onNavigateToDetail && onNavigateToDetail({ name: 'Tipe AC', price: 'Rp900.000/bln', status: 'Tersedia' })}
                  className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Detail
                </button>
              </div>
            </div>

            {/* Tipe Non-AC */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="w-full h-40 bg-slate-200 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-400 font-semibold text-base">Foto kamar</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Tipe Non-AC</h3>
              <p className="text-slate-500 text-sm mb-2">Kamar tanpa AC</p>
              <p className="text-blue-600 font-bold text-sm mb-4">Rp700.000/bln</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Tersedia</span>
                <button 
                  onClick={() => onNavigateToDetail && onNavigateToDetail({ name: 'Tipe Non-AC', price: 'Rp700.000/bln', status: 'Tersedia' })}
                  className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Detail
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
