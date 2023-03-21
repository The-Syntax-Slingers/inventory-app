import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [sauces, setSauces] = useState([]);

	cosnt [addForm, setAddForm] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		image: ''
	})

	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchSauces();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault()

		const response = await fetch('url', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: FormData.name
			})

		})
		const data = await response.json()
	}

	const handleChange = event => {
		const {name, value} = event.target	
		//set the form data 
		setAddForm(previousState => ({
			...previousState,
			[name]: value
		}))
	}
	/* 
Form Add item:
	Name
	Description
	Price
	Category
	Image
	*/

	return (
		<main>	
      <h1>Sauce Store</h1>
			<h2>All things 🔥</h2>
			<SaucesList sauces={sauces} />

		<div>
			<h1>Add an Item</h1>
			<form onSubmit={handleSubmit}>
				<div>
					Name <br/>
					<input />
				</div>
				<div>
					Description <br/>
					<input/>
				</div>
				<div>
					Price <br/>
					<input />
				</div>
				<div>
					Category <br/>
					<input/>
				</div>
				<div>
					Image <br/>
					<input/>
				</div>
				<button>Submit</button>
			</form>
		</div>
		</main>
	)
}