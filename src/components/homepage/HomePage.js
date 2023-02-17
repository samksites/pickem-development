import React from 'react';
import CurrentComp from './CurrentComp'
import NextComp from './NextComp'
import NavBar from '../utilityComponents/NavBar'
import SignOut from '../utilityComponents/SignOut'
import Loading from '../utilityComponents/visuals/Loading';
import SignUp from '../utilityComponents/Signup'
import CompsDisplay from '../adminControls/compCreation/CompsDisplay'
import {useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../../firebase'

function HomePage() { 
    const [logInLogOut, setSign] = useState(null);

    const [future, setFuture] = useState(null);

    const [loading, setLoading] = useState(true);

    const [current, setCurrent] = useState(null)
    const [pastComps, setPastComps] = useState(null);
    
    useEffect(() => {

      onAuthStateChanged(auth,(data) => {

        fetchData(data, setSign)
    })
      
      

      async function fetchData(user, setSign)  {
        if(user !== undefined){
          setSign(<SignOut s={ setSign}/>);
        } else {
          setSign(<SignUp s={setSign}/>);
        }
        const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({past:true})
      }
        const data = await fetch('http://localhost:3000/currentComp',config);
        var comps = await data.json();
        if (comps.current[0] === undefined &&  comps.future[0] === undefined){

        setFuture(<NextComp title={"There are no future or current comps at the moment. Pleas take a look back at past comps"} timeTill={"NA"}/>);
             
        }

        else if(comps.current[0] === undefined &&  comps.future[0] !== undefined){
         setFuture(<NextComp title={"There are no future or current comps at the moment. Pleas take a look back at past comps"} timeTill={"NA"}/>);
         

        }

        else if( comps.future[0] === undefined &&  comps.current[0] !== undefined){
         
         
         setCurrent(<CurrentComp current={comps.current[0].rankings} name ={comps.current[0].name}/>);
         
        }

        else if( comps.future[0] !== undefined &&  comps.current[0] !== undefined){
         setCurrent(<CurrentComp current={comps.current[0].rankings} name ={comps.current[0].name}/>);
         setFuture(<NextComp title={"There are no future comps planned at the moment."} timeTill={"NA"}/>);
        }
       
       if(comps.past.length > 0){
         setPastComps(comps.past.map((d,i) => <CompsDisplay key={i} title={d.name} date={d.date}/>));
         
         
       }

       setLoading(false);
     }
     
    }, []);  

    if(loading){
      
      return <Loading />
    } else {
      
    return (
      <div className="Home">
        
        <NavBar title={"Swim swam pickem"}/>
        <div className='alighnNextFlex'>
            {future}
            {current} 
            <div id='compBox'> 
              {pastComps}
            </div>
            {logInLogOut}  
            
            
        </div>
        
      </div>
    );
  }
}
  
  export default HomePage;