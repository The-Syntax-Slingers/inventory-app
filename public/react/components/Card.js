import React from "react";

//the Card renders the name, price, description, and CardImage of one item
export function Card({ item, handleClick }) {
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="card" onClick={(event) => handleClick(item.id)} >
            <div className="image-container">
                <img className="card-image" src={item.image} />
            </div>
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <h3 className="card-price">{currencyFormatter.format(item.price)}</h3>
            </div>
            {/* <p>{item.description}</p> */}
        </div>);
}
