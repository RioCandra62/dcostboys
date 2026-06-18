"use server";

import pool from "../../neon";

/**
 * Menyimpan data reservasi baru ke database PostgreSQL.
 * 
 * @param {Object} reservasiData
 * @param {string} reservasiData.id_kamar - UUID Kamar
 * @param {string} reservasiData.tanggal - Tanggal Reservasi (YYYY-MM-DD)
 * @param {string} reservasiData.id_pemesan - UUID User Pemesan
 * @param {string} [reservasiData.status_reservasi] - Status Reservasi (default: 'Pending')
 * @returns {Promise<{success: boolean, error?: string, reservasi?: Object}>}
 */
export async function addReservasi(reservasiData) {
  const { id_kamar, tanggal, id_pemesan, status_reservasi = "Pending" } = reservasiData;

  if (!id_kamar || !tanggal || !id_pemesan) {
    return { success: false, error: "Semua data wajib diisi." };
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO reservasi (id_kamar, tanggal, id_pemesan, status_reservasi) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_kamar, tanggal, id_pemesan, status_reservasi]
    );

    return {
      success: true,
      reservasi: rows[0],
    };
  } catch (error) {
    console.error("Error inside addReservasi server action:", error);
    return {
      success: false,
      error: error.message || "Gagal menyimpan data reservasi ke database.",
    };
  }
}

/**
 * Mengambil semua data reservasi beserta nama pemesan dan nomor kamar dari database.
 * 
 * @returns {Promise<Array>}
 */
export async function getReservasi() {
  try {
    const { rows } = await pool.query(
      `SELECT 
         r.id_reservasi,
         r.tanggal,
         r.status_reservasi,
         u.nama AS nama_pemesan,
         k.nama_kamar
       FROM reservasi r
       JOIN "user" u ON r.id_pemesan = u.user_id
       JOIN kamar k ON r.id_kamar = k.id_kamar
       WHERE r.status_reservasi != 'disetujui'
       ORDER BY r.tanggal DESC`
    );
    return rows;
  } catch (error) {
    console.error("Error inside getReservasi server action:", error);
    throw error;
  }
}

/**
 * Memperbarui status reservasi di database (misal disetujui atau ditolak),
 * dan memperbarui status ketersediaan kamar yang bersangkutan secara transaksional.
 * 
 * @param {string} id_reservasi - UUID Reservasi
 * @param {string} status - Status Baru ('disetujui' atau 'ditolak')
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateReservasiStatus(id_reservasi, status) {
  const client = await pool.connect();
  const normalizedStatus = status ? status.toLowerCase() : "";
  try {
    await client.query("BEGIN");

    // Update status reservasi
    const resUpdate = await client.query(
      `UPDATE reservasi 
       SET status_reservasi = $1 
       WHERE id_reservasi = $2 
       RETURNING id_kamar`,
      [normalizedStatus, id_reservasi]
    );

    if (resUpdate.rows.length === 0) {
      throw new Error("Reservasi tidak ditemukan.");
    }

    const { id_kamar } = resUpdate.rows[0];

    // Jika status disetujui, update ketersediaan kamar menjadi 'terisi'
    if (normalizedStatus === "disetujui") {
      await client.query(
        `UPDATE kamar 
         SET ketersediaan = 'terisi' 
         WHERE id_kamar = $1`,
        [id_kamar]
      );
    } else if (normalizedStatus === "ditolak") {
      // Jika ditolak, kembalikan ketersediaan kamar menjadi 'tersedia'
      await client.query(
        `UPDATE kamar 
         SET ketersediaan = 'tersedia' 
         WHERE id_kamar = $1`,
        [id_kamar]
      );
    }

    await client.query("COMMIT");
    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inside updateReservasiStatus server action:", error);
    return { success: false, error: error.message };
  } finally {
    client.release();
  }
}

/**
 * Mengambil data semua user yang reservasi kamarnya telah disetujui (sebagai Penghuni).
 * 
 * @returns {Promise<Array>}
 */
export async function getPenghuni() {
  try {
    const { rows } = await pool.query(
      `SELECT 
         r.id_reservasi,
         r.tanggal,
         r.status_reservasi,
         u.nama AS nama_penghuni,
         u.no_wa AS no_hp,
         k.nama_kamar
       FROM reservasi r
       JOIN "user" u ON r.id_pemesan = u.user_id
       JOIN kamar k ON r.id_kamar = k.id_kamar
       WHERE r.status_reservasi = 'disetujui'
       ORDER BY r.tanggal DESC`
    );
    return rows;
  } catch (error) {
    console.error("Error inside getPenghuni server action:", error);
    throw error;
  }
}
