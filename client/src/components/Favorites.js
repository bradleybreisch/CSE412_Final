import React, {useState, useEffect} from "react";
import BookDisplay from "./BookDisplay";

const Favorites = () => {
    const [uid, setUid] = useState(sessionStorage.getItem("uid"));
    const [favoriteBooks, setFavoriteBooks] = useState(null);
    
    useEffect(() => {
        const getFavorited = async () => {
            try 
            {
                //build request body
                const body = { uid: sessionStorage.getItem("uid") }
                //send post request
                const response = await fetch("http://localhost:8080/getFavorited", {
                    method: "Post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                //retreive response
                const favoritedResult = await response.json();

                //Check if purchased results were found
                if(response.ok && favoritedResult.result && favoritedResult.result.rows.length > 0)
                {
                    console.log("Favorites Found, Favorites:", favoritedResult.result.rows);
                    setFavoriteBooks(favoritedResult.result.rows);
                }
                else
                {
                    console.log("User has no Favorites");
                    setFavoriteBooks(null);
                }
            }
            catch (error)
            {
                console.log("error found");
                console.error(error.message);
            }
        }

        if(uid)
        {
            getFavorited();
        }
    }, [uid]);

    if(!uid)
    {
        return (
            <h1>Please Login</h1>
        )
    }
    
    if(!favoriteBooks)
    {
        return (
            <h1>No Favorited Books! Checkout the Book Search page!</h1>
        )
    }

    return (
        <div>
            <h1>Your Favorites:</h1>
            {favoriteBooks.map((book) => (
                <BookDisplay key={book.isbn} isbn={book.isbn} title={book.title} author={book.author} publication_year={book.publication_year} img_link={book.img_link}></BookDisplay>
            ))}
        </div>
    )
}

export default Favorites;