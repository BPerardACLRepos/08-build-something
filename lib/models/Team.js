const pool = require('../utils/pool');

module.exports = class Team {
    id;
    name;
    region;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.region = row.region;
    }

    static async insert({
        name,
        region
    }) {

        const { rows } = await pool.query(
            `INSERT INTO teams (name, region) VALUES ($1, $2) RETURNING *`,
            [name, region]
        );

        return new Team(rows[0]);
    }

    static async selectAll() {
        const { rows } = await pool.query(
            `SELECT * FROM teams`
        );

        return rows.map(row => new Team(row));
    }

    static async selectID(id) {
        const { rows } = await pool.query(
            `SELECT * FROM teams WHERE id=$1`,
            [id]
        );

        return new Team(rows[0]);
    }

    static async updateId(id, update) {
        const { rows } = await pool.query(
            `UPDATE teams SET name=$1, region=$2 WHERE id=$3 RETURNING *`,
            [update.name, update.region, id]
        );

        return new Team(rows[0]);
    }

    static async deleteId(id) {
        const { rows } = await pool.query(
            `DELETE FROM teams WHERE id=$1 RETURNING *`,
            [id]
        );

        return new Team(rows[0]);
    }
}