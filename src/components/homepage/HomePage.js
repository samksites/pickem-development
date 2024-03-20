import React from 'react';
import NavBar from '../utilityComponents/displays/NavBar'
import ErrorDisplay from '../utilityComponents/displays/ErrorDisplay';
import Loading from '../utilityComponents/visuals/Loading';
import {useState, useEffect } from 'react';
import {onAuthStateChanged } from 'firebase/auth';
import UpcomingComps from '../utilityComponents/displays/UpcomingComps';
import CompTable from '../utilityComponents/tables/CompTable';
import Header from '../utilityComponents/displays/Header';
import {auth} from '../../firebase';
import './css/homePage.css';
import '../general.css'

function HomePage() {     


    // sets homepage display depending if user is logged in or not
    const [homePageInfo, setHomePageInfo] = useState(null);
    const [navBar, setNavBar] = useState(<NavBar user={false}/>);
    const [liveCompTable, setLiveCompTable] = useState(null);
    const [futureComps, setFutureComps] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      onAuthStateChanged(auth, async (data) => {
        
        if(data){

          fetchData(data.uid,true);
          var isAdmin = await fetch(`http://localhost:3000/admin/checkAdminStatus?uid=${data.uid}`);
          isAdmin = await isAdmin.json()    
          setNavBar(<NavBar admin={isAdmin.admin} page={''} user={true} />)
        }else{
          fetchData(null,false)
          setNavBar(<NavBar admin={false} page={''} user={false}/>)
        }
        
    })
      
    /**
     * Retrieves home page data
     * @param {object} user is a object that has the users info
     * @param {boolean} loggedInState boolean if the user is logged in or not
     */
      async function fetchData(user,loggedInState)  {
        try{
          
          const data = await fetch('http://localhost:3000/general/generalInfo?request=1');
          var comps = await data.json();
          setLiveCompTable(comps[0].map((comps,index) => <CompTable key={'liveComp' + index} table={comps}/>));

          setFutureComps(comps[1].map((comps,index) => <UpcomingComps key={'upcoming' + index} upComing={comps}/>));
        } catch(e){
          setHomePageInfo(<ErrorDisplay function={() => {setHomePageInfo(null)}} errorMessage={'Could not fetch resources pleas reload the page and try again.'} />)
        }
        
        

       // if user null means user is not signed in and ask for user to sign out
      

       // done loading info for page
       setLoading(false);
     }
     
    }, []);  

    if(loading){
      
      return <Loading />
    } else {
      
    return (
      <div className="Home">   
          {navBar}
          {homePageInfo}
          <div className='centerSpace'>
            <Header top={'50px'} width={'80%'} text={'Live comps'}/>
            <div className='space_comps'>
              {liveCompTable}
            </div>
            <Header top={'50px'} width={'80%'} text={'Upcoming comps'}/>
            <div className='space_comps'>
              {futureComps}
            </div>
            <Header top={'50px'} width={'80%'} text={'News'}/>
            
          </div>
          
          
        
      </div>
    );
  }
}


  
  export default HomePage;

