//create form component to create an item 
import React, {useState} from 'react'
import apiURL from '../api';
import { DropDown } from './FormDropDown';


export function NewItemForm() {

    const [formData, setFormData] = useState({
		title: '',
		price: 0,
		//eventually, this needs to be set by a global variable so that it always aligns with the dropdown component
        category: "men's clothing",
		description: '',
		image: ''
	})

    async function handleSubmit (event) {
		event.preventDefault()
        console.log(formData)

		const response = await fetch(`${apiURL}/items/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: formData.title,
            price: formData.price,
			category: formData.category,
			description: formData.description,
			image: formData.image
			})
		})
		const data = await response.json()
	}

    function handleChange (event){
		const {name, value } = event.target
        console.log(value)
		setFormData(prevousState => ({
			...prevousState, 
			[name]: value 
		}))
    
	}


    return(
        <div>
        <h1>Add an Item</h1>
        <form onSubmit={handleSubmit}>
            <div>
                Name <br/>
                <input placeholder='Item Name' type='text' id='title' name='title' value={formData.title} onChange={handleChange} required/>
            </div>
            <div>
                Description <br/>
                <input placeholder='Item description' type='text' id='description' name='description' value={formData.description} onChange={handleChange} required/>
            </div>
            <div>
                Price <br/>
                <input placeholder='Price' type='number' id='price' name='price' value={formData.price} onChange={handleChange} required/>
            </div>
            <div>
                Category <br/>
                <DropDown id='category' name='category' formData={formData} handleChange={handleChange}/>
            </div>
            <div>
                Image <br/>
                <input placeholder='Image URL' id='image' name='image' value={formData.image} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    )

}

