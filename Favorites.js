import React, {useState, useEffect} from "react";
import BookDisplay from "./BookDisplay";
import SearchBar from "./SearchBar"

const Favorites = () => {
    const [uid, setUid] = useState(sessionStorage.getItem("uid"));
    const [favoriteBooks, setFavoriteBooks] = useState(null);
    const [results, setResults] = useState([])

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

    const addFavorite = async (book) => {
        try {
            const body = {
                uid: uid,
                isbn: book.isbn
            };
            const response = await fetch("http://localhost:8080/favoriteBook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log("Book favorited:", result);
                // Optionally re-fetch favorites or update state
            } else {
                console.error("Failed to favorite book");
            }
        } catch (error) {
            console.error("Error favoriting book:", error);
        }
    };
    
    const removefavorite = async (book) => {
        try {
            const body = {
                uid: uid,
                isbn: book.isbn
            };
            const response = await fetch("http://localhost:8080/unfavoriteBook", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log("Book unfavorited:", result);
                // Refresh favorites list
                setFavoriteBooks(prev => prev.filter(b => b.isbn !== book.isbn));
            } else {
                console.error("Failed to unfavorite book");
            }
        } catch (error) {
            console.error("Error unfavoriting book:", error);
        }
    };

    return (
        <div>
            
            {/* Have user search for a favorite book to add */}
            <h1>Search and Add a Favorite Book!</h1>
            
            <SearchBar onSearch={performSearch} />

            {/* center button so people don't misclick (me I did lol) */}
            
            {results.map((book) => (
                <div
                    key={book.isbn}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "16px",
                        padding: "1rem",
                    }}
                >
                    {/*Display Searched books*/}
                    <BookDisplay
                        isbn={book.isbn}
                        title={book.title}
                        author={book.author}
                        publication_year={book.publication_year}
                        img_link={book.img_link}
                    />
                    <button onClick={() => addFavorite(book)}>Favorite</button>
                </div>
            ))}

            {/* Display a users current favoirte books */}
            <h2>Your Favorites:</h2>
            
            {favoriteBooks.map((book) => (
                <div
                    key={book.isbn}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "1rem",
                }}
            >
                {/*display favorites*/}
                <BookDisplay
                    isbn={book.isbn}
                    title={book.title}
                    author={book.author}
                    publication_year={book.publication_year}
                    img_link={book.img_link}
                />
                <button onClick={() => removefavorite(book)}>Unfavorite</button>
            </div>
            ))}
            </div>
    );
    
}

export default Favorites;