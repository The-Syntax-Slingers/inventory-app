import React, {useState} from "react";
import apiURL from '../api';
import { DropDown } from "./FormDropDown";

export function EditItemForm({item,reloadItem,setFormVisible}){

    const defaultFormState = {
        title: item.title,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category
}
    const [formData, setFormData] = useState(defaultFormState);
    

    async function handleSubmit(event) {
        event.preventDefault();

        let finalData = defaultFormState;
        
        for (let key in formData) {
            if (formData[key] && formData[key] !== defaultFormState[key]) {
                finalData[key] = formData[key];
            }
        }

        try {
            const response = await fetch(`${apiURL}/items/${item.id}`,
                {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(
                        finalData
                    )
                });
            reloadItem(item.id)
        } catch (err) { console.error(err) }
        console.log(finalData);

    }

    function handleChange(event){
		const {name, value } = event.target
		setFormData(previousState => ({
			...previousState, 
			[name]: value 
		}))
    
	}

    function handleCancel(event) {
        event.preventDefault();
        setFormData(defaultFormState);
        setFormVisible(false);
    }

    return (
        <>
                <form onSubmit={handleSubmit}>
                    <br/>
                    <label htmlFor="title">Title: </label>
                    <input
                        value={formData.title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                    ></input>

                    <br/>
                    <label htmlFor="price" >Price: </label>
                    <input
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        step=".01"
                        name="price"
                    ></input>

                    <br/>
                    <label htmlFor="description" >Description: </label>
                    <input
                        value={formData.description}
                        onChange={handleChange}
                        type="textarea"
                        rows="5"
                        columns="10"
                        name="description"
                    ></input>

                    <br/>
                    <label htmlFor="image" >Image: </label>
                    <input
                        value={formData.image}
                        onChange={handleChange}
                        type="text"
                        name="image"
                    ></input>

                    <DropDown formData={formData} handleChange={handleChange} />

                    <br/>
                    <label htmlFor="submit" >Submit: </label>
                    <input type="submit" name="submit"></input>

                    <br/>
                    <button onClick={(event) => handleCancel(event)} name="cancel">Cancel</button>                   
                </form>
            </>
    );
}



