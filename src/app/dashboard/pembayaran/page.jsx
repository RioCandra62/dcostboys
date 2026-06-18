"use client";
import React, { useState, useEffect } from "react";
import { Home, AlertTriangle, X } from "lucide-react";
import { getPembayaran, addPembayaran } from "../../lib/dashboard/data_pembayaran";

export default function PembayaranPage({}) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchPeriod, setSearchPeriod] = useState("");

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [period, setPeriod] = useState("tahunan");
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  async function loadPayments() {
    try {
      setLoading(true);
      const data = await getPembayaran();
      setPayments(data || []);
    } catch (err) {
      console.error("Gagal mengambil data pembayaran:", err);
      setError("Gagal memuat data pembayaran.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedTenantId("");
    setPeriod("tahunan");
    setModalError("");
    setShowAddModal(true);
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!selectedTenantId) {
      setModalError("Silakan pilih penghuni.");
      return;
    }

    const selectedTenant = payments.find(p => p.id_reservasi === selectedTenantId);
    if (!selectedTenant) {
      setModalError("Data penghuni tidak valid.");
      return;
    }

    try {
      setSubmitting(true);
      setModalError("");
      
      const result = await addPembayaran({
        id_user: selectedTenant.user_id,
        id_kamar: selectedTenant.id_kamar,
        priode_pembayaran: period
      });

      if (result.success) {
        setShowAddModal(false);
        await loadPayments();
      } else {
        setModalError(result.error || "Gagal menyimpan pembayaran.");
      }
    } catch (err) {
      console.error("Error saving payment:", err);
      setModalError("Terjadi kesalahan sistem saat menyimpan pembayaran.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter logic
  const filteredPayments = payments.filter((payment) => {
    const nameMatch = payment.nama_penghuni
      ? payment.nama_penghuni.toLowerCase().includes(searchName.toLowerCase())
      : false;
    
    // Normalize period string for match comparison
    const periodStr = payment.id_pembayaran 
      ? (payment.priode_pembayaran === 'tahunan' ? 'Tahunan' : 'Bulanan') 
      : 'Tahunan'; // default representation
    const periodMatch = periodStr.toLowerCase().includes(searchPeriod.toLowerCase());
    
    return (searchName === "" || nameMatch) && (searchPeriod === "" || periodMatch);
  });

  // Calculate selected tenant info in modal
  const selectedTenantInfo = payments.find(p => p.id_reservasi === selectedTenantId);
  const calculatedBill = selectedTenantInfo 
    ? (period === "tahunan" ? selectedTenantInfo.harga * 12 : selectedTenantInfo.harga)
    : 0;

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pembayaran Sewa</h1>
          <p className="text-sm text-slate-500 mt-1">
            Input pembayaran tahunan/bulanan dan update status lunas / belum lunas
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
        {/* Filter Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-end gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-end">
            <div className="flex flex-col space-y-2 flex-1 sm:w-[250px]">
              <label className="text-sm font-medium text-slate-500">
                Pilih Penghuni
              </label>
              <input
                type="text"
                placeholder="Cari nama penghuni..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400 text-slate-800"
              />
            </div>
            <div className="flex flex-col space-y-2 flex-1 sm:w-[250px]">
              <label className="text-sm font-medium text-slate-500">
                Periode
              </label>
              <input
                type="text"
                placeholder="Bulanan / Tahunan"
                value={searchPeriod}
                onChange={(e) => setSearchPeriod(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400 text-slate-800"
              />
            </div>
            <button 
              onClick={() => {
                setSearchName("");
                setSearchPeriod("");
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm h-[42px] border-none cursor-pointer shrink-0"
            >
              Reset
            </button>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm text-sm border-none cursor-pointer h-[42px] shrink-0"
          >
            Tambah Pembayaran
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          <div className="w-full min-w-[800px]">
            <div className="flex bg-slate-50 p-6 text-sm font-bold text-slate-500 border-b border-slate-100">
              <div className="w-16 px-4">No</div>
              <div className="flex-[1.5] px-4">Nama</div>
              <div className="flex-1 px-4">Kamar</div>
              <div className="flex-1 px-4">Jenis Bayar</div>
              <div className="flex-1 px-4">Jumlah</div>
              <div className="flex-1 px-4">Status</div>
            </div>

            <div className="flex flex-col">
              {loading ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Memuat data pembayaran...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500 text-sm">
                  {error}
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Tidak ada data pembayaran yang ditemukan.
                </div>
              ) : (
                filteredPayments.map((payment, index) => {
                  const hasPaid = !!payment.id_pembayaran;
                  const displayPeriod = hasPaid
                    ? (payment.priode_pembayaran === "tahunan" ? "Tahunan" : "Bulanan")
                    : "Tahunan"; // default period
                  const price = payment.harga || 0;
                  const calculatedAmount = displayPeriod === "Tahunan" ? price * 12 : price;

                  return (
                    <div
                      key={payment.id_reservasi || index}
                      className="flex items-center p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm"
                    >
                      <div className="w-16 px-4 text-slate-600">{index + 1}</div>
                      <div className="flex-[1.5] px-4 text-slate-700 font-medium">
                        {payment.nama_penghuni}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">
                        Kamar {payment.nama_kamar}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">
                        {displayPeriod}
                      </div>
                      <div className="flex-1 px-4 text-slate-600">
                        Rp{calculatedAmount.toLocaleString("id-ID")}
                      </div>
                      <div className="flex-1 px-4 font-bold">
                        <span
                          className={
                            hasPaid ? "text-green-500" : "text-red-500"
                          }
                        >
                          {hasPaid ? "Lunas" : "Belum Lunas"}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <p className="text-orange-600 font-bold text-sm">
            Jika melewati jatuh tempo, sistem menampilkan notifikasi
            keterlambatan pembayaran.
          </p>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl flex flex-col relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tambah Pembayaran</h2>
            <p className="text-slate-500 text-sm mb-6">
              Masukkan pembayaran baru untuk penghuni yang belum lunas.
            </p>

            {modalError && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 font-medium">
                {modalError}
              </div>
            )}

            <form onSubmit={handleAddPayment} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Nama Penghuni *</label>
                <div className="relative">
                  <select 
                    value={selectedTenantId}
                    onChange={(e) => setSelectedTenantId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 bg-white cursor-pointer"
                  >
                    <option value="">Pilih Penghuni</option>
                    {payments
                      .filter(p => !p.id_pembayaran) // only show unpaid ones to pay
                      .map(p => (
                        <option key={p.id_reservasi} value={p.id_reservasi}>
                          {p.nama_penghuni} - Kamar {p.nama_kamar}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>

              {selectedTenantInfo && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1">Kamar</label>
                    <p className="text-sm font-semibold text-slate-800 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">
                      Kamar {selectedTenantInfo.nama_kamar}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1">Harga Kamar / Bulan</label>
                    <p className="text-sm font-semibold text-slate-800 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">
                      Rp{selectedTenantInfo.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Periode Pembayaran *</label>
                <div className="relative">
                  <select 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 bg-white cursor-pointer"
                  >
                    <option value="tahunan">Tahunan (12 Bulan)</option>
                    <option value="bulanan">Bulanan (1 Bulan)</option>
                  </select>
                </div>
              </div>

              {selectedTenantInfo && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-700">Total Tagihan:</span>
                  <span className="text-lg font-extrabold text-blue-900">
                    Rp{calculatedBill.toLocaleString("id-ID")}
                  </span>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 text-slate-600 font-bold bg-transparent border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-sm cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors text-sm border-none cursor-pointer disabled:bg-blue-400"
                >
                  {submitting ? "Menyimpan..." : "Simpan Pembayaran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
