import React from "react";

function NavBar({ view, navClicks }) {
    console.log("navbar says view is ", view)
    return (<nav>
        <ul>
            <button className="navButton" onClick={navClicks.home}>
                {view.page === "home" ? "you're on the home" : "Home"}
            </button>

            <button className="navButton" onClick={navClicks.newItem}>
                {view.page === "newItem" ? "you're on new item" : "New Item"}
            </button>

            <button className="navButton">
                {view.page === "update" ? "you're updating an item" : "update Item"}
            </button>

            <button className="navButton">
                {view.page === "delete" ? "you're deleting an item" : "delete Item"}
            </button>
        </ul>
    </nav>);

}

export function Header({ view, navClicks }) {
    return (<header>
        <h1>Welcome to the Shop!</h1>
        <NavBar view={view} navClicks={navClicks} />
    </header>);
}