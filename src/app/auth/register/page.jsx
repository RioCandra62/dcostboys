"use client";

import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { registerUser } from '../../lib/auth/register';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage({ onNavigateToLogin, onRegister }) {
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [nomorWhatsApp, setNomorWhatsApp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await registerUser({
        nama: namaLengkap,
        email,
        no_wa: nomorWhatsApp,
        password
      });

      if (res.success) {
        setSuccess('Pendaftaran berhasil! Mengalihkan ke halaman login...');
        // Kosongkan isi form kembali
        setNamaLengkap('');
        setEmail('');
        setNomorWhatsApp('');
        setPassword('');

        // Langsung arahkan ke halaman login
        router.push('/auth/login');
      } else {
        setError(res.error || 'Pendaftaran gagal.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan koneksi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="w-full max-w-md flex flex-col items-center p-4">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <Home className="w-10 h-10 text-blue-600 mb-4" strokeWidth={2.5} />
          <h1 className="text-2xl font-bold text-slate-800">d'cost boys D'K</h1>
          <p className="text-slate-500 font-medium mt-1">Buat akun calon penghuni</p>
        </div>

        {/* Card Form Section */}
        <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Register User</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Daftar untuk menyimpan data booking dan melihat status pesanan.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 text-xs text-red-600 bg-red-50 rounded-lg border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 text-xs text-green-600 bg-green-50 rounded-lg border border-green-200 text-center font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            
            {/* Input Nama Lengkap */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-500" htmlFor="namaLengkap">
                Nama Lengkap
              </label>
              <input
                id="namaLengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Input Nomor WhatsApp */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-500" htmlFor="nomorWhatsApp">
                Nomor WhatsApp
              </label>
              <input
                id="nomorWhatsApp"
                type="tel"
                placeholder="Masukkan nomor WhatsApp"
                value={nomorWhatsApp}
                onChange={(e) => setNomorWhatsApp(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Input Password */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-500" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-2.5 rounded-lg transition-colors mt-4 text-sm ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link 
              href="/auth/login"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
            >
              Sudah punya akun? Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
