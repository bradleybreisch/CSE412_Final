import React from "react";
import BookDisplay from "./BookDisplay";

const BookSearch = () => {
    return(
        <>
            <h1>BookSearch</h1>
            <BookDisplay isbn={1010101} title="The Great Gatsby" publication_year={2023} author="Nediax" img_link="https://imagessl4.casadellibro.com/a/l/t5/74/9788416517374.jpg" ></BookDisplay>
        </>
    )
}

export default BookSearch;