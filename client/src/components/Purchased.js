import React, {useState, useEffect} from "react";
import BookDisplay from "./BookDisplay";

const Purchased = () => {
    const [uid, setUid] = useState(sessionStorage.getItem("uid"));
    const [purchasedBooks, setPurchasedBooks] = useState(null);
    
    useEffect(() => {
        const getPurchased = async () => {
            try 
            {
                //build request body
                const body = { uid: sessionStorage.getItem("uid") }
                //send post request
                const response = await fetch("http://localhost:8080/getPurchased", {
                    method: "Post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                //retreive response
                const purchasedResult = await response.json();

                //Check if purchased results were found
                if(response.ok && purchasedResult.result && purchasedResult.result.rows.length > 0)
                {
                    console.log("Purchased Found, Puchased:", purchasedResult.result.rows);
                    setPurchasedBooks(purchasedResult.result.rows);
                }
                else
                {
                    console.log("User has no puchases");
                    setPurchasedBooks(null)
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
            getPurchased();
        }
    }, [uid]);

    if(!uid)
    {
        return (
            <h1>Please Login</h1>
        )
    }
    
    if(!purchasedBooks)
    {
        return (
            <h1>No Purchased Books! Checkout the Listings page!</h1>
        )
    }

    return (
        <div>
            {purchasedBooks.map((book) => (
                <BookDisplay key={book.isbn} isbn={book.isbn} title={book.title} author={book.author} publication_year={book.publication_year} img_link={book.img_link}></BookDisplay>
            ))}
        </div>
    )
}

export default Purchased;