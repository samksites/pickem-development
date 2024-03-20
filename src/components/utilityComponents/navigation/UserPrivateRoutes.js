import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from 'react';
import Loading from '../visuals/Loading';
import {auth} from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';



/**
 * This a a private route if users try to access 
 * @param no parameters  
 * @returns Continuation on to desired route or sends user home
 */

const PrivateRoutes = () => {

    const [user, setUser] = useState(false);
    const [loading , setLoad] = useState(true);

    useEffect(() => {

        onAuthStateChanged(auth, async (data) => {
            if(data){
                
                setUser(true)
            }else{
                setUser(false)
            }
            setLoad(false)
        })

        
    }
    ,[]);
    
    

    return loading ? <Loading /> : (user ?  <Outlet /> : <Navigate to="/" />);

}

export default PrivateRoutes;