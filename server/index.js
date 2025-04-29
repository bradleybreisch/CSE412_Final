const express = require("express");
const app = express();
const cors = require("cors");
//const pool = require("./db")

//middleware
//cors for interaction with frontend
//express.json() to parse and understand requests
app.use(cors())
app.use(express.json())

//APIs

//Querys on users

// SELECT user names from users, this is a template api
app.get("/getUserNames", async(req, res) =>{
    try {
        //const nameList = await pool.query("SELECT * FROM users;")

        res.json({ error: "DB not alive yet" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

app.get("/", (req, res) => {
    res.send("Hello from WSL!");
  });

//Querys on book

//Querys on retailer

//Querys on favorite

//Querys on purchase

//Querys on listing

app.listen(8080, '0.0.0.0', () => {
    console.log("Express server has started, port = 8080")
})