////////////////////////////////
const db = require('../config/db');


const getSuppliers = async () => {
    const [rows] = await db.query('SELECT * FROM suppliers');
    return rows;
};


const addSupplier = async (firstName, lastName, email, password) => {
    const sql = `INSERT INTO suppliers(first_name, last_name, email, password, created_at) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP)`;

    const [result] = await db.query(sql, [firstName, lastName, email, password])

    return result.insertId ? result.insertId : null;
}

const getUserByEmail = async (email) => {
    const sql = 'SELECT * FROM suppliers WHERE email = ?';
    const [rows] = await db.query(sql, [email]);
    console.log("user by email:", rows[0])
    return rows.length > 0 ? rows[0] : null;

}

const updateSupplier = async (firstName, lastName, email, supplierId) => {
    const sql = `UPDATE suppliers SET first_name = ?, last_name = ?, email = ? WHERE id = ?`;
    const [result] = await db.query(sql, [firstName, lastName, email, supplierId]);
    return result.affectedRows > 0;
}

const getSupplierById = async (id) => {
    const sql = `SELECT * FROM suppliers WHERE id = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows[0] ? rows[0] : null;
}

const deleteSupplier = async (id) =>{
    const sql = `DELETE FROM suppliers WHERE id = ?`
    const [rows] = await db.query(sql, [id])
    console.log(rows[0])
    return rows[0] ? rows[0] : null;
}

const updateSupplierPassword = async (id, hashedPassword) => {
    const sql = `UPDATE suppliers SET password = ? WHERE id = ?`;
    const [result] = await db.query(sql, [hashedPassword, id])
    return result[0] ? result[0] : null;
}

module.exports = {
    getSuppliers,
    getUserByEmail,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    updateSupplierPassword
};

