"use client";
import React, { useState } from "react";
import { Home, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "../lib/auth/login";

export default function DashboardAdminPage({
  children,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      window.location.href = "/auth/login";
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center space-x-3 text-white mb-6">
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="font-bold text-lg">d'cost boys D'K</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className={`w-full flex items-center px-4 py-3 ${pathname === "/dashboard" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-slate-800"} rounded-xl font-medium transition-colors border-none cursor-pointer text-left`}>
            Dashboard
          </Link>
          <Link href="/dashboard/kamar" className={`w-full flex items-center px-4 py-3 ${pathname === "/dashboard/kamar" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-slate-800"} rounded-xl font-medium transition-colors border-none cursor-pointer text-left`}>
            Data Kamar
          </Link>
          <Link href="/dashboard/reservasi" className={`w-full flex items-center px-4 py-3 ${pathname === "/dashboard/reservasi" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-slate-800"} rounded-xl font-medium transition-colors border-none cursor-pointer text-left`}>
            Reservasi
          </Link>
          <Link href="/dashboard/penghuni" className={`w-full flex items-center px-4 py-3 ${pathname === "/dashboard/penghuni" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-slate-800"} rounded-xl font-medium transition-colors border-none cursor-pointer text-left`}>
            Data Penghuni
          </Link>
          <Link href="/dashboard/pembayaran" className={`w-full flex items-center px-4 py-3 ${pathname === "/dashboard/pembayaran" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-slate-800"} rounded-xl font-medium transition-colors border-none cursor-pointer text-left`}>
            Pembayaran
          </Link>
          <Link href="/dashboard/laporan" className={`w-full flex items-center px-4 py-3 ${pathname === "/dashboard/laporan" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-slate-800"} rounded-xl font-medium transition-colors border-none cursor-pointer text-left`}>
            Laporan
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center px-4 py-3 w-full hov¸er:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      {children}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-xl flex flex-col items-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Keluar dari Admin Panel
            </h2>
            <p className="text-slate-500 mb-8 text-center text-sm">
              Sesi akan diakhiri. Pastikan semua data sudah tersimpan.
            </p>

            <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-8">
              <AlertTriangle
                className="w-10 h-10 text-red-500"
                strokeWidth={2.5}
              />
            </div>

            <div className="flex w-full gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 text-blue-600 font-bold bg-transparent border-none cursor-pointer hover:bg-slate-50 rounded-xl transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleLogout}
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
