//create form component to create an item 
import React, {useState} from 'react'
import apiURL from '../api';


export function NewItemForm({item, setView}) {

    const [formData, setFormData] = useState({
		title: '',
		price: 0,
		category: '',
		description: '',
		image: ''
	})
    console.log('ITEM :', item)
    //create options for categories
    const options = [
        {label: 'Shirt', value: 'Shirt'},
        {label: 'Shoe', value : 'Shoe'},
        {label: 'Hat', value: 'Hat'},
        {label: 'Pants', value: 'Pants'},
        {label: 'Glasses', value: 'Glasses'}
    ]


    function DropDown ({label, value, options}) {
        return (
            <label>
                {label}
                <select value={value} name={'category'} onChange={handleChange} >
                    {options.map(option => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
        )
    }

    async function handleSubmit (event) {
		event.preventDefault()

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
                <DropDown options={options} id='category' name='category' value={formData.category} onChange={handleChange}/>
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

