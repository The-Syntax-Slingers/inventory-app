import React from "react";
import { Card } from "./MiniComponents";

export function Items({items}){
    console.log(items)
    return(<div>
        <h1>items list needs to be built.</h1>
        {items.map((item, idx) => <Card item={item} key={idx}/>)}
    </div>);
}