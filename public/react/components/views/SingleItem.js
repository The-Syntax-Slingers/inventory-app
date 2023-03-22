import React from 'react';
import apiURL from '../../api';

export function SingleItem({ item, backToHome }) {
    async function deleteItem() {
        try {
            if (!confirm("Confirm delete?"))
                return
            const res = await fetch(`${apiURL}/items/${item.id}`, {
                method: "DELETE",
            })
            backToHome()
        } catch (err) {
            console.error(err);
        }
    }

    return (<main>
        <h1>{item.title}</h1>
        <article>
            <h3>{["$ ", item.price].join(" ")}</h3>
            <p>{item.description}</p>
            <img src={item.image} />
            <br />
            <button onClick={deleteItem}>Delete</button>
        </article>
    </main>);
}