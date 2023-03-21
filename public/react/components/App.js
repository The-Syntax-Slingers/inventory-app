import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import {Items} from './Items'
import { Header } from './Header';

// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = () => {
//state variables and defaults
	const [sauces, setSauces] = useState([]);

	cosnt [addForm, setAddForm] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		image: ''
	})

	const defaultItem = {
			name: "Item Name",
			price: 20,
			description: "This item is a test item, for debugging and testing. User should never see it.",
			imageLink: "https://photzy.com/assets/Cover-Stacey-Hill.jpg.optimal.jpg" 
	}
	const defaultView = {
		page: "home",
		items: [defaultItem,defaultItem,defaultItem],
		slug: null,
		item: null,
		itemDraft: {
			name: "",
			price: 0,
			description: "",
			imageLink: "" 
		}
	}
	const [view, setView] = useState(defaultView)
	

//functions
	//using this to test.
	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	function handleHomeClick(){
		alert("you have clicked the home button, functionality not written!")
		//fetch and set pages-> changes view to load 
	}
	function handleNewItemClick(){
		alert("you have clicked the new item button, functionality not written!")
	}
	function handleItemClick(){
		alert("you have clicked on the item, functionality not written!")
	}
//renders
	//reload
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

	//loader choses which 'pages' to render.
	function Loader({view}){
		switch (view.page){
			//home page logic
			case 'home':
				//debugging tool
				console.log("you are on the home page. View is; ", view);
				return(<>
					<Items items={view.items} handleClick={handleItemClick} />
				</>);
		}
	}
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