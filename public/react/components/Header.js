import React from "react";

function NavBar({ view, navClicks }) {
    console.log("navbar says view is ", view)
    return (<nav>
        <ul>
            <button className="navButton" onClick={navClicks.home}>
                {view.page === "home" ? "you're on the home" : "Home"}
            </button>

            <button className="navButton" onClick={navClicks.add}>
                {view.page === "add" ? "you're adding a new item" : "Add New Item"}
            </button>
        </ul>
    </nav>);
}

export function Header({ view, navClicks }) {
    // Remove header and just make it nav
    return (<header>
        <h1>Welcome to the Shop!</h1>
        <NavBar view={view} navClicks={navClicks} />
    </header>);
}