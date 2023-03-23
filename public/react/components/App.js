import React, { useState, useEffect } from 'react';
import { Items } from './Items'
import { NavBar } from './NavBar';
import { SingleItem } from './views/SingleItem';
import { NewItemForm } from './NewItemForm'

import apiURL from '../api';

export const App = () => {
	//state variables and defaults
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

	// Seperate view into their own state
	const [view, setView] = useState("home")
	const [items, setItems] = useState([])
	const [singleItem, setSingleItem] = useState(null)
	const [itemCategories, setitemCategories] = useState([])

	//functions
	async function fetchItems() {
		try {
			const response = await fetch(`${apiURL}/items/`);
			const itemsData = await response.json();
			setItems(itemsData)

			// Set item categories
			const categories = new Set(itemsData.map(c => c.category))
			setitemCategories(categories)

		} catch (err) {
			console.error(err);
		}
	}

	async function viewItem(id) {
		try {
			const response = await fetch(`${apiURL}/items/${id}`);
			const itemData = await response.json();
			setSingleItem(itemData);
			setView("item")
		} catch (err) {
			console.error(err);
		}
	}

	function setHome() {
		fetchItems();
		setView("home")
	}

	useEffect(() => {
		setHome()
	}, []);

	// Loads page views
	function Loader() {
		switch (view) {
			case 'home': return (<>
				<Items items={items} viewItem={viewItem} />
			</>);

			case 'item': return (<>
				<SingleItem item={singleItem} backToHome={setHome} reloadItem={viewItem} />
			</>);

			case 'add': return (<>
				<NewItemForm item={view.itemDraft} setView={setView} />
			</>
			)
		}
	}

	return (
		<main>
			<NavBar links={{
				home: setHome,
				add: () => setView("add")
			}} />
			<Loader />
		</main>
	)
}