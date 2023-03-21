import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import {Items} from './Items'
import { Header } from './Header';
import { SingleItem } from './MiniComponents';

// import and prepend the api url to any fetch calls
import apiURL from '../api';



export const App = () => {
//state variables and defaults
	const [sauces, setSauces] = useState([]);

	const defaultItem = {
			title: "Item Name",
			price: 20,
			description: "This item is a test item, for debugging and testing. User should never see it.",
			image: "https://photzy.com/assets/Cover-Stacey-Hill.jpg.optimal.jpg" 
	}
	const defaultView = {
		page: "home",
		items: [defaultItem,defaultItem,defaultItem],
		slug: null,
		item: null,
		itemDraft: {
			title: "",
			price: 0,
			description: "",
			image: "" 
		}
	}
	const [view, setView] = useState(defaultView)
	

//functions
	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchAndSetPages(){
		try{
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			setView({...defaultView, items: itemsData, itemDraft: {...view.itemDraft}});
		}catch(err){
			console.error(err);
		}
	}
	function handleHomeClick(){
		fetchAndSetPages()
	}
	function handleNewItemClick(){
		alert("you have clicked the new item button, functionality not written!")
	}
	function handleItemClick(event,slug){
		//fetch request to get the single item goes here
		setView({...view, page: "item", item: {
			title: "Item #0",
			price: 20,
			description: "Test item for single view; when fetch is written this will be deleted.",
			image: "https://photzy.com/assets/Cover-Stacey-Hill.jpg.optimal.jpg" 
			}
		})
		console.log("You have clicked on ", event.target.parentNode, ". Needs fetch");
	}
//renders
	//reload
	useEffect(() => {
		// fetchSauces();
		fetchAndSetPages();
	}, []);

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
			//single item logic
			case 'item':
				console.log("you are on single item page, the view is: ",view)
				return(<>
					<SingleItem item={view.item} />
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