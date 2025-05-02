import React, { useState, useEffect } from "react";
import BookDisplay from "./BookDisplay";
import SearchBar from "./SearchBar";

const BookSearch = () => {
    const [uid, setUid] = useState(sessionStorage.getItem("uid"));
    const [results, setResults] = useState([]);
    let buttonLabel = "Login to Favorite!";

    const performSearch = async (query) => {
        try 
        {
            //build request body
            const body = {query}
            //send post request
            const response = await fetch("http://localhost:8080/getSearched", {
                method: "Post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            //retreive response
            const searchResult = await response.json();
            //Check if uid was found
            if(response.ok && searchResult.result && searchResult.result.rows.length > 0)
            {
                console.log("Search Results Found, Results:", searchResult.result.rows);
                setResults(searchResult.result.rows);
            }
            else
            {
                console.error("No results found");
                setResults([]);
            }
        }
        catch (error)
        {
            console.log("error found");
            console.error(error.message);
        }
    
    };

    const addFavoriteBook = async (isbn) => {
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
            const response = await fetch("http://localhost:8080/favoriteBook", {
                method: "Post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            //retreive response
            const result = await response.json();
        }
        catch (error)
        {
            console.log("error found");
            console.error(error.message);
        }

    } 

    if(uid)
    {
        buttonLabel = "Favorite";
    }
    
    
    return(
        <>
            <h1>BookSearch</h1>
            <SearchBar onSearch={performSearch}></SearchBar>
            {results.map((book) => (

                <div className="bookDisplayWithFavorite">
                    <BookDisplay key={book.isbn} isbn={book.isbn} title={book.title} author={book.author} publication_year={book.publication_year} img_link={book.img_link}></BookDisplay>
                    <button onClick={() =>addFavoriteBook(book.isbn)}>{buttonLabel}</button>
                </div>
            ))}
        </>
    )
}

export default BookSearch;