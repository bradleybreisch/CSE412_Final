import React, { useState } from "react";
import ListingDisplay from "./ListingDisplay";
import SearchBar from "./SearchBar";

const Listings = () => {
    const [results, setResults] = useState([])

    const performSearch = async (query) => {
        try 
        {
            //build request body
            const body = {query}
            //send post request
            const response = await fetch("http://localhost:8080/getSearchedListings", {
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
    
    return(
        <>
            <h1>Listings: </h1>
            <SearchBar onSearch={performSearch}></SearchBar>
            {results.map((book) => (
                <ListingDisplay key={book.isbn} isbn={book.isbn} title={book.title} author={book.author} publication_year={book.publication_year} img_link={book.img_link} cost={book.cost} available={book.available} retailer_name={book.name} retailer_link={book.link}></ListingDisplay>
            ))}
        </>
    )
}

export default Listings;