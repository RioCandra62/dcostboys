"use client";

import { Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
  const path = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
            <span className="font-bold text-slate-800 text-lg">
              d'cost boys D'K
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/home"
              className={
                path === "/home"
                  ? "text-blue-600 font-semibold text-sm"
                  : "text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
              }
            >
              Home
            </Link>
            <Link
              href="/home/kamar"
              className={
                path === "/home/kamar"
                  ? "text-blue-600 font-semibold text-sm"
                  : "text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
              }
            >
              Kamar
            </Link>
            <Link
              href="/home/fasilitas"
              className={
                path === "/home/fasilitas"
                  ? "text-blue-600 font-semibold text-sm"
                  : "text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
              }
            >
              Fasilitas
            </Link>
            <Link
              href="/home/kontak"
              className={
                path === "/home/kontak"
                  ? "text-blue-600 font-semibold text-sm"
                  : "text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
              }
            >
              Kontak
            </Link>
            <button
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer border-none"
              title="Profil"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      {children}
      <footer className="bg-slate-900 text-white mt-12 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
              <span className="font-bold text-lg">d'cost boys D'K</span>
            </div>
            <p className="text-slate-400 text-sm">
              Sistem informasi dan manajemen hunian kos.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Menu</h4>
            <div className="text-slate-400 text-sm flex gap-2">
              <button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                Home
              </button>{" "}
              &middot;
              <button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                Kamar
              </button>{" "}
              &middot;
              <button className="text-white bg-transparent border-none cursor-pointer">
                Kontak
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Kontak</h4>
            <div className="text-slate-400 text-sm">
              WhatsApp &middot; Email &middot; Lokasi
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
