import React from "react";
import '../../general.css'
import {useState, useEffect } from 'react';
import GeneralButton from '../../utilityComponents/buttons/GeneralButton'
import CreateComp from "./CreateComp";
import CompetitionsPage from "../../competitionsPage/CompetitionsPage";
import NavBar from "../../utilityComponents/displays/NavBar";
import '../css/adminPage.css'


const ManageComps = (props) => {

    const [managePage, setManagePage] = useState(0);
    const [pageView, setPageViw] = useState(null);

    useEffect( () => {
    
    var page = null;
    if(managePage === 0){
        
        page =  
        <div >
            <NavBar page={'admin'} user={true} />
            <div className='fullWidth alignNextFlexRow'>
                <div className='buttonWidth'>
                    <GeneralButton content={'Manage competitions'} func={() => setManagePage(1)} />
                </div>

                <div className='buttonWidth'>
                    <GeneralButton content={'Create new competition'} func={() => setManagePage(2)} />
                </div>
            </div>

        </div>  

        setPageViw(page)
    } else if(managePage === 1){
        page =
        <div>
               <CompetitionsPage addComp={props.addComp} func={() => setManagePage(0)} page={'admin'}/>
        </div>
        setPageViw(page)
    } else{
        page = 
        <div>
             <NavBar page={'admin'} user={true} />
            <CreateComp referenceID={'x1waxmrjb4eHQI87ETYCBT'} />
        </div>;
        setPageViw(page)
    }

    } ,[managePage])
    
    return(

            <div >
                {pageView}
            </div>
            
        



    );
}


export default ManageComps;