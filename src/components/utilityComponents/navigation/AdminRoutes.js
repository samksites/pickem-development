import React from "react";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import {auth} from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../visuals/Loading';



/**
 * This a a private route if users try to access 
 * @param no parameters  
 * @returns Continuation on to desired route or sends user home
 */

const AdminRoutes = (props) => {

    const [admin, setAdmin] = useState(null);
    const [returnItem, setReturnItem] = useState(<Loading />)
    const [loadingState , setLoading] = useState(true);
    
    useEffect(() => {
        onAuthStateChanged(auth, async (data) => {
                if(data){

                var isAdmin = await fetch(`http://localhost:3000/admin/checkAdminStatus?uid=${data.uid}`);
                isAdmin = await isAdmin.json()
                if(isAdmin.admin){
                    setAdmin(true)
                    setReturnItem(props.page);
                }else{
                    setReturnItem(<Navigate to='/' />);
                }

                } else{
                    setReturnItem(<Navigate to='/' />);
                }
                setLoading(false)
                
            
        }) 
        
    }
    ,[returnItem]);

    if(admin && !loadingState && returnItem !== props.page){
        setReturnItem(props.page);
    }
    
    return returnItem
    

}

export default AdminRoutes;