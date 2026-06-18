// import React, { useState } from 'react';
// import { Home, User, ArrowLeft } from 'lucide-react';

// export default function BookingPage({ room, onNavigateToDashboard, onNavigateToKamar, onNavigateToDetail, onNavigateToContact, onNavigateToProfile, onNavigateToFasilitas, onLogout }) {
//   const [namaLengkap, setNamaLengkap] = useState('');
//   const [nomorWhatsApp, setNomorWhatsApp] = useState('');
//   const [tanggalMasuk, setTanggalMasuk] = useState('');
//   const [catatan, setCatatan] = useState('');

//   // Data kamar yang dipilih (fallback jika tidak ada)
//   const roomData = room || { name: 'Kamar Terpilih', type: 'Tipe AC', price: 'Rp0/bln', status: 'Tersedia' };
  
//   const handleBooking = (e) => {
//     e.preventDefault();
//     console.log("Pesanan kamar:", roomData.name);
//     console.log("Data Pemesan:", { namaLengkap, nomorWhatsApp, tanggalMasuk, catatan });
//     alert("Berhasil! Pesanan kamar Anda sedang diproses.");
//     onNavigateToDashboard();
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">
//       {/* Navbar */}
//       <nav className="bg-white border-b border-slate-100">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateToDashboard}>
//             <Home className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
//             <span className="font-bold text-slate-800 text-lg">d'cost boys D'K</span>
//           </div>
//           <div className="flex items-center space-x-8">
//             <button onClick={onNavigateToDashboard} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Home</button>
//             <button onClick={onNavigateToKamar} className="text-blue-600 font-bold text-sm bg-transparent border-none cursor-pointer">Kamar</button>
//             <button onClick={onNavigateToFasilitas} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Fasilitas</button>
//             <button onClick={onNavigateToContact} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Kontak</button>
//             <button 
//               onClick={onNavigateToProfile}
//               className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer border-none"
//               title="Profil"
//             >
//               <User className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <button 
//           onClick={onNavigateToDetail}
//           className="flex items-center text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors bg-transparent border-none cursor-pointer"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Kembali ke Detail Kamar
//         </button>

//         <div className="mb-10">
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">Form Pemesanan</h1>
//           <p className="text-slate-500 text-lg">Lengkapi data berikut untuk melakukan pemesanan kamar.</p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Form Pemesanan */}
//           <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
//             <form onSubmit={handleBooking} className="flex flex-col space-y-6">
              
//               <div className="flex flex-col space-y-2">
//                 <label className="text-sm font-medium text-slate-500">Pilih Kamar</label>
//                 <input 
//                   type="text" 
//                   value={roomData.name} 
//                   readOnly
//                   placeholder="Isi pilih kamar" 
//                   className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none text-sm"
//                 />
//               </div>

//               <div className="flex flex-col space-y-2">
//                 <label className="text-sm font-medium text-slate-500">Nama Lengkap</label>
//                 <input 
//                   type="text" 
//                   placeholder="Isi nama lengkap"
//                   value={namaLengkap}
//                   onChange={(e) => setNamaLengkap(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
//                 />
//               </div>

//               <div className="flex flex-col space-y-2">
//                 <label className="text-sm font-medium text-slate-500">Nomor WhatsApp</label>
//                 <input 
//                   type="tel" 
//                   placeholder="Isi nomor whatsapp"
//                   value={nomorWhatsApp}
//                   onChange={(e) => setNomorWhatsApp(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
//                 />
//               </div>

//               <div className="flex flex-col space-y-2">
//                 <label className="text-sm font-medium text-slate-500">Tanggal Masuk</label>
//                 <input 
//                   type="date" 
//                   placeholder="Isi tanggal masuk"
//                   value={tanggalMasuk}
//                   onChange={(e) => setTanggalMasuk(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
//                 />
//               </div>

//               <div className="flex flex-col space-y-2">
//                 <label className="text-sm font-medium text-slate-500">Catatan Opsional</label>
//                 <input 
//                   type="text" 
//                   placeholder="Isi catatan opsional"
//                   value={catatan}
//                   onChange={(e) => setCatatan(e.target.value)}
//                   className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
//                 />
//               </div>

//               <button 
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors mt-4 shadow-sm text-sm"
//               >
//                 Kirim Pesanan
//               </button>
//             </form>
//           </div>

//           {/* Ringkasan */}
//           <div className="w-full lg:w-1/3 flex flex-col gap-6">
//             <div className="w-full h-[300px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300 shadow-sm">
//               <span className="text-slate-400 font-semibold text-lg">Foto kamar terpilih</span>
//             </div>

//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-4">Ringkasan</h3>
//               {/* <p className="text-slate-600 text-sm mb-3">
//                 {roomData.name} &middot; {roomData.type} &middot; {roomData.price.replace('/bln', '/bulan')}
//               </p> */}
//               <p className="text-sm font-bold">
//                 <span className="text-slate-700">Status: </span>
//                 <span className={roomData.status === 'Tersedia' ? 'text-green-500' : 'text-red-500'}>
//                   {roomData.status}
//                 </span>
//               </p>
//             </div>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }
