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
        setFormState({...formState,visible:true});
    }
    function handleSubmit(event){
        event.preventDefault();
        console.log("submit Clicked");
    }

    function UpdateItemForm({formState,setFormState}){
        return(<>
        <form onSubmit={handleSubmit}>
            {/* title; must be string */}
            <label className="hide-element" htmlFor="title">Title: </label>
            <input
                value={formState.form.title}
                onChange={(event)=>setFormState({...formState, form: {...form, title: event.target.value}})}
                type="text"
                name="title"
            ></input>

            {/*price; must be a number */}
            <label className="hide-element" htmlFor="price" >Price: </label>
            <input
                value={formState.form.price}
                onChange={(event)=>{
                    console.log("form state is ",formState.form);
                    setFormState({...formState, form: {...form, price: event.target.value}});
                }}
                type="number"
                min="0"
                step=".01"
                name="price"
            ></input>

             {/*description; must be string */}
             <label className="hide-element" htmlFor="description" >Description: </label>
            <input
                value={formState.form.description}
                onChange={(event)=>setFormState({...formState, form: {...form, description: event.target.value}})}
                type="text"
                name="description"
            ></input>   

            {/*image;  must be string*/}
            <label className="hide-element" htmlFor="image" >Image: </label>
            <input
                value={formState.form.image}
                onChange={(event)=>setFormState({...formState, form: {...form, image: event.target.value}})}
                type="text"
                name="image"
            ></input>     
            
            {/*category; needs to be double checked later, to ensure implementation matches other form.*/}
            <label className="hide-element" htmlFor="category" ></label>
            <input
                 value={formState.form.category}
                 onChange={(event)=>setFormState({...formState, form: {...form, category: event.target.value}})}
                 type="text"
                 name="description"
            ></input>

            <label className="hide-element" htmlFor="submit" >Submit: </label>
            <input type="submit"></input>

            <label></label>
            <button onClick={console.log("write cancel function")}>cancel</button>
                
        </form></>);
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
              ""
            }
        </article>
    </main>);
}