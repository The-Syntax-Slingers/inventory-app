import React, {useState} from 'react';
import apiURL from '../../api';

export function SingleItem({ item, backToHome }) {
    const defaultFormState = {
        visible: false,
        form: {
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            category: item.category
        }
    }
    const [formState, setFormState] = useState(defaultFormState)
    //deleting item on single view
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
    function handleEdit(){
        console.log("edit!")
    }
    function UpdateItemForm({formState,setFormState}){

    }
    return (<main>
        <h1>{item.title}</h1>
        <article>
            <h3>{["$ ", item.price].join(" ")}</h3>
            <p>{item.description}</p>
            <img src={item.image} />
            <br />
            <button onClick={deleteItem}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
            {formState.visible ?
              <UpdateItemForm formState={formState} setFormState={setFormState} />
              :
              <></>
            }
        </article>
    </main>);
}