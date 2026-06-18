"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { getLatestKamar } from "../lib/dashboard/data_kamar";

export default function landing() {
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatestKamar() {
      try {
        const data = await getLatestKamar();
        setKamarList(data || []);
      } catch (err) {
        console.error("Gagal memuat kamar terbaru:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLatestKamar();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Cari Kos Nyaman di d'cost boys D'K
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Hunian nyaman, lokasi strategis, fasilitas lengkap, dan booking
            kamar online.
          </p>
          <Link
            href="/home/kamar"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Lihat Kamar
          </Link>
        </div>
        <div className="flex-1 w-full h-[350px] md:h-[400px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300 overflow-hidden relative">
          <img
            src="/image/img-kamar5.jpeg"
            alt="Hero Kos"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Features Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-28">
          <h3 className="font-bold text-slate-800 mb-1 text-lg">
            Harga Terjangkau
          </h3>
          <p className="text-slate-500 text-sm">Mulai dari Rp700.000/bln</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-28">
          <h3 className="font-bold text-slate-800 mb-1 text-lg">
            Lokasi Strategis
          </h3>
          <p className="text-slate-500 text-sm">Dekat kampus & pusat kota</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-28">
          <h3 className="font-bold text-slate-800 mb-1 text-lg">
            Fasilitas Lengkap
          </h3>
          <p className="text-slate-500 text-sm">
            AC / Non-AC, WiFi, kamar mandi
          </p>
        </div>
      </section>

      {/* Kamar Pilihan */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Kamar Terbaru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-slate-500 py-8">
              Memuat data kamar...
            </div>
          ) : kamarList.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-8">
              Tidak ada kamar yang tersedia saat ini.
            </div>
          ) : (
            kamarList.map((room, index) => {
              const isTersedia = room.ketersediaan === "tersedia";
              const formattedPrice = room.harga
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(room.harga) + "/bln"
                : "-";

              return (
                <div
                  key={room.id_kamar || index}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col"
                >
                  <div className="w-full h-40 bg-slate-100 rounded-xl mb-4 overflow-hidden relative border border-slate-100">
                    <img
                      src={`/image/img-kamar${(index % 5) + 1}.jpeg`}
                      alt={`Kamar ${room.nama_kamar}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">
                    Kamar {room.nama_kamar}
                  </h3>
                  <p className="text-slate-500 text-sm mb-2">
                    Tipe {room.tipe_kamar}
                  </p>
                  <p className="text-blue-600 font-bold text-sm mb-4">
                    {formattedPrice}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className={`text-white text-xs font-bold px-3 py-1.5 rounded-full ${
                        isTersedia ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isTersedia ? "Tersedia" : "Terisi"}
                    </span>
                    <Link
                      href={`/home/kamar/${room.id_kamar}`}
                      className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
