import React from "react";

//the Card renders the name, price, description, and CardImage of one item
export function Card({ item, handleClick }) {

    return (<div className="card" onClick={(event) => handleClick(event, item.id)} >
        <h2>{item.title}</h2>
        <h3>{["$ ", item.price].join(" ")}</h3>
        <p>{item.description}</p>
        <CardImage imageLink={item.image} />
    </div>);
}

export function CardImage({ imageLink }) {
    const width = 100;
    const height = 100;
    return (
        <img src={imageLink} width={width} height={height} />
    );
}
