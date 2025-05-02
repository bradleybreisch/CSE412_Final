import React from "react";

const BookDisplay = ({ isbn, title, publication_year, author, img_link }) => {
    return (
        <>
        <ul style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", listStyle: "none" }}>

            {img_link && (
                <li>
                    <img src={img_link} alt={title} style={{ width: "100px", height: "auto" }} />
                </li>

            )}
            <li><strong>Title:</strong> {title}</li>
            <li><strong>Author:</strong> {author}</li>
            <li><strong>ISBN:</strong> {isbn}</li>
            <li><strong>Year:</strong> {publication_year}</li>
        </ul>
        </>
    );
};

export default BookDisplay;