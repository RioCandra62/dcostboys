"use client";
import React, { useState, useEffect } from "react";
import { getKamar, addKamar, updateKamar, deleteKamar } from "../../lib/dashboard/data_kamar";

export default function DataKamarPage() {
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States untuk Tambah Kamar Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [nomorKamar, setNomorKamar] = useState("");
  const [luasKamar, setLuasKamar] = useState("AC");
  const [hargaSewa, setHargaSewa] = useState("");
  const [status, setStatus] = useState("tersedia");
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States untuk Edit Kamar Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editNomorKamar, setEditNomorKamar] = useState("");
  const [editLuasKamar, setEditLuasKamar] = useState("AC");
  const [editHargaSewa, setEditHargaSewa] = useState("");
  const [editStatus, setEditStatus] = useState("tersedia");
  const [editDeskripsi, setEditDeskripsi] = useState("");

  const handleOpenEditModal = (room) => {
    setEditingId(room.id_kamar);
    setEditNomorKamar(room.nama_kamar);
    setEditLuasKamar(room.tipe_kamar);
    setEditHargaSewa(room.harga);
    setEditStatus(room.ketersediaan);
    setEditDeskripsi(room.deskripsi || "");
    setShowEditModal(true);
  };

  const handleUpdateKamar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateKamar(editingId, {
        nama_kamar: editNomorKamar,
        tipe_kamar: editLuasKamar,
        harga: parseInt(editHargaSewa, 10),
        ketersediaan: editStatus,
        deskripsi: editDeskripsi,
      });
      setShowEditModal(false);
      // Reload list
      const data = await getKamar();
      setKamarList(data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui data kamar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteKamar = async (id_kamar) => {
    if (confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
      try {
        await deleteKamar(id_kamar);
        // Reload list
        const data = await getKamar();
        setKamarList(data || []);
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus data kamar.");
      }
    }
  };

  const handleAddKamar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addKamar({
        nama_kamar: nomorKamar,
        tipe_kamar: luasKamar,
        harga: parseInt(hargaSewa, 10),
        ketersediaan: status,
        deskripsi: deskripsi,
      });
      // Reset form
      setNomorKamar("");
      setLuasKamar("AC");
      setHargaSewa("");
      setStatus("tersedia");
      setDeskripsi("");
      setShowAddModal(false);
      // Reload list
      const data = await getKamar();
      setKamarList(data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan data kamar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function loadKamar() {
      try {
        setLoading(true);
        const data = await getKamar();
        setKamarList(data || []);
      } catch (err) {
        console.error("Gagal mengambil data kamar:", err);
        setError("Gagal memuat data kamar.");
      } finally {
        setLoading(false);
      }
    }
    loadKamar();
  }, []);

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Data Kamar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tambah, edit, hapus, dan update status kamar
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
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm text-sm border-none cursor-pointer"
          >
            + Tambah Kamar
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="w-full min-w-[800px]">
            <div className="flex bg-slate-50 p-4 text-sm font-bold text-slate-500 border-b border-slate-100">
              <div className="w-16 px-4">No</div>
              <div className="flex-1 px-4">Nomor Kamar</div>
              <div className="flex-1 px-4">Tipe Kamar</div>
              <div className="flex-1 px-4">Harga Sewa</div>
              <div className="flex-1 px-4">Status</div>
              <div className="flex-1 px-4">Aksi</div>
            </div>

            <div className="flex flex-col">
              {loading ? (
                <div className="p-6 text-center text-slate-500">Memuat data kamar...</div>
              ) : kamarList.length === 0 ? (
                <div className="p-6 text-center text-slate-500">Belum ada data kamar.</div>
              ) : (
                kamarList.map((room, index) => (
                  <div
                    key={room.id_kamar || index}
                    className="flex items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors text-sm"
                  >
                    <div className="w-16 px-4 text-slate-600">{index + 1}</div>
                    <div className="flex-1 px-4 text-slate-700 font-medium">
                      Kamar {room.nama_kamar}
                    </div>
                    <div className="flex-1 px-4 text-slate-600">{room.tipe_kamar || "-"}</div>
                    <div className="flex-1 px-4 text-slate-600">
                      {room.harga
                        ? new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(room.harga)
                        : "-"}
                    </div>
                    <div className="flex-1 px-4 font-bold flex items-center cursor-pointer">
                      <span
                        className={
                          room.ketersediaan === "tersedia"
                            ? "text-green-500 mr-2"
                            : "text-red-500 mr-2"
                        }
                      >
                        {room.ketersediaan === "tersedia" ? "Tersedia" : "Terisi"}
                      </span>
                      <span className="text-[10px] text-slate-800">&#9660;</span>
                    </div>
                    <div className="flex-1 px-4 text-slate-600 text-sm">
                      <button 
                        onClick={() => handleOpenEditModal(room)}
                        className="hover:text-blue-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600"
                      >
                        Edit
                      </button>
                      <span className="mx-2">-</span>
                      <button 
                        onClick={() => handleDeleteKamar(room.id_kamar)}
                        className="hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0 text-slate-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <p className="text-blue-600 font-bold text-sm mb-2">
            Update status kamar dilakukan melalui dropdown pada kolom Status.
          </p>
          <p className="text-blue-600 font-bold text-sm">
            Setelah disimpan, data kamar otomatis diperbarui pada website publik.
          </p>
        </div>
      </div>

      {/* Modal Tambah Kamar */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl flex flex-col border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Tambah Data Kamar Baru</h2>
            <p className="text-slate-500 mb-6 text-sm">Masukkan detail informasi kamar kos di bawah ini.</p>

            <form onSubmit={handleAddKamar} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="nomor_kamar">
                    Nomor Kamar
                  </label>
                  <input
                    id="nomor_kamar"
                    type="text"
                    required
                    placeholder="Contoh: 1A, 2"
                    value={nomorKamar}
                    onChange={(e) => setNomorKamar(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="luas_kamar">
                    Tipe Kamar
                  </label>
                  <select
                    id="luas_kamar"
                    value={luasKamar}
                    onChange={(e) => setLuasKamar(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-sm bg-white cursor-pointer"
                  >
                    <option value="AC">AC</option>
                    <option value="NON AC">Non-AC</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="harga_sewa">
                    Harga Sewa (Rp)
                  </label>
                  <input
                    id="harga_sewa"
                    type="number"
                    required
                    placeholder="Contoh: 900000"
                    value={hargaSewa}
                    onChange={(e) => setHargaSewa(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-sm bg-white cursor-pointer"
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="terisi">Terisi</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-500" htmlFor="deskripsi">
                  Deskripsi Kamar
                </label>
                <textarea
                  id="deskripsi"
                  rows={3}
                  placeholder="Masukkan fasilitas kamar (e.g. Lemari, Kasur, AC)"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm resize-none"
                />
              </div>

              <div className="flex w-full gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 text-blue-600 font-bold bg-transparent hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-2.5 text-white font-bold rounded-xl transition-colors cursor-pointer text-sm ${
                    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Kamar */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl flex flex-col border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Edit Data Kamar</h2>
            <p className="text-slate-500 mb-6 text-sm">Ubah detail informasi kamar kos di bawah ini.</p>

            <form onSubmit={handleUpdateKamar} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="edit_nomor_kamar">
                    Nomor Kamar
                  </label>
                  <input
                    id="edit_nomor_kamar"
                    type="text"
                    required
                    placeholder="Contoh: 1A, 2"
                    value={editNomorKamar}
                    onChange={(e) => setEditNomorKamar(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="edit_luas_kamar">
                    Tipe Kamar
                  </label>
                  <select
                    id="edit_luas_kamar"
                    value={editLuasKamar}
                    onChange={(e) => setEditLuasKamar(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-sm bg-white cursor-pointer"
                  >
                    <option value="AC">AC</option>
                    <option value="NON AC">Non-AC</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="edit_harga_sewa">
                    Harga Sewa (Rp)
                  </label>
                  <input
                    id="edit_harga_sewa"
                    type="number"
                    required
                    placeholder="Contoh: 900000"
                    value={editHargaSewa}
                    onChange={(e) => setEditHargaSewa(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-500" htmlFor="edit_status">
                    Status
                  </label>
                  <select
                    id="edit_status"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-sm bg-white cursor-pointer"
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="terisi">Terisi</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-500" htmlFor="edit_deskripsi">
                  Deskripsi Kamar
                </label>
                <textarea
                  id="edit_deskripsi"
                  rows={3}
                  placeholder="Masukkan fasilitas kamar (e.g. Lemari, Kasur, AC)"
                  value={editDeskripsi}
                  onChange={(e) => setEditDeskripsi(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 text-sm resize-none"
                />
              </div>

              <div className="flex w-full gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 text-blue-600 font-bold bg-transparent hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-2.5 text-white font-bold rounded-xl transition-colors cursor-pointer text-sm ${
                    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
