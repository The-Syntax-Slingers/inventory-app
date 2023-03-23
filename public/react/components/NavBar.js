import React from "react";

export function NavBar({ view, navClicks }) {
    console.log("navbar says view is ", view)
    return (<nav>
        <h2 className="nav-item" onClick={navClicks.home}>Inventory App</h2>
        <ul>
            <a className="nav-item nav-link" onClick={navClicks.home}>
                Home
            </a>

            <a className="nav-item nav-link" onClick={navClicks.add}>
                Add New Item
            </a>

            <a className="nav-item nav-link">
                Cart
            </a>
        </ul>
    </nav>);
}
