import React from "react";

const ListingDisplay = ({ isbn, title, publication_year, author, img_link, cost, available, retailer_name, retailer_link }) => {
    console.log(available);
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
            <li>
                <strong>Retailer:</strong>
                <a href={retailer_link} target="_blank"> {retailer_name}</a>
            </li>
            <li><strong>Cost:</strong> {cost ?? "Unknown Cost"}</li>
            <li><strong>Available:</strong> {available ? "Yes" : "No"}</li>
        </ul>
        </>
    );
};

export default ListingDisplay;