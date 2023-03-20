import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import {Items} from './Items'
import { Header } from './Header';

// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = () => {
//state variables and defaults
	const [sauces, setSauces] = useState([]);
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
	}
	function handleNewItemClick(){
		alert("you have clicked the new item button, functionality not written!")
	}
//renders
	//reload
	useEffect(() => {
		fetchSauces();
	}, []);

	//loader choses which 'pages' to render.
	function Loader({view}){
		switch (view.page){
			//home page logic
			case 'home':
				//debugging tool
				console.log("you are on the home page. View is; ", view);
				return(<>
					<Items items={view.items}/>
				</>);
		}
	}
	return (
		<main>
			<Header view={view} navClicks={{home: handleHomeClick, newItem: handleNewItemClick}} />	
			<Loader view={view}/>
		</main>
	)
}