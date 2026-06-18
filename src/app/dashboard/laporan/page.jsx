"use client";
import React, { useState } from "react";
import { Home, AlertTriangle } from "lucide-react";

export default function LaporanPage({
  onNavigateToDashboardAdmin,
  onNavigateToDataKamar,
  onNavigateToReservasi,
  onNavigateToDataPenghuni,
  onNavigateToPembayaran,
  onLogout,
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const transactions = [
    {
      no: 1,
      date: "01 Mei 2026",
      description: "Pembayaran Sewa",
      in: "Rp700.000",
      out: "-",
      balance: "Rp700.000",
    },
    {
      no: 2,
      date: "05 Mei 2026",
      description: "Pembayaran Sewa",
      in: "Rp800.000",
      out: "-",
      balance: "Rp1.500.000",
    },
    {
      no: 3,
      date: "10 Mei 2026",
      description: "Pembelian Alat Kebersihan",
      in: "-",
      out: "Rp200.000",
      balance: "Rp1.300.000",
    },
    {
      no: 4,
      date: "15 Mei 2026",
      description: "Pembayaran Sewa",
      in: "Rp850.000",
      out: "-",
      balance: "Rp2.150.000",
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Laporan</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium text-slate-600">Admin</span>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center">
            A
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-8 flex-1">
        {/* Summary Cards */}
        <div className="relative mb-8">
          {/* Download Button positioned behind cards conceptually or right side */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center -mr-2">
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-colors shadow-sm text-sm border-none cursor-pointer h-full translate-x-4 flex items-center justify-end pr-6">
                Unduh
              </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <span className="text-slate-500 font-bold text-sm mb-2">
                Total Pemasukan
              </span>
              <span className="text-3xl font-bold text-slate-900">
                Rp27.750.000
              </span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <span className="text-slate-500 font-bold text-sm mb-2">
                Total Pengeluaran
              </span>
              <span className="text-3xl font-bold text-slate-900">
                Rp2.300.000
              </span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col mr-6 md:mr-10">
              <span className="text-slate-500 font-bold text-sm mb-2">
                Laba Bersih
              </span>
              <span className="text-3xl font-bold text-slate-900">
                Rp25.450.000
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="w-full min-w-[800px]">
            <div className="flex bg-slate-50 p-4 text-sm font-bold text-slate-500 border-b border-slate-100">
              <div className="w-16 px-4">No</div>
              <div className="flex-1 px-4">Tanggal</div>
              <div className="flex-[1.5] px-4">Keterangan</div>
              <div className="flex-1 px-4">Pemasukan</div>
              <div className="flex-1 px-4">Pengeluaran</div>
              <div className="flex-1 px-4">Saldo</div>
            </div>

            <div className="flex flex-col">
              {transactions.map((transaction) => (
                <div
                  key={transaction.no}
                  className="flex items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm"
                >
                  <div className="w-16 px-4 text-slate-600">
                    {transaction.no}
                  </div>
                  <div className="flex-1 px-4 text-slate-600">
                    {transaction.date}
                  </div>
                  <div className="flex-[1.5] px-4 text-slate-700 font-medium">
                    {transaction.description}
                  </div>
                  <div className="flex-1 px-4 text-slate-600">
                    {transaction.in}
                  </div>
                  <div className="flex-1 px-4 text-slate-600">
                    {transaction.out}
                  </div>
                  <div className="flex-1 px-4 text-slate-600">
                    {transaction.balance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
