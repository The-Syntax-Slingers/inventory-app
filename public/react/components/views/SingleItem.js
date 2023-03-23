import React, { useState } from 'react';
import apiURL from '../../api';
import {EditItemForm} from '../EditItemForm';


export function SingleItem({ item, backToHome, reloadItem }) {

   
    const [formVisible, setFormVisible] = useState(false);
    
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

    //editing item on single view
    function handleEdit() {
        setFormVisible(true);
    }

    return (<main>
        <article className='single-item-view'>
            <h1>{item.title}</h1>
            <div className='image-container'>
                <img src={item.image} />
            </div>
            <h3>{["$ ", item.price].join(" ")}</h3>
            <p>{item.description}</p>
            <br />
            <div className='buttons'>
                <button onClick={deleteItem}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </article>

        {/* Form conditionally rendered below */}
        {formVisible ?
        <>
            <EditItemForm reloadItem={reloadItem} item={item} setFormVisible={setFormVisible} />
        </> 
            :
            ""
        }
    </main>);
}