import React from 'react';
import NavBar from '../../utilityComponents/NavBar'
import AdminNewCompTemplate from './AdminNewCompTemplate'
import CompsDisplay from './CompsDisplay'
import Loading from '../../utilityComponents/visuals/Loading';
import '../../general.css'
import './css/createComps.css'
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from 'firebase/auth';
import {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase'




const AdminCompsPage = () =>{
    const [newPage, setNewPage] = useState(null);
    const [oldCompsList, setOldCompsList] = useState([]);
    const [user] =  useAuthState(auth);
    const [loading, setLoading] = useState(true);


    let navigate = useNavigate(); 
    const routeChange = (obj) =>{ 
      let path = `/AdminComp/NewComp`; 
      navigate(path, {state: {comp:obj}});
    }
    
    
    
    const deleateOldComp =  async (i, id) => {
        oldCompsList.splice(i,1);
        
        setOldCompsList([...oldCompsList]);

        let config = {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID:user.uid,query:id})
        }
        
        await fetch('http://localhost:3000/deleteComp',config);
        
    }


    const newCompCreation = async ()  => {
        let config = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID:user.uid,new:true})
        }
        let data = await fetch('http://localhost:3000/adminAdd',config);
        data = await data.json();



        routeChange(data);
        
        setNewPage(<AdminNewCompTemplate obj={data}/>)
    }
    useEffect(() => {

        onAuthStateChanged(auth,(data) => {
            
            if(auth === undefined){
                
            } else{
                
                const getComps = async () => {
                    let config = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({userID:user.uid})
                    }
                    let data = await fetch('http://localhost:3000/adminFindComps',config);
                    data = await data.json();
                   
                    setOldCompsList(data.comps);
                    setLoading(false);
                    
                }
        
                getComps();

            }
           
        })
        
    }
    
    ,[user]);

    const  display =  oldCompsList.map((value, index) => <div key={index} ><CompsDisplay title={value.compDetials.name} list={oldCompsList} index={index} edit={ () => routeChange(value)} removeComp={deleateOldComp} id={value._id}/> </div>);
    
    if(loading){
        return (<Loading />)
    } 
    return(

        <div className='alighnNextFlex'>
            <NavBar title={"Create comps page"}/>
            {display}
            <button onClick={ newCompCreation} id='newComp'>Click to create new comp</button>
            {newPage}
            
           
        </div>
        
       
        

    )

}

export default AdminCompsPage;