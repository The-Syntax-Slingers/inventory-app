import React from "react";
import { Card } from "./MiniComponents";

export function Items({items,handleClick}){
    return(<div>
        {items.map((item, idx) => <Card handleClick={handleClick} item={item} key={idx}/>)}
    </div>);
}