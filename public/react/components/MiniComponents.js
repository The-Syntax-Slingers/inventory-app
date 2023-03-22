import React from "react";

//the Card renders the name, price, description, and CardImage of one item
export function Card({item,handleClick}){
    return(<div className="card" onClick={handleClick} >
       <div className="cardTitle">
             <h2>{item.title}</h2>
            <h3>{["$ ",item.price].join("")}</h3>
        </div> 
        <div className="cardBody">
            <CardImage imageLink={item.image}/>
            <p>{item.description}</p>
        </div>
        
    </div>);
}

export function CardImage({ imageLink }) {
    const width = 100;
    const height = 100;
    return (
        <img src={imageLink} width={width} height={height} />
    );
}
