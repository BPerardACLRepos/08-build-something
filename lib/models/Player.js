const pool = require('../utils/pool');

module.exports = class Player {
    id;
    name;
    team;
    position;
    region;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.team = row.team;
        this.position = row.position;
        this.region = row.region;
    }

    static async insert({
        name,
        team,
        position,
        region
    }) {

        const { rows } = await pool.query(
            `INSERT INTO players (name, team, position, region) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, team, position, region]
        );

        return new Player(rows[0]);
    }

    static async selectAll() {
        const { rows } = await pool.query(
            `SELECT * FROM players`
        );

        return rows.map(row => new Player(row));
    }

    static async selectID(id) {
        const { rows } = await pool.query(
            `SELECT * FROM players WHERE id=$1`,
            [id]
        );

        return new Player(rows[0]);
    }

    static async updateId(id, update) {
        const { rows } = await pool.query(
            `UPDATE players SET name=$1, team=$2, position=$3, region=$4 WHERE id=$5 RETURNING *`,
            [update.name, update.team, update.position, update.region, id]
        );

        return new Player(rows[0]);
    }

    static async deleteId(id) {
        const { rows } = await pool.query(
            `DELETE FROM players WHERE id=$1 RETURNING *`,
            [id]
        );

        return new Player(rows[0]);
    }
}