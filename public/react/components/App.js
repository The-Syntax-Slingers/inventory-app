import React, { useState, useEffect } from 'react';
import { Items } from './Items'
import { NavBar } from './NavBar';
import { SingleItem } from './views/SingleItem';
import { NewItemForm } from './NewItemForm'

import apiURL from '../api';

export const App = () => {
	// States
	const [view, setView] = useState("home")
	const [items, setItems] = useState([])
	const [singleItem, setSingleItem] = useState(null)
	const [itemCategories, setitemCategories] = useState([])

	// Functions
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

	// Onload
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
				<NewItemForm backToHome={setHome} />
			</>
			)
		}
	}

	// App
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