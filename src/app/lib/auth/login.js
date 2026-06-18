"use server";

import pool from "../../neon";
import { cookies } from "next/headers";

/**
 * Memvalidasi kredensial login user atau admin dari database,
 * dan menyimpan session data dalam HTTP-only cookie.
 * 
 * @param {Object} credentials - Kredensial login
 * @param {string} credentials.email - Email/username user
 * @param {string} credentials.password - Password user
 * @returns {Promise<{success: boolean, error?: string, user?: Object}>}
 */
export async function loginUser({ email, password }) {
  if (!email || !password) {
    return { success: false, error: "Email dan password wajib diisi." };
  }

  try {
    // Cari user di database berdasarkan email
    const res = await pool.query(
      'SELECT user_id, nama, email, no_wa, password, is_admin FROM "user" WHERE email = $1',
      [email]
    );

    if (res.rows.length === 0) {
      return { success: false, error: "Email atau password salah." };
    }

    const user = res.rows[0];

    // Bandingkan password (karena didaftarkan secara plain text)
    if (user.password !== password) {
      return { success: false, error: "Email atau password salah." };
    }

    // Tentukan role berdasarkan boolean is_admin
    const is_admin = (user.is_admin === true || user.is_admin === "true");
    const role = is_admin ? "admin" : "user";

    // Buat data session
    const sessionData = {
      id: user.user_id,
      nama: user.nama,
      email: user.email,
      no_wa: user.no_wa,
      role: role,
      is_admin: is_admin,
    };

    // Encode session data ke Base64 string
    const sessionValue = Buffer.from(JSON.stringify(sessionData)).toString("base64");

    // Simpan session dalam HTTP-Only cookie secara aman selama 1 hari
    const cookieStore = await cookies();
    cookieStore.set("session", sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 jam (1 hari)
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
      user: sessionData,
    };
  } catch (error) {
    console.error("Error inside loginUser server action:", error);
    return {
      success: false,
      error: "Terjadi kesalahan internal server saat melakukan login.",
    };
  }
}

/**
 * Menghapus session data cookie untuk proses logout.
 * 
 * @returns {Promise<{success: boolean}>}
 */
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { success: true };
}

/**
 * Mendapatkan session data dari cookie yang terdaftar (jika ada).
 * 
 * @returns {Promise<Object|null>}
 */
export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedValue = decodeURIComponent(sessionCookie.value);
    const rawData = Buffer.from(decodedValue, "base64").toString("utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error parsing session cookie:", error);
    return null;
  }
}


