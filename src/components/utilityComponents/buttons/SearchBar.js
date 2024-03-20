import React from "react";
import './css/buttons.css'
import {useState } from 'react';
import {IoMdSearch} from 'react-icons/io'


const SearchBar = (props) => {
    const [baseValue, setBaseValue] = useState('');

    return (<div className="searchBarBox justifyLeftCol">
                <IoMdSearch size={20} style={{marginLeft: '10px'}} />
                <input className="searchBar" placeholder={props.tempText} value={baseValue} onChange={(e) =>{ setBaseValue(e.target.value); var newObj = {...props.obj}; newObj.name = e.target.value; props.setSearch(newObj); }}>

                </input>
            </div> 
    );
}



export default SearchBar;