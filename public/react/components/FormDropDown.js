import React, {useState} from "react";

export function DropDown({formData,handleChange}){
    const options = [
        "men's clothing",
        "jewelery",
        "electronics",
        'Shirt',
        'Shoe',
        'Hat',
        'Pants',
        'Glasses',
        "women's clothing"
    ];

    return(<>
        <br/>
        <label htmlFor='category'>Category: </label>
        <select
        name='category'
        value={formData.category}
        onChange={handleChange}
        >
        {options.map((option,idx) => (
        <option value={option} key={idx}>{option}</option>
        ))}
        </select>
    </>);
    

}

