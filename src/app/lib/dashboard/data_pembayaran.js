"use server";

import pool from "../../neon";

/**
 * Mengambil semua data pembayaran dari database.
 * Melakukan LEFT JOIN antara reservasi yang disetujui, user, kamar, dan pembayaran.
 * Jika tenant belum melakukan pembayaran (tidak ada record di pembayaran), status = 'Belum Lunas'.
 * Jika sudah, status = 'Lunas'.
 */
export async function getPembayaran() {
  try {
    const { rows } = await pool.query(
      `SELECT 
         r.id_reservasi,
         u.user_id,
         u.nama AS nama_penghuni,
         k.id_kamar,
         k.nama_kamar,
         k.harga,
         p.id_pembayaran,
         p.priode_pembayaran
       FROM reservasi r
       JOIN "user" u ON r.id_pemesan = u.user_id
       JOIN kamar k ON r.id_kamar = k.id_kamar
       LEFT JOIN pembayaran p ON u.user_id = p.id_user AND k.id_kamar = p.id_kamar
       WHERE r.status_reservasi = 'disetujui'
       ORDER BY r.tanggal DESC`
    );
    return rows;
  } catch (error) {
    console.error("Error inside getPembayaran server action:", error);
    throw error;
  }
}

/**
 * Menyimpan data pembayaran baru ke database.
 * 
 * @param {Object} pembayaranData
 * @param {string} pembayaranData.id_user - UUID User
 * @param {string} pembayaranData.id_kamar - UUID Kamar
 * @param {string} pembayaranData.priode_pembayaran - Periode Pembayaran ('bulanan' atau 'tahunan')
 * @returns {Promise<{success: boolean, error?: string, pembayaran?: Object}>}
 */
export async function addPembayaran(pembayaranData) {
  const { id_user, id_kamar, priode_pembayaran } = pembayaranData;

  if (!id_user || !id_kamar || !priode_pembayaran) {
    return { success: false, error: "Semua data wajib diisi (User, Kamar, dan Periode)." };
  }

  // Normalize period to lowercase
  const normalizedPeriod = priode_pembayaran.toLowerCase();
  if (normalizedPeriod !== "bulanan" && normalizedPeriod !== "tahunan") {
    return { success: false, error: "Periode pembayaran harus 'bulanan' atau 'tahunan'." };
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO pembayaran (id_user, id_kamar, priode_pembayaran) 
       VALUES ($1, $2, $3) RETURNING *`,
      [id_user, id_kamar, normalizedPeriod]
    );

    return {
      success: true,
      pembayaran: rows[0],
    };
  } catch (error) {
    console.error("Error inside addPembayaran server action:", error);
    return {
      success: false,
      error: error.message || "Gagal menyimpan data pembayaran ke database.",
    };
  }
}
