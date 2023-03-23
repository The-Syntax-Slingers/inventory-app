import React from "react";
import { Card } from "./Card";

export function Items({ items, viewItem }) {
    return (<div className="item-list">
        {items.map((item) => <Card viewItem={viewItem} item={item} />)}
    </div>);
}