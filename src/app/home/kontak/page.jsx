import React from "react";
import { Home, User } from "lucide-react";

export default function ContactPage({}) {
  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Hubungi Kami</h1>
        <p className="text-slate-500 text-lg">
          Kontak dan lokasi d'cost boys D'K.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Info Kontak */}
        <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">WhatsApp</h3>
            <p className="text-slate-500">0812-3456-7890</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Email</h3>
            <p className="text-slate-500">admin@dcostboys.com</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Alamat</h3>
            <p className="text-slate-500">Jl. Lapangan Sukapura, Bandung</p>
          </div>
        </div>

        {/* Maps Placeholder */}
        <div className="w-full lg:w-2/3 h-[400px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300 shadow-sm">
          <span className="text-slate-400 font-semibold text-xl">
            Google Maps
          </span>
        </div>
      </div>
    </main>
  );
}
