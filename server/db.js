const { Pool } = require("pg");

const poop = require("pg").Pool;

const pool = new Pool({
    user: "TEMPuser",
    password: "TEMPpassword",
    host: "TEMPhost",
    port: "TEMPport"
})