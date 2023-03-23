import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { Items } from './Items'
import { NavBar } from './NavBar';
import { SingleItem } from './views/SingleItem';
import { NewItemForm } from './NewItemForm'
import {Form2} from './Form2'

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	//state variables and defaults
	const [sauces, setSauces] = useState([]);

	const defaultItem = {
		title: "Item Name",
		price: 20,
		category: "test",
		description: "This item is a test item, for debugging and testing. User should never see it.",
		image: "https://photzy.com/assets/Cover-Stacey-Hill.jpg.optimal.jpg"
	}
	const emptyDraft = {
		title: "",
		price: 0,
		category: "",
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
			const response = await fetch(`${apiURL}/items/`);
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
		setView({ ...view, page: 'add' })
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
				console.log("you are on the add page")
				return (
					<>
						<NewItemForm item={view.itemDraft} setView={setView} />
					</>
				)
		}
	}
	return (
		<main>
			<NavBar view={view} navClicks={{ home: handleHomeClick, add: handleNewItemClick }} />
			<Loader view={view} />
		</main>
	)
}