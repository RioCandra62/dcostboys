"use client";
import React, { useState, useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { getReservasi, updateReservasiStatus } from "../../lib/dashboard/data_reservasi";

export default function ReservasiPage({}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [reservasiList, setReservasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReservasi() {
      try {
        setLoading(true);
        const data = await getReservasi();
        setReservasiList(data || []);
      } catch (err) {
        console.error("Gagal mengambil data reservasi:", err);
        setError("Gagal memuat data reservasi.");
      } finally {
        setLoading(false);
      }
    }
    loadReservasi();
  }, []);

  const handleUpdateStatus = async (id_reservasi, status) => {
    const isApprove = status === "disetujui";
    if (confirm(`Apakah Anda yakin ingin ${isApprove ? "menyetujui" : "menolak"} reservasi ini?`)) {
      try {
        const res = await updateReservasiStatus(id_reservasi, status);
        if (res.success) {
          const data = await getReservasi();
          setReservasiList(data || []);
        } else {
          alert("Gagal memperbarui status: " + res.error);
        }
      } catch (err) {
        console.error(err);
        alert("Gagal memperbarui status.");
      }
    }
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reservasi Kamar</h1>
          <p className="text-sm text-slate-500 mt-1">
            Admin memeriksa data pemesanan dan ketersediaan kamar
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
        <p className="text-slate-500 mb-8">
          Sistem menerima data reservasi dari pengunjung dan menampilkan
          notifikasi kepada admin.
        </p>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          <div className="w-full min-w-[800px]">
            <div className="flex bg-slate-50 p-6 text-sm font-bold text-slate-500 border-b border-slate-100">
              <div className="w-16 px-4">No</div>
              <div className="flex-1 px-4">Nama</div>
              <div className="flex-1 px-4">Kamar</div>
              <div className="flex-1 px-4">Tanggal</div>
              <div className="flex-1 px-4">Status</div>
              <div className="flex-1 px-4">Aksi</div>
            </div>

            <div className="flex flex-col">
              {loading ? (
                <div className="p-6 text-center text-slate-500">Memuat data reservasi...</div>
              ) : error ? (
                <div className="p-6 text-center text-red-500">{error}</div>
              ) : reservasiList.length === 0 ? (
                <div className="p-6 text-center text-slate-500">Belum ada data reservasi.</div>
              ) : (
                reservasiList.map((res, index) => {
                  const isPending = res.status_reservasi === "pending" || res.status_reservasi === "Pending";
                  const isDisetujui = res.status_reservasi === "disetujui" || res.status_reservasi === "Disetujui";
                  
                  const formattedDate = res.tanggal
                    ? new Date(res.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "-";

                  return (
                    <div
                      key={res.id_reservasi || index}
                      className="flex items-center p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm"
                    >
                      <div className="w-16 px-4 text-slate-600">{index + 1}</div>
                      <div className="flex-1 px-4 text-slate-700 font-medium">
                        {res.nama_pemesan}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">Kamar {res.nama_kamar}</div>
                      <div className="flex-1 px-4 text-slate-600">{formattedDate}</div>
                      <div className="flex-1 px-4 font-bold">
                        <span
                          className={
                            isPending
                              ? "text-orange-500"
                              : isDisetujui
                                ? "text-green-500"
                                : "text-red-500"
                          }
                        >
                          {res.status_reservasi}
                        </span>
                      </div>
                      <div className="flex-1 px-4 text-slate-600 text-sm">
                        {isPending ? (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(res.id_reservasi, "disetujui")}
                              className="hover:text-blue-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600"
                            >
                              Setujui
                            </button>
                            <span className="mx-2">&middot;</span>
                            <button 
                              onClick={() => handleUpdateStatus(res.id_reservasi, "ditolak")}
                              className="hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600"
                            >
                              Tolak
                            </button>
                          </>
                        ) : (
                          <button className="hover:text-blue-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600">
                            Detail
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Info Alerts */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl p-6">
            <p className="text-green-600 font-bold text-sm mb-4">
              Jika kamar tersedia:
            </p>
            <div className="space-y-2">
              <p className="text-green-600 font-bold text-sm">
                Reservasi disetujui &rarr; masuk Data Penghuni
              </p>
              <p className="text-green-600 font-bold text-sm">
                Status kamar berubah menjadi terisi
              </p>
            </div>
          </div>

          <div className="flex-1 bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-600 font-bold text-sm mb-4">
              Jika kamar tidak tersedia:
            </p>
            <div className="space-y-2">
              <p className="text-red-600 font-bold text-sm">
                Reservasi ditolak
              </p>
              <p className="text-red-600 font-bold text-sm">
                Status reservasi menjadi gagal
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
