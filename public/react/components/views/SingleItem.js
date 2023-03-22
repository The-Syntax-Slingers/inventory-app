import React, {useState} from 'react';
import apiURL from '../../api';

export function SingleItem({ item, backToHome, reloadItem }) {
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
    const [formState, setFormState] = useState(defaultFormState);

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

    async function handleSubmit(event){
        event.preventDefault();
       
        let finalData = defaultFormState.form;
        const form = formState.form
        //this only adds new data IF it's not empty & new
        for(let key in form){
            if(form[key] && form[key] !== finalData[key]){
                finalData[key] = form[key];
            }
        }
        
        try{
            const response = await fetch(`${apiURL}/items/${item.id}`,
            {
                method: "PUT",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    finalData
                )
            });
            reloadItem(item.id)
        }catch(err){console.error(err)}
         
    }

    function handleCancel(event){
        event.preventDefault();
        setFormState(defaultFormState);
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
        </article>
            
            {/* Form conditionally rendered below */}
        {formState.visible ?
        <>
            <form onSubmit={handleSubmit}>
                {/* title; must be string */}
                <label htmlFor="title">Title: </label>
                <input
                    value={formState.form.title}
                    onChange={(event)=>setFormState({...formState, form: {...formState.form, title: event.target.value}})}
                    type="text"
                    name="title"
                ></input>

                {/*price; must be a number */}
                <label htmlFor="price" >Price: </label>
                <input
                    value={formState.form.price}
                    onChange={(event)=>{
                        console.log("form state is ",formState.form);
                        setFormState({...formState, form: {...formState.form, price: event.target.value}});
                    }}
                    type="number"
                    min="0"
                    step=".01"
                    name="price"
                ></input>

                {/*description; must be string */}
                <label htmlFor="description" >Description: </label>
                <input
                    value={formState.form.description}
                    onChange={(event)=>setFormState({...formState, form: {...formState.form, description: event.target.value}})}
                    type="textarea"
                    rows="5"
                    columns="10"
                    name="description"
                ></input>   

                {/*image;  must be string*/}
                <label htmlFor="image" >Image: </label>
                <input
                    value={formState.form.image}
                    onChange={(event)=>setFormState({...formState, form: {...formState.form, image: event.target.value}})}
                    type="text"
                    name="image"
                ></input>     
                
                {/*category; needs to be double checked later, to ensure implementation matches other form.*/}
                <label htmlFor="category" ></label>
                <input
                    value={formState.form.category}
                    onChange={(event)=>setFormState({...formState, form: {...formState.form, category: event.target.value}})}
                    type="text"
                    name="description"
                ></input>

                <div>
                    <label htmlFor="submit" >Submit: </label>
                    <input type="submit" name="submit"></input>

                    <label htmlFor="cancel" >Cancel: </label>
                    <button onClick={(event)=>handleCancel(event)} name="cancel">Cancel</button>
                </div>
            </form>
        </>
        :
              ""
            }
    </main>);
}