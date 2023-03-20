import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import {Items} from './Items'

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	// const [sauces, setSauces] = useState([]);
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
	const defaultItem = {
		itemDraft: {
			name: "Item Name",
			price: 20,
			description: "This item is a test item, for debugging and testing. User should never see it.",
			imageLink: "https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/05/Considering-balance-in-composing-images-18.jpg?resize=717%2C478&ssl=1" 
		}
	}

	const [view, setView] = useState(defaultView)
	//using this to test.
	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			setView({...view, items: saucesData});
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchSauces();
	}, []);

	function loader(view){
		switch (view.page){
			//home page
			case 'home':
				console.log("you are on the home view")
				console.log(view);

				return(<>
					<h2>Items</h2>
					<Items items={view.items}/>
				</>);
		}
	}
	return (
		<main>	
      <h1>Sauce Store</h1>
			{loader(view)}
		</main>
	)
}