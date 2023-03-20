import React from "react";


function NavBar({view, navClicks}){
    console.log("navbar says view is ", view)
    return(<nav>
            <ul>
                <button onClick={navClicks.home}>{view.page === "home" ? "you're on the home" : "Home"}</button>
                <button onClick={navClicks.newItem}>{view.page === "newItem" ? "you're on new item" : "New Item"}</button>
            </ul>
    </nav>);
}

export function Header({view, navClicks}){
    return(<>
        <h1>Welcome to the Shop</h1>
        <NavBar view={view} navClicks={navClicks} />
    </>);
}