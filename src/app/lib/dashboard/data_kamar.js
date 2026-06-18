"use server"

import pool from "../../neon";

export async function getKamar() {
    try {
        const { rows } = await pool.query("SELECT * FROM kamar ORDER BY nama_kamar ASC");
        return rows;
    } catch (error) {
        console.error("Error fetching data kamars:", error);
        throw error;
    }
}

export async function getLatestKamar() {
    try {
        const { rows } = await pool.query("SELECT * FROM kamar ORDER BY nama_kamar DESC LIMIT 4");
        return rows;
    } catch (error) {
        console.error("Error fetching latest kamars:", error);
        throw error;
    }
}

export async function getKamarById(id_kamar) {
    try {
        const { rows } = await pool.query("SELECT * FROM kamar WHERE id_kamar = $1", [id_kamar]);
        return rows[0];
    } catch (error) {
        console.error(`Error fetching kamar with ID ${id_kamar}:`, error);
        throw error;
    }
}

export async function addKamar(kamarData) {
    const { nama_kamar, tipe_kamar, harga, ketersediaan, deskripsi } = kamarData;

    try {
        const { rows } = await pool.query(
            `INSERT INTO kamar (nama_kamar, tipe_kamar, harga, ketersediaan, deskripsi) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nama_kamar, tipe_kamar, harga, ketersediaan, deskripsi]
        );
        return rows[0];
    } catch (error) {
        console.error("Error adding kamar:", error);
        throw error;
    }
}

export async function updateKamar(id_kamar, kamarData) {
    const { nama_kamar, tipe_kamar, harga, ketersediaan, deskripsi } = kamarData;

    try {
        const { rows } = await pool.query(
            `UPDATE kamar 
             SET nama_kamar = $1, tipe_kamar = $2, harga = $3, ketersediaan = $4, deskripsi = $5 
             WHERE id_kamar = $6 RETURNING *`,
            [nama_kamar, tipe_kamar, harga, ketersediaan, deskripsi, id_kamar]
        );
        return rows[0];
    } catch (error) {
        console.error(`Error updating kamar with ID ${id_kamar}:`, error);
        throw error;
    }
}

export async function deleteKamar(id_kamar) {
    try {
        const { rows } = await pool.query("DELETE FROM kamar WHERE id_kamar = $1 RETURNING *", [id_kamar]);
        return rows[0];
    } catch (error) {
        console.error(`Error deleting kamar with ID ${id_kamar}:`, error);
        throw error;
    }
}