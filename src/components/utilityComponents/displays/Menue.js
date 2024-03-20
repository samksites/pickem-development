import React, { useEffect } from "react"
import './scss/displays.css'
import { auth } from "../../../firebase";
import {useState} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {MdAdminPanelSettings} from'react-icons/md';
import { useNavigate } from "react-router-dom";



const Menue = (props) => {


    const [admin, setAdmin] = useState(null);

    useEffect(() =>  {

        onAuthStateChanged(auth,(data) => {
            
            const findAdmin = async (data) => {
                const config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({user_id:data.uid})
                    
                }
                var isAdmin = await fetch('http://localhost:3000/findAdmin',config);
                isAdmin = await isAdmin.json();
                
                if(isAdmin.admin){
                    setAdmin(<DropDown dest={"/AdminContrls"} txt={'Admin Controls'} img={<MdAdminPanelSettings />} />);
                }
                }

            if(data != undefined){
                findAdmin(data);
            }
                
            
        })
    }, []);

    return (
    <div className="menu-container">
       
    </div>)
}

const DropDown = (props) => {
    
    let navigate = useNavigate(); 
    
    return( 
    <li onClick={() => navigate(props.dest)}  className="drop-down-iteam">
        {props.img}
        <h4>{props.txt}</h4>
    </li>)
}


export default Menue;