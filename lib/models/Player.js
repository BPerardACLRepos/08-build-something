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
}