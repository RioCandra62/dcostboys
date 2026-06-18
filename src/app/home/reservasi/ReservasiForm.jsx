"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { addReservasi } from "../../lib/dashboard/data_reservasi";

export default function ReservasiForm({ room, session }) {
  const router = useRouter();

  const [namaLengkap, setNamaLengkap] = useState(session?.nama || "");
  const [nomorWhatsApp, setNomorWhatsApp] = useState(session?.no_wa || "");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [catatan, setCatatan] = useState("");

  const isTersedia = room?.ketersediaan === "tersedia";
  const formattedPrice = room?.harga
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(room.harga) + "/bln"
    : "Rp0/bln";

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!room?.id_kamar) {
      alert("Kamar tidak valid.");
      return;
    }

    try {
      const res = await addReservasi({
        id_kamar: room.id_kamar,
        tanggal: tanggalMasuk,
        id_pemesan: session?.id,
        status_reservasi: "pending",
      });

      if (res.success) {
        alert("Berhasil! Pesanan kamar Anda sedang diproses.");
        router.push("/home");
      } else {
        alert(`Gagal memproses reservasi: ${res.error}`);
      }
    } catch (err) {
      console.error("Gagal melakukan reservasi:", err);
      alert("Terjadi kesalahan internal. Silakan coba lagi.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
      <Link
        href={`/home/kamar/${room?.id_kamar || ""}`}
        className="inline-flex items-center text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors bg-transparent border-none cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Kembali ke Detail Kamar
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Form Pemesanan
        </h1>
        <p className="text-slate-500 text-lg">
          Lengkapi data berikut untuk melakukan pemesanan kamar.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Pemesanan */}
        <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <form onSubmit={handleBooking} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">
                Pilih Kamar
              </label>
              <input
                type="text"
                value={room ? `Kamar ${room.nama_kamar}` : "Kamar Terpilih"}
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none text-sm"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Isi nama lengkap"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                placeholder="Isi nomor whatsapp"
                value={nomorWhatsApp}
                onChange={(e) => setNomorWhatsApp(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">
                Tanggal Masuk
              </label>
              <input
                type="date"
                placeholder="Isi tanggal masuk"
                value={tanggalMasuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">
                Catatan Opsional
              </label>
              <input
                type="text"
                placeholder="Isi catatan opsional (misal: butuh parkir motor)"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors mt-4 shadow-sm text-sm"
            >
              Kirim Pesanan
            </button>
          </form>
        </div>

        {/* Ringkasan */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="w-full h-[300px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300 shadow-sm">
            <span className="text-slate-400 font-semibold text-lg">
              Foto kamar terpilih
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Ringkasan</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-500">Nama:</span> Kamar {room?.nama_kamar}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Tipe:</span> Tipe {room?.tipe_kamar || "Standard"}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Harga:</span> {formattedPrice}
              </p>
              <p className="font-bold flex items-center">
                <span className="font-semibold text-slate-500 mr-1.5">Status:</span>
                <span className={isTersedia ? "text-green-500" : "text-red-500"}>
                  {isTersedia ? "Tersedia" : "Terisi"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
