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

app.post("/getSearched", async(req, res) =>{
    const {query} = req.body;
    try {
        const result = await pool.query("SELECT * FROM book WHERE title LIKE $1;", [`%${query}%`]);

        if(result.rows.length > 0) 
        {
            res.status(200).json({result});
            console.log("books found")
        }
        else
        {
            console.log("no books found")
            res.status(400).json({message: "Search resulted in no books"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//Querys on retailer

//Querys on favorite

app.post("/searchFavorited", async(req, res) =>{
    const {uid, query} = req.body;
    try {
        console.log("starting search for favorited");
        const result = await pool.query("SELECT book.* FROM favorite NATURAL JOIN book WHERE uid = $1 AND title LIKE $2;", [uid, `%${query.toUpperCase()}%`]);
        console.log("end search for favorited");
        if(result.rows.length > 0) 
        {
            res.status(200).json({result});
            console.log("favorites found")
        }
        else
        {
            console.log("no favorites found")
            res.status(400).json({message: "User Has no Favorited Books"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.post("/getFavorited", async(req, res) =>{
    const {uid} = req.body;
    try {
        const result = await pool.query("SELECT book.* FROM favorite NATURAL JOIN book WHERE uid = $1;", [uid]);

        if(result.rows.length > 0) 
        {
            res.status(200).json({result});
            console.log("favorites found")
        }
        else
        {
            console.log("no favorites found")
            res.status(400).json({message: "User Has no Favorited Books"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Add a book to favorites
app.post("/favoriteBook", async (req, res) => {
    const { uid, isbn } = req.body;
    try {
        const result = await pool.query("INSERT INTO favorite (uid, isbn) VALUES ($1, $2) ON CONFLICT DO NOTHING", [uid, isbn]);
        res.status(200).json({ message: "Book favorited" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Remove a book from favorites
app.delete("/unfavoriteBook", async (req, res) => {
    const { uid, isbn } = req.body;
    try {
        const result = await pool.query("DELETE FROM favorite WHERE uid = $1 AND isbn = $2", [uid, isbn]);
        res.status(200).json({ message: "Book unfavorited" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

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

//returned listings based on a provided query
app.post("/getSearchedListings", async(req, res) =>{
    const {query} = req.body;
    try {
        const result = await pool.query("SELECT book.*, listing.cost, listing.available, retailer.name, retailer.link FROM book NATURAL JOIN listing NATURAL JOIN retailer WHERE title LIKE $1;", [`%${query}%`]);

        if(result.rows.length > 0) 
        {
            res.status(200).json({result});
            console.log("books found")
        }
        else
        {
            console.log("no books found")
            res.status(400).json({message: "Listing Search resulted in no books"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//return all listings
app.get("/getAllListings", async(req, res) =>{
    try {
        const result = await pool.query("SELECT book.*, listing.cost, listing.available, retailer.name, retailer.link FROM book NATURAL JOIN listing NATURAL JOIN retailer;");

        if(result.rows.length > 0) 
        {
            res.status(200).json({result});
            console.log("books found")
        }
        else
        {
            console.log("no books found")
            res.status(400).json({message: "Listing resulted in no books"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




app.listen(8080, '0.0.0.0', () => {
    console.log("Express server has started, port = 8080")
})