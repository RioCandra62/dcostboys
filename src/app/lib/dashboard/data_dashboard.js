"use server";

import pool from "../../neon";

/**
 * Mengambil statistik dashboard admin dan daftar notifikasi aksi.
 * 
 * @returns {Promise<Object>}
 */
export async function getDashboardData() {
  try {
    // 1. Total Kamar
    const totalKamarRes = await pool.query("SELECT COUNT(*)::integer AS count FROM kamar");
    const totalKamar = totalKamarRes.rows[0]?.count || 0;

    // 2. Kamar Tersedia
    const kamarTersediaRes = await pool.query("SELECT COUNT(*)::integer AS count FROM kamar WHERE ketersediaan = 'tersedia'");
    const kamarTersedia = kamarTersediaRes.rows[0]?.count || 0;

    // 3. Reservasi Pending
    const reservasiPendingRes = await pool.query("SELECT COUNT(*)::integer AS count FROM reservasi WHERE status_reservasi = 'pending'");
    const reservasiPending = reservasiPendingRes.rows[0]?.count || 0;

    // 4. Belum Lunas (Penghuni aktif yang tidak memiliki data di tabel pembayaran)
    const belumLunasRes = await pool.query(
      `SELECT COUNT(*)::integer AS count 
       FROM reservasi r
       JOIN "user" u ON r.id_pemesan = u.user_id
       JOIN kamar k ON r.id_kamar = k.id_kamar
       LEFT JOIN pembayaran p ON u.user_id = p.id_user AND k.id_kamar = p.id_kamar
       WHERE r.status_reservasi = 'disetujui' AND p.id_pembayaran IS NULL`
    );
    const belumLunas = belumLunasRes.rows[0]?.count || 0;

    // 5. Reservasi Pending List (untuk notifikasi)
    const pendingListRes = await pool.query(
      `SELECT r.id_reservasi, u.nama AS nama_pemesan, r.tanggal
       FROM reservasi r
       JOIN "user" u ON r.id_pemesan = u.user_id
       WHERE r.status_reservasi = 'pending'
       ORDER BY r.tanggal DESC`
    );
    const pendingReservations = pendingListRes.rows.map(row => ({
      id: `reservasi-${row.id_reservasi}`,
      text: `Reservasi baru ${row.nama_pemesan}`,
      source: "Form Reservasi",
      status: "Pending",
      statusColor: "text-orange-500",
      tanggal: row.tanggal
    }));

    // 6. Unpaid Tenants List (untuk notifikasi)
    const unpaidListRes = await pool.query(
      `SELECT r.id_reservasi, u.nama AS nama_penghuni, r.tanggal
       FROM reservasi r
       JOIN "user" u ON r.id_pemesan = u.user_id
       JOIN kamar k ON r.id_kamar = k.id_kamar
       LEFT JOIN pembayaran p ON u.user_id = p.id_user AND k.id_kamar = p.id_kamar
       WHERE r.status_reservasi = 'disetujui' AND p.id_pembayaran IS NULL
       ORDER BY r.tanggal DESC`
    );
    const unpaidPayments = unpaidListRes.rows.map(row => ({
      id: `pembayaran-${row.id_reservasi}`,
      text: `Pembayaran ${row.nama_penghuni}`,
      source: "Jatuh Tempo",
      status: "Belum Lunas",
      statusColor: "text-red-500",
      tanggal: row.tanggal
    }));

    // Gabungkan notifikasi dan urutkan berdasarkan tanggal terbaru
    const notifications = [...pendingReservations, ...unpaidPayments].sort((a, b) => {
      const dateA = a.tanggal ? new Date(a.tanggal) : new Date(0);
      const dateB = b.tanggal ? new Date(b.tanggal) : new Date(0);
      return dateB - dateA;
    });

    return {
      stats: {
        totalKamar,
        kamarTersedia,
        reservasiPending,
        belumLunas
      },
      notifications
    };
  } catch (error) {
    console.error("Error inside getDashboardData server action:", error);
    throw error;
  }
}
