import React from "react";
import AdminRoutes from "../utilityComponents/navigation/AdminRoutes";
import SearchUser from "./adminPageOptions/SearchUser";
import ManageComps from "./adminPageOptions/ManageComps";
import AdminHomePage from "./AdminHomePage";
import './css/adminPage.css';
import '../general.css'
import {useState, useEffect } from 'react';


const AdminPage = () => {

    const [homePage, setHomePage] = useState(<AdminHomePage />);
    const [homePageVariation, setHomePageVariation] = useState(0);
    useEffect(() => {
        if(homePageVariation === 0){
            setHomePage(<AdminHomePage changePage={setHomePageVariation} />)
        } else if(homePageVariation === 1) {
            setHomePage(<SearchUser returnHome={setHomePageVariation} />)
        } else if(homePageVariation === 2){
            setHomePage(<ManageComps addComp={() => setHomePageVariation(3)} changePage={() => setHomePageVariation(0)} />)
        }

    }, [homePageVariation])

    


    return(<AdminRoutes  page={homePage}/>);
}



export default AdminPage;