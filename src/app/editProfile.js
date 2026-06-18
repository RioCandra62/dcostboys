import React, { useState } from 'react';
import { Home, User } from 'lucide-react';

export default function EditProfilePage({ onNavigateToDashboard, onNavigateToKamar, onNavigateToFasilitas, onNavigateToContact, onNavigateToProfile, onSave }) {
  const [namaLengkap, setNamaLengkap] = useState('AAA');
  const [email, setEmail] = useState('aaa@email.com');
  const [nomorWhatsApp, setNomorWhatsApp] = useState('0812-xxxx-xxxx');
  const [alamat, setAlamat] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ namaLengkap, email, nomorWhatsApp, alamat });
    }
  };

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
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer" onClick={onNavigateToProfile}>
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Edit Profil</h1>
          <p className="text-slate-500 text-lg">Perbarui data akun calon penghuni.</p>
        </div>

        <div className="w-full bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSave} className="flex flex-col space-y-6">
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">Nama Lengkap</label>
              <input 
                type="text" 
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">Nomor WhatsApp</label>
              <input 
                type="tel" 
                value={nomorWhatsApp}
                onChange={(e) => setNomorWhatsApp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">Alamat / Catatan</label>
              <textarea 
                rows="4"
                placeholder="Masukkan alamat atau catatan tambahan"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 resize-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center justify-end gap-6 mt-8">
              <button 
                type="button" 
                onClick={onNavigateToProfile}
                className="text-blue-600 font-bold text-sm bg-transparent border-none cursor-pointer hover:text-blue-700 transition-colors px-4 py-2"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm shadow-sm cursor-pointer border-none"
              >
                Simpan Perubahan
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
