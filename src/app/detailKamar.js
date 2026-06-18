import React from 'react';
import { Home, User, Check, ArrowLeft } from 'lucide-react';

export default function DetailKamarPage({ room, onNavigateToDashboard, onNavigateToKamar, onNavigateToBooking, onNavigateToContact, onNavigateToProfile, onNavigateToFasilitas, onLogout }) {
  if (!room) {
    return <div className="p-8 flex justify-center text-slate-500">Memuat data kamar...</div>;
  }

  // Daftar fasilitas sesuai desain
  const fasilitas = [
    "Tempat tidur",
    "Lemari pakaian",
    "Meja belajar",
    "WiFi",
    "Kamar mandi dalam",
    "Listrik token"
  ];

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
            <button onClick={onNavigateToDashboard} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={onNavigateToKamar} className="text-blue-600 font-bold text-sm bg-transparent border-none cursor-pointer">Kamar</button>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={onNavigateToKamar}
          className="flex items-center text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Daftar Kamar
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Bagian Kiri: Foto */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Foto Utama */}
            <div className="w-full h-[400px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300">
              <span className="text-slate-400 font-semibold text-lg">Foto utama kamar</span>
            </div>
            {/* Thumbnail */}
            <div className="grid grid-cols-4 gap-4">
              <div className="w-full h-24 bg-slate-200 rounded-xl border border-slate-300"></div>
              <div className="w-full h-24 bg-slate-200 rounded-xl border border-slate-300"></div>
              <div className="w-full h-24 bg-slate-200 rounded-xl border border-slate-300"></div>
              <div className="w-full h-24 bg-slate-200 rounded-xl border border-slate-300"></div>
            </div>
          </div>

          {/* Bagian Kanan: Detail & Informasi */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{room.name}</h1>
          
            <div className="mb-8">
              <span className={`text-white text-sm font-bold px-4 py-1.5 rounded-full ${room.status === 'Tersedia' ? 'bg-green-500' : 'bg-red-500'}`}>
                {room.status}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Deskripsi</h2>
              <p className="text-slate-500 leading-relaxed">
                Kamar tipe AC dengan fasilitas lengkap dan lingkungan aman.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Fasilitas</h2>
              <div className="flex flex-col gap-3">
                {fasilitas.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-slate-700">
                    <Check className="w-4 h-4 text-slate-600" strokeWidth={3} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-auto">
              <button className="flex-1 bg-white text-blue-600 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                Hubungi Kami
              </button>
              <button 
                onClick={onNavigateToBooking}
                className="flex-1 bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Booking Sekarang
              </button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
