const Pool = require("pg").Pool;

const pool = new Pool({
    user: "brad",
    password: "brad",
    host: "127.0.0.1",
    port: "8888",
    database: "book"
})

module.exports = pool;