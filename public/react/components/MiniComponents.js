import React from "react";

export function Card({item}){

    return(<div className="card">
        <h2>{item.name}</h2>
        <h3>{["$ ",item.price].join(" ")}</h3>
        <p>{item.description}</p>
        <CardImage imageLink={item.imageLink}/>
    </div>);
}

export function CardImage({imageLink}){
    const width = 100;
    const height = 100;
    return(
        <img src={imageLink} width={width} height={height} />
    );
}