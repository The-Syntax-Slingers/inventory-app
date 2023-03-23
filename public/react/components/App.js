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

	const defaultView = {
		page: "home",
		items: [],
		id: null,
		item: null,
		itemDraft: emptyDraft
	}

	const [view, setView] = useState(defaultView)

	//functions
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

	useEffect(() => {
		fetchAndSetItems();
	}, []);

	// Loads page views
	function Loader({ view }) {
		switch (view.page) {
			case 'home': return (<>
				<Items items={view.items} handleClick={handleItemClick} />
			</>);

			case 'item': return (<>
				<SingleItem item={view.item} backToHome={handleHomeClick} reloadItem={handleItemClick} />
			</>);

			case 'add': return (<>
				<NewItemForm item={view.itemDraft} setView={setView} />
			</>
			)
		}
	}

	return (
		<main>
			<NavBar links={{ home: handleHomeClick, add: handleNewItemClick }} />
			<Loader view={view} />
		</main>
	)
}