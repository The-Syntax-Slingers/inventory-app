import React from "react";

export function NavBar({ view, navClicks }) {
    return (<nav>
        <div className="app-logo" onClick={navClicks.home}>
            <span className="nav-item emoji">📇</span>
            <h2 className="nav-item app-logo" >Inventory App</h2>
        </div>
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
