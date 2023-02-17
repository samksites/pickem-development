import React from 'react';
import './css/navBarCss.css'
import Menue from './displays/Menue';
import '../homepage/css/homePage.css'

const title = (name) => 
<div id="navBar">
    <Menue admin={true}/>
    <div id='homeTitle'>
        <h1>{name}</h1>
    </div>
</div>

const NavBar = (props) => {

    let bar = title(props.title);

    return(
        bar
    )
};


export default NavBar;