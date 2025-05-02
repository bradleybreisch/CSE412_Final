import React, { useState, useEffect } from "react";
import ListingDisplay from "./ListingDisplay";
import SearchBar from "./SearchBar";

const Listings = () => {
    const [results, setResults] = useState([])
    const[isAdmin, setIsAdmin] = useState(false);
    const [newCost, setNewCost] = useState("");
    const [newAvailability, setNewAvailability] = useState("");
    const [isbnEdit, setIsbnEdit] = useState("");
    const [retailerIdEdit, setRetailerIdEdit] = useState("");
    const [editError, setEditError] = useState("Make an Edit");

    const getAllListings = async () => {
        try
        {
            const response = await fetch("http://localhost:8080/getAllListings", {
                method: "Get",
            });
            const result = await response.json();

            if(response.ok && result.result && result.result.rows.length > 0)
                {
                    console.log("Search Results Found, Results:", result.result.rows);
                    setResults(result.result.rows);
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

    const checkAdmin = () => {
        if(sessionStorage.getItem("uid") === "0")
        {
            console.log("user is admin");
            setIsAdmin(true);
        }
        else
        {
            console.log("user is not admin");
        }
    };

    //to show all listings initially
    //commented out because there are A LOT of listings and slows down the client
    //useEffect(() => {
    //    getAllListings();
    //})


    //check if user is admin, to display edit options
    useEffect(() => {
        checkAdmin();
    })
    

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
            //Check if books was found
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

    const onEdit = async (isbn, retailerId, newCost, newAvailability) => {
        try
        {
            const body = {
                isbn,
                retailerId,
                newCost,
                newAvailability
            };
            console.log(body);
            const response = await fetch("http://localhost:8080/updateListing", {
                method: "Post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
    
            //retreive response
            const editResult = await response.json();
            //check if book was edited
            console.log(editResult)

            setEditError(editResult.message);

        }
        catch (error)
        {
            console.log("error found");
            console.error(error.message);
        }
    };
    
    if(!isAdmin)
    {
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

    return (
        <>
            <h1>Listings For Admin: </h1>
            <h2>Make an Edit:</h2>
            <form onSubmit={(e) => {e.preventDefault(); onEdit(isbnEdit, retailerIdEdit, newCost, newAvailability);}}>
                <label>
                    Isbn to Edit:
                    <input type="text" values={isbnEdit} onChange={e => setIsbnEdit(e.target.value)}></input>
                </label>
                <label>
                    Retailer Id to Edit:
                    <input type="text" values={retailerIdEdit} onChange={e => setRetailerIdEdit(e.target.value)}></input>
                </label>
                <label>
                    New Cost:
                    <input type="text" values={newCost} onChange={e => setNewCost(e.target.value)}></input>
                </label>
                <label>
                    New Availability:
                    <input type="text" value={newAvailability} onChange={e => setNewAvailability(e.target.value)}></input>
                </label>
                <button>Edit</button>
                <label>{editError}</label>
            </form>
            <h2>Search Listings:</h2>
            <SearchBar onSearch={performSearch}></SearchBar>
            {results.map((book) => (
                <div>
                    <ListingDisplay key={book.isbn} isbn={book.isbn} title={book.title} author={book.author} publication_year={book.publication_year} img_link={book.img_link} cost={book.cost} available={book.available} retailer_name={book.name} retailer_link={book.link}></ListingDisplay>
                </div>
            ))}
        </>
    )
}

export default Listings;