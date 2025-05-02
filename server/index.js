const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//const pool = require("./db")

//middleware
//cors for interaction with frontend
//express.json() to parse and understand requests
app.use(cors())
app.use(express.json())

//APIs

//Querys on users

// SELECT user names from users, this is a template api
//login
app.post("/login", async(req, res) =>{
    const {username, password} = req.body;
    try
    {
        const result = await pool.query("SELECT uid FROM users WHERE username = $1 AND password = $2;", [username, password]);

        if(result.rows.length > 0) 
        {
            const uid = result.rows[0].uid;
            res.status(200).json({uid});
        }
        else
        {
            res.status(400).json({message: "No user with given username and password"});
        }
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({message: "Server Error 500"});
    }
});


app.get("/getUserNames", async(req, res) =>{
    try {
        //const nameList = await pool.query("SELECT * FROM users;")

        res.json({ error: "DB not alive yet" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.get("/", (req, res) => {
    res.send("Hello from WSL!");
  });

//Querys on book

//Querys on retailer

//Querys on favorite

//Querys on purchase

app.post("/getPurchased", async(req, res) =>{
    const {uid} = req.body;
    try {
        const result = await pool.query("SELECT book.* FROM purchase NATURAL JOIN book WHERE uid = $1;", [uid]);

        if(result.rows.length > 0) 
        {
            res.status(200).json({result});
        }
        else
        {
            res.status(400).json({message: "User Has no Purchased Books"});
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//Querys on listing

app.listen(8080, '0.0.0.0', () => {
    console.log("Express server has started, port = 8080")
})