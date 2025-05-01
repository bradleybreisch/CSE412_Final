import React from "react";

const NavBar = () => {
    return(
        <nav className="navBar">
            <a href="/">Home</a>
            <ul>
                <li>
                    <a href="/bookSearch">Book Search</a>
                </li>
                <li>
                    <a href="/listings">Listings</a>
                </li>
                <li>
                    <a href="/logIn">Login</a>
                </li>
                <li>
                    <a href="/favorites">Favorites</a>
                </li>
                <li>
                    <a href="/purchased">Purchased</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;