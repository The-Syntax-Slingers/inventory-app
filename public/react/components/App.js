import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { Items } from './Items'
import { Header } from './Header';
import { SingleItem } from './views/SingleItem';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	//state variables and defaults
	const [sauces, setSauces] = useState([]);

	/*const [addForm, setAddForm] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		image: ''
	})*/

	const defaultItem = {
		title: "Item Name",
		price: 20,
		description: "This item is a test item, for debugging and testing. User should never see it.",
		image: "https://photzy.com/assets/Cover-Stacey-Hill.jpg.optimal.jpg"
	}
	const emptyDraft = {
		title: "",
		price: 0,
		description: "",
		image: ""
	}

	const defaultView = {
		page: "home",
		items: [],
		id: null,
		item: null,
		itemDraft: emptyDraft
	}
	const [view, setView] = useState(defaultView)

	//functions
	async function fetchSauces() {
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchAndSetItems() {
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			setView({ ...defaultView, items: itemsData });
		} catch (err) {
			console.error(err);
		}
	}

	function handleHomeClick() {
		fetchAndSetItems()
	}

	function handleNewItemClick() {
		alert("you have clicked the new item button, functionality not written!")
	}

	async function handleItemClick(id) {
		try {
			const response = await fetch(`${apiURL}/items/${id}`);
			const itemData = await response.json();
			setView({ ...view, page: "item", id: id, item: itemData });
		} catch (err) {
			console.error(err);
		}
	}
	//renders
	//reload
	useEffect(() => {
		// fetchSauces();
		fetchAndSetItems();
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

	/*const handleChange = event => {
		const {name, value} = event.target	
		//set the form data 
		setAddForm(previousState => ({
			...previousState,
			[name]: value
		}))
	}*/
	/* 
Form Add item:
	Name
	Description
	Price
	Category
	Image
	*/

	//loader choses which 'pages' to render.
	function Loader({ view }) {
		switch (view.page) {
			//home page logic
			case 'home':
				//debugging tool
				console.log("you are on the home page. View is; ", view);
				return (<>
					<Items items={view.items} handleClick={handleItemClick} />
				</>);
			//single item logic
			case 'item':
				console.log("you are on single item page, the view is: ", view)
				return (<>
					<SingleItem item={view.item} backToHome={handleHomeClick} reloadItem={handleItemClick} />
				</>);
			//add item logic
			case 'add':
				return (
					<>

					</>
				)
		}
	}
	return (
		<main>
			<Header view={view} navClicks={{ home: handleHomeClick, newItem: handleNewItemClick }} />
			<Loader view={view} />
		</main>
	)
}