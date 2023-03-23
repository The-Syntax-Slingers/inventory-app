import React from "react";
import { Card } from "./Card";

export function Items({ items, viewItem }) {
    return (<div className="item-list">
        {items.map((item,idx) => <Card viewItem={viewItem} key={idx} item={item} />)}
    </div>);
}