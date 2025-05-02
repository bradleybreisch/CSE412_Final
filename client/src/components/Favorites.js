import React, {useState, useEffect} from "react";
import BookDisplay from "./BookDisplay";
import SearchBar from "./SearchBar";

const Favorites = () => {
    const [uid, setUid] = useState(sessionStorage.getItem("uid"));
    const [favoriteBooks, setFavoriteBooks] = useState(null);

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
    };
    
    useEffect(() => {
        if(uid)
        {
            getFavorited();
        }
    }, [uid]);

    const removeFavoriteBook = async (isbn) => {
        try
        {
            //check if uid is present before trying endpoint
            if(!uid) {
                console.log("user not logged in, cannot favorite");
                return;
            }
            
            //build request body
            const body = { uid, isbn}
            //send post request
            const response = await fetch("http://localhost:8080/unfavoriteBook", {
                method: "Delete",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            //retreive response
            const result = await response.json();
            getFavorited();
        }
        catch (error)
        {
            console.log("error found");
            console.error(error.message);
        }
    };

    const performSearch = async (query) => {
        try 
        {
            //build request body
            const body = {uid, query}
            //send post request
            const response = await fetch("http://localhost:8080/searchFavorited", {
                method: "Post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            //retreive response
            const searchResult = await response.json();
            console.log(searchResult);
            //Check if books was found
            if(response.ok && searchResult.result && searchResult.result.rows.length > 0)
            {
                console.log("Search Results Found, Results:", searchResult.result.rows);
                setFavoriteBooks(searchResult.result.rows);
            }
            else
            {
                console.error("No results found");
                setFavoriteBooks([]);
            }
        }
        catch (error)
        {
            console.log("error found");
            console.error(error.message);
        }
    
    };

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
            <SearchBar onSearch={performSearch}></SearchBar>
            {favoriteBooks.map((book) => (
                <div>
                    <BookDisplay key={book.isbn} isbn={book.isbn} title={book.title} author={book.author} publication_year={book.publication_year} img_link={book.img_link}></BookDisplay>
                    <button onClick={() =>removeFavoriteBook(book.isbn)}>Unfavorite</button>
                </div>
            ))}
        </div>
    )
}

export default Favorites;