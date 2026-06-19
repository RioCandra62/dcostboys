import React from "react";
import Link from "next/link";
import { ArrowLeft, Check, Phone, Calendar } from "lucide-react";
import { getKamarById } from "../../../lib/dashboard/data_kamar";
import { notFound } from "next/navigation";


export default async function DetailKamarPage({ params }) {
  const { id_kamar } = await params;
  const room = await getKamarById(id_kamar);

  if (!room) {
    notFound();
  }

  const isTersedia = room.ketersediaan === "tersedia";
  const formattedPrice = room.harga
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(room.harga) + "/bln"
    : "-";

  // Default list of room facilities
  const defaultFasilitas = [
    "Tempat tidur",
    "Lemari pakaian",
    "Meja belajar",
    "WiFi",
    "Kamar mandi dalam",
    "Listrik token",
  ];

  // If room.deskripsi is present, split it by commas, otherwise use default facilities list
  const fasilitas = room.deskripsi
    ? room.deskripsi
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : defaultFasilitas;

  // Get index from 1 to 5 based on id_kamar hash for main image
  const imageIndex = room.id_kamar
    ? (room.id_kamar.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5) + 1
    : 1;

  // Generate 4 other thumbnail indices
  const thumbnails = [1, 2, 3, 4, 5]
    .filter((idx) => idx !== imageIndex)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
      <Link
        href="/home/kamar"
        className="inline-flex items-center text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors bg-transparent border-none cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Kembali ke Daftar Kamar
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Bagian Kiri: Visualisasi / Foto Kamar */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Foto Utama */}
          <div className="w-full h-[400px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
            <img
              src={`/image/img-kamar${imageIndex}.jpeg`}
              alt={`Kamar ${room.nama_kamar}`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail */}
          <div className="grid grid-cols-4 gap-4">
            {thumbnails.map((idx) => (
              <div key={idx} className="w-full h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative">
                <img
                  src={`/image/img-kamar${idx}.jpeg`}
                  alt={`Kamar ${room.nama_kamar} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bagian Kanan: Detail & Informasi */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Kamar {room.nama_kamar}
          </h1>

          <div className="mb-8">
            <span
              className={`text-white text-sm font-bold px-4 py-1.5 rounded-full ${
                isTersedia ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isTersedia ? "Tersedia" : "Terisi"}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Tipe Kamar
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              Tipe {room.tipe_kamar || "Standard"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Harga Sewa
            </h2>
            <p className="text-blue-600 font-bold text-2xl">{formattedPrice}</p>
          </div>

          {room.deskripsi && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Deskripsi
              </h2>
              <p className="text-slate-500 leading-relaxed">{room.deskripsi}</p>
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Fasilitas</h2>
            <div className="flex flex-col gap-3">
              {fasilitas.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 text-slate-700"
                >
                  <Check className="w-4 h-4 text-slate-600" strokeWidth={3} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-auto">
            <a
              href={`https://wa.me/6281234567890?text=Halo%20Admin%2C%20saya%20tertarik%20dengan%20Kamar%20${room.nama_kamar}%20tipe%20${room.tipe_kamar}.%20Apakah%20masih%20tersedia%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-white text-blue-600 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-colors shadow-sm border border-slate-200 text-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Hubungi Kami
            </a>
            <Link
              href={`/home/reservasi?room=${room.id_kamar}`}
              className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Booking Sekarang
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
