"use server";

import pool from "../../neon";

/**
 * Mendaftarkan akun baru ke Neon database ke dalam table 'user'.
 * 
 * @param {Object} data - Data pendaftaran
 * @param {string} data.nama - Nama lengkap user
 * @param {string} data.email - Email user
 * @param {string} data.no_wa - Nomor WhatsApp user
 * @param {string} data.password - Password user
 * @returns {Promise<{success: boolean, message?: string, error?: string, user?: Object}>}
 */
export async function registerUser({ nama, email, no_wa, password }) {
  // 1. Validasi input
  if (!nama || !email || !no_wa || !password) {
    return { success: false, error: "Semua field (Nama, Email, WhatsApp, Password) wajib diisi." };
  }

  try {
    // 2. Cek apakah email sudah terdaftar sebelumnya
    // Gunakan query berparameter untuk mencegah SQL Injection
    const checkUser = await pool.query('SELECT user_id FROM "user" WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      return { success: false, error: "Email sudah terdaftar." };
    }

    // 3. Masukkan data akun baru ke table 'user'
    const insertQuery = `
      INSERT INTO "user" (nama, email, no_wa, password, is_admin)
      VALUES ($1, $2, $3, $4, false)
      RETURNING user_id, nama, email, is_admin
    `;
    const result = await pool.query(insertQuery, [nama, email, no_wa, password]);

    return {
      success: true,
      message: "Registrasi berhasil!",
      user: result.rows[0],
    };
  } catch (error) {
    console.error("Error inside registerUser server action:", error);
    return {
      success: false,
      error: "Terjadi kesalahan internal server saat melakukan registrasi.",
    };
  }
}
