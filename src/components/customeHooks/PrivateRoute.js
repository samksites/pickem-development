import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import {useEffect, useState} from 'react';
import {auth} from '../../firebase'
import Loading from "../utilityComponents/visuals/Loading";


const isAdmin = async (user, setLoad, setAdmin) => {
    if(user === null){
        setAdmin(false);
        setLoad(false);
    } else{

    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id:user.uid})
    }

    const data = await fetch('http://localhost:3000/findAdmin',config);
    var admin = await data.json()
    setAdmin(admin.admin)
    setLoad(false);
}
}

const PrivateRoutes = (props) => {

    const [admin, setAdmin] = useState(false);
    const [loading , setLoad] = useState(true);

    useEffect(() => {

        onAuthStateChanged(auth,(data) => {
           isAdmin(data, setLoad, setAdmin);
            
        })
        
    }
    ,[]);
    
    

    return loading ? <Loading /> : (admin ?  <Outlet /> : <Navigate to="/" />);

}

export default PrivateRoutes;