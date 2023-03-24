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
        <label htmlFor='category'>Category </label>
        <br/>
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

