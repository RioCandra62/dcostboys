"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getKamar } from "../../lib/dashboard/data_kamar";

export default function kamar() {
  const router = useRouter();
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKamar() {
      try {
        const data = await getKamar();
        setKamarList(data || []);
      } catch (err) {
        console.error("Gagal memuat kamar:", err);
      } finally {
        setLoading(false);
      }
    }
    loadKamar();
  }, []);
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Daftar Kamar</h1>
        <p className="text-slate-500 text-lg">
          Temukan kamar berdasarkan nomor kamar dan tipe fasilitasnya.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-end gap-6 mb-12">
        <div className="flex-1 w-full flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-500">
            Filter Harga
          </label>
          <input
            type="text"
            placeholder="Isi filter harga"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <div className="flex-1 w-full flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-500">
            Jenis Kamar
          </label>
          <input
            type="text"
            placeholder="AC / Non-AC"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <div className="flex-1 w-full flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-500">Status</label>
          <input
            type="text"
            placeholder="Semua status"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg transition-colors text-sm h-[42px]">
          Filter
        </button>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[calc(100vh-500px)]">
        {loading ? (
          <div className="col-span-full text-center text-slate-500 py-8">
            Memuat daftar kamar...
          </div>
        ) : kamarList.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-8">
            Tidak ada kamar tersedia saat ini.
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
                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-slate-400 font-semibold text-base">
                    Foto kamar
                  </span>
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
                    className={`text-white text-xs font-bold px-3 py-1.5 rounded-full ${isTersedia ? "bg-green-500" : "bg-red-500"}`}
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
    </main>
  );
}
