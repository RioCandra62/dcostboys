"use client";

import React, { useState } from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../lib/auth/login';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginUser({ email, password });

      if (res.success) {
        if (res.user.role === 'admin' || res.user.is_admin) {
          router.push('/dashboard');
        } else {
          router.push('/home');
        }
      } else {
        setError(res.error || 'Email atau password salah.');
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
          <p className="text-slate-500 font-medium mt-1">Login Calon Penghuni</p>
        </div>

        {/* Card Form Section */}
        <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Login User</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Masuk untuk melihat data booking dan status pesanan kamar Anda.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 text-xs text-red-600 bg-red-50 rounded-lg border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col space-y-5">
            
            {/* Input Email */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Masukkan email atau username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-2.5 rounded-lg transition-colors mt-2 text-sm ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/register"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
            >
              Belum punya akun? Register
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}