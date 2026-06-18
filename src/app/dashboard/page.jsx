"use client";
import React, { useState, useEffect } from "react";
import { getDashboardData } from "../lib/dashboard/data_dashboard";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const res = await getDashboardData();
        setData(res);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
        setError("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const stats = data?.stats || {
    totalKamar: 0,
    kamarTersedia: 0,
    reservasiPending: 0,
    belumLunas: 0
  };

  const notifications = data?.notifications || [];

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium text-slate-600">Admin</span>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center">
            A
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-8 flex-1">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Total Kamar
            </span>
            <span className="text-5xl font-bold text-blue-600">
              {loading ? "..." : stats.totalKamar}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Kamar Tersedia
            </span>
            <span className="text-5xl font-bold text-blue-600">
              {loading ? "..." : stats.kamarTersedia}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Reservasi Pending
            </span>
            <span className="text-5xl font-bold text-blue-600">
              {loading ? "..." : stats.reservasiPending}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Belum Lunas
            </span>
            <span className="text-5xl font-bold text-blue-600">
              {loading ? "..." : stats.belumLunas}
            </span>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-8">
          <div className="w-full">
            <div className="flex bg-slate-50 p-6 text-sm font-bold text-slate-500 border-b border-slate-100">
              <div className="flex-1">Notifikasi</div>
              <div className="flex-1">Sumber</div>
              <div className="flex-1">Status</div>
            </div>

            <div className="flex flex-col">
              {loading ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  Memuat data notifikasi...
                </div>
              ) : error ? (
                <div className="p-6 text-center text-red-500 text-sm">
                  {error}
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Semua reservasi telah diproses dan semua tagihan lunas! Tidak ada aksi yang diperlukan.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-slate-700 font-medium">{notif.text}</div>
                    <div className="flex-1 text-slate-500">{notif.source}</div>
                    <div className={`flex-1 font-bold ${notif.statusColor}`}>
                      {notif.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
