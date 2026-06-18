"use client";
import React, { useState, useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { getPenghuni } from "../../lib/dashboard/data_reservasi";

export default function DataPenghuniPage({
  onNavigateToDashboardAdmin,
  onNavigateToDataKamar,
  onNavigateToReservasi,
  onNavigateToPembayaran,
  onNavigateToLaporan,
  onLogout,
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [penghuniList, setPenghuniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPenghuni() {
      try {
        setLoading(true);
        const data = await getPenghuni();
        setPenghuniList(data || []);
      } catch (err) {
        console.error("Gagal mengambil data penghuni:", err);
        setError("Gagal memuat data penghuni.");
      } finally {
        setLoading(false);
      }
    }
    loadPenghuni();
  }, []);

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Penghuni</h1>
          <p className="text-sm text-slate-500 mt-1">
            Data calon penghuni yang sudah disetujui
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium text-slate-600">Admin</span>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 font-bold rounded-full flex items-center justify-center">
            A
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-8 flex-1">
        <p className="text-slate-500 mb-8 text-sm">
          Data Penghuni berasal dari reservasi yang sudah disetujui.
        </p>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          <div className="w-full min-w-[800px]">
            <div className="flex bg-slate-50 p-6 text-sm font-bold text-slate-500 border-b border-slate-100">
              <div className="w-16 px-4">No</div>
              <div className="flex-[1.5] px-4">Nama</div>
              <div className="flex-1 px-4">Kamar</div>
              <div className="flex-1 px-4">Tanggal Masuk</div>
              <div className="flex-1 px-4">No HP</div>
              <div className="flex-1 px-4">Status</div>
            </div>

            <div className="flex flex-col">
              {loading ? (
                <div className="p-6 text-center text-slate-500">Memuat data penghuni...</div>
              ) : error ? (
                <div className="p-6 text-center text-red-500">{error}</div>
              ) : penghuniList.length === 0 ? (
                <div className="p-6 text-center text-slate-500">Belum ada data penghuni.</div>
              ) : (
                penghuniList.map((tenant, index) => {
                  const formattedDate = tenant.tanggal
                    ? new Date(tenant.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "-";

                  return (
                    <div
                      key={tenant.id_reservasi || index}
                      className="flex items-center p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm"
                    >
                      <div className="w-16 px-4 text-slate-600">{index + 1}</div>
                      <div className="flex-[1.5] px-4 text-slate-700 font-medium">
                        {tenant.nama_penghuni}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">
                        Kamar {tenant.nama_kamar}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">
                        {formattedDate}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">
                        {tenant.no_hp || "-"}
                      </div>
                      <div className="flex-1 px-4 font-bold text-green-500">
                        Aktif
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-blue-600 font-bold text-sm">
            Data ini digunakan saat admin memilih penghuni pada menu pembayaran.
          </p>
        </div>
      </div>
    </main>
  );
}
