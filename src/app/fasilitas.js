// import React from 'react';
// import { Home, User } from 'lucide-react';

// export default function FasilitasPage({ onNavigateToDashboard, onNavigateToProfile, onNavigateToKamar, onNavigateToContact }) {
//   const fasilitas = [
//     {
//       icon: '❄️',
//       title: 'Kamar AC',
//       description: 'Tersedia tipe kamar dengan AC untuk kenyamanan lebih.'
//     },
//     {
//       icon: '🛏️',
//       title: 'Kamar Non-AC',
//       description: 'Pilihan kamar ekonomis dengan fasilitas dasar lengkap.'
//     },
//     {
//       icon: '📶',
//       title: 'WiFi',
//       description: 'Akses internet untuk kebutuhan kuliah dan komunikasi.'
//     },
//     {
//       icon: '🚿',
//       title: 'Kamar Mandi',
//       description: 'Fasilitas kamar mandi yang bersih dan mudah diakses.'
//     },
//     {
//       icon: '🪑',
//       title: 'Perabot Kamar',
//       description: 'Tempat tidur, lemari, dan meja belajar.'
//     },
//     {
//       icon: '📍',
//       title: 'Lokasi Strategis',
//       description: 'Dekat area kampus dan akses kebutuhan harian.'
//     }
//   ];

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
//             <button onClick={onNavigateToDashboard} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none">Home</button>
//             <button onClick={onNavigateToKamar} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none">Kamar</button>
//             <span className="text-blue-600 font-bold text-sm">Fasilitas</span>
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

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         <div className="mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Fasilitas Kos</h1>
//           <p className="text-slate-500 text-base md:text-lg">Fasilitas yang tersedia untuk menunjang kenyamanan penghuni.</p>
//         </div>

//         {/* Fasilitas Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {fasilitas.map((item, index) => (
//             <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[200px]">
//               <div className="text-2xl mb-4">{item.icon}</div>
//               <h3 className="font-bold text-slate-800 text-lg mb-3">{item.title}</h3>
//               <p className="text-slate-500 text-sm leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }
