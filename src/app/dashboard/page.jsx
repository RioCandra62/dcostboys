import React from "react";

export default function Layout({ children }) {
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
            <span className="text-5xl font-bold text-blue-600">6</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Kamar Tersedia
            </span>
            <span className="text-5xl font-bold text-blue-600">4</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Reservasi Pending
            </span>
            <span className="text-5xl font-bold text-blue-600">2</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-4">
              Belum Lunas
            </span>
            <span className="text-5xl font-bold text-blue-600">2</span>
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

            <div className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm">
              <div className="flex-1 text-slate-700">Reservasi baru AAA</div>
              <div className="flex-1 text-slate-500">Form Reservasi</div>
              <div className="flex-1 font-bold text-orange-500">Pending</div>
            </div>

            <div className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm">
              <div className="flex-1 text-slate-700">Pembayaran CCC</div>
              <div className="flex-1 text-slate-500">Jatuh Tempo</div>
              <div className="flex-1 font-bold text-red-500">Belum Lunas</div>
            </div>

            <div className="flex items-center px-6 py-5 border-b border-slate-100 last:border-0 text-sm">
              <div className="flex-1 text-slate-700">Update kamar</div>
              <div className="flex-1 text-slate-500">Data Kamar</div>
              <div className="flex-1 font-bold text-green-500">Tersedia</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
