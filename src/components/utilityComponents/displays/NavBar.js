import React from 'react';
import { useNavigate } from "react-router-dom";
import './css/navBarCss.css'
import '../../general.css'
import '../../homepage/css/homePage.css'
import {  signOut } from "firebase/auth";
import {auth} from '../../../firebase';


/**
 * Creates the elements presented in the nav bar
 * @param {list} props A list of names and nav elements
 * @returns Each navbar item group
 */
const NavBarItems = (props) => {
   
    var menuItems = null;
    // returns nothing used for spacing
    if (props.menuVars == null){
        
        menuItems =  <div className='title-spacing'><p className='title'>Swim Swam Pickem</p></div>
        
    } else if(props.middle){
        menuItems = props.menuVars.map((navItems) => <div key={navItems}  className='menu-txt '><p className='txt' key={navItems} onClick={navItems[1]} >{navItems[0]}</p></div>)
        
    }
    return (
        menuItems
        
    )
}


/**
 * Export the navBar for the website
 * takes in no parameters 
 * @returns the nav bar and navigation elements.
 */
const NavBar = (userLoggedIn) => {

    const navigate = useNavigate();

    // link to the swim swam website
    let navSwimSwam = () => {window.location.href = 'https://swimswam.com/'};

    var navBarOptions = null
    if(userLoggedIn.admin){
        navBarOptions = [["Competition page", () => navigate('/competitionsPage')],['Swim Swam', navSwimSwam], ["Temp",() => navigate('/')], ["Admin settings", () => navigate('/adminPage')], ['Log out',() => signOut(auth)]]
    } else {
        navBarOptions = userLoggedIn.user ? [["Competition page", () => navigate('/competitionsPage')],['Swim Swam', navSwimSwam], ["Temp",() => navigate('/')], ['Log out',() => signOut(auth)]] : [["Competition page",() => navigate('/competitionsPage')], ['Swim Swam', navSwimSwam], ['Log in',() => navigate('/SignInPage')]];
    }
    
    if(userLoggedIn.page === 'competition') {
        navBarOptions[0] = ["Home Page", () => navigate('/')]
    }



    


    return(
    <div  className='flex-center' id='centerNavBar'>
        <div id="navBar">
            <div className='spread-evenly'>
            <NavBarItems middle={true} menuVars={null} />
            </div>
            <div className='spread-wide justifyRowRight'>
            <NavBarItems middle={true} menuVars={navBarOptions} />
            </div>
            
            
            
        </div>
    </div>
    )
};


export default NavBar;