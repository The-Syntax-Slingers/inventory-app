import React from "react";
import { Card } from "./Card";

export function Items({ items, handleClick }) {
    return (<div className="item-list">
        {items.map((item, idx) => <Card handleClick={handleClick} item={item} key={idx} />)}
    </div>);
}