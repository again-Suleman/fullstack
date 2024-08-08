const db = require('../config/db');

const storeService = {
    async addStore(spId, stName, description, logoPath) {
        const sql = `INSERT INTO stores (sp_id, st_name, description, logo) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(sql, [spId, stName, description, logoPath]);
        console.log( result);
        return result[0] ? result[0] : null;
    },

    async getStoresByOwner(spId) {
        const sql = `SELECT * FROM stores WHERE sp_id = ?`;
        const [rows] = await db.query(sql, [spId]);
        console.log(rows)
        return rows;
    },

    // For Deleting the Store
    async getStoreByNameAndSupplier(spId, stName) {
        const sql = `SELECT * FROM stores WHERE sp_id = ? AND st_name = ?`;
        const [rows] = await db.query(sql, [spId, stName]);
        return rows[0];
    },

    async deleteStore(spId, stName) {
        const sql = `DELETE FROM stores WHERE sp_id = ? AND st_name = ?`;
        const [result] = await db.query(sql, [spId, stName]);
        return result.affectedRows > 0;
    },

    // For updating Store
    async updateStore(spId, stName, newStName, description) {
        let sql = `UPDATE stores SET `;
        const params = [];

        if (newStName) {
            sql += `st_name = ?, `;
            params.push(newStName);
        }
        
        if (description) {
            sql += `description = ?, `;
            params.push(description);
        }
        
        sql = sql.slice(0, -2); 
        sql += ` WHERE sp_id = ? AND st_name = ?`;
        params.push(spId, stName);
        
        console.log(params)
        const [result] = await db.query(sql, params);
        return result[0] ? result[0] : null;
    },
};

module.exports = storeService;
