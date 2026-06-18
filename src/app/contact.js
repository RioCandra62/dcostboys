// import React from 'react';
// import { Home, User } from 'lucide-react';

// export default function ContactPage({ onNavigateToDashboard, onNavigateToKamar, onNavigateToProfile, onNavigateToFasilitas, onLogout }) {
//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
//       {/* Navbar */}
//       <nav className="bg-white border-b border-slate-100">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateToDashboard}>
//             <Home className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
//             <span className="font-bold text-slate-800 text-lg">d'cost boys D'K</span>
//           </div>
//           <div className="flex items-center space-x-8">
//             <button onClick={onNavigateToDashboard} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Home</button>
//             <button onClick={onNavigateToKamar} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Kamar</button>
//             <button onClick={onNavigateToFasilitas} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer">Fasilitas</button>
//             <button className="text-blue-600 font-bold text-sm bg-transparent border-none cursor-pointer">Kontak</button>
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

//       {/* Main Content */}
//       <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">Hubungi Kami</h1>
//           <p className="text-slate-500 text-lg">Kontak dan lokasi d'cost boys D'K.</p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Info Kontak */}
//           <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col space-y-8">
//             <div>
//               <h3 className="font-bold text-slate-900 text-lg mb-1">WhatsApp</h3>
//               <p className="text-slate-500">0812-3456-7890</p>
//             </div>
//             <div>
//               <h3 className="font-bold text-slate-900 text-lg mb-1">Email</h3>
//               <p className="text-slate-500">admin@dcostboys.com</p>
//             </div>
//             <div>
//               <h3 className="font-bold text-slate-900 text-lg mb-1">Alamat</h3>
//               <p className="text-slate-500">Jl. Lapangan Sukapura, Bandung</p>
//             </div>
//           </div>

//           {/* Maps Placeholder */}
//           <div className="w-full lg:w-2/3 h-[400px] bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-300 shadow-sm">
//             <span className="text-slate-400 font-semibold text-xl">Google Maps</span>
//           </div>

//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white mt-12 py-10">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
//               <span className="font-bold text-lg">d'cost boys D'K</span>
//             </div>
//             <p className="text-slate-400 text-sm">
//               Sistem informasi dan manajemen hunian kos.
//             </p>
//           </div>
//           <div>
//             <h4 className="font-bold mb-4">Menu</h4>
//             <div className="text-slate-400 text-sm flex gap-2">
//               <button onClick={onNavigateToDashboard} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">Home</button> &middot;
//               <button onClick={onNavigateToKamar} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">Kamar</button> &middot;
//               <button className="text-white bg-transparent border-none cursor-pointer">Kontak</button>
//             </div>
//           </div>
//           <div>
//             <h4 className="font-bold mb-4">Kontak</h4>
//             <div className="text-slate-400 text-sm">
//               WhatsApp &middot; Email &middot; Lokasi
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
