import React from "react";
import NavBar from "../utilityComponents/displays/NavBar";
import SearchBar from "../utilityComponents/buttons/SearchBar";
import CompCard from "./CompCard";
import BackArrow from "../utilityComponents/buttons/BackArrow";
import {useState, useEffect } from 'react';
import Loading from "../utilityComponents/visuals/Loading";
import {AiFillCaretDown} from 'react-icons/ai'
import CompTable from "../utilityComponents/tables/CompTable";
import ExitButton from '../utilityComponents/buttons/ExitButton'
import '../general.css'
import './css/competionsPage.css'
import {auth} from '../../firebase';
import {onAuthStateChanged } from 'firebase/auth';
import { wait } from "@testing-library/user-event/dist/utils";



const CompetitionsPage = (props) => {

    const [loadingPage, setLoadingPage] = useState(true);
    const [compsList, setCompsList] = useState([])
    const [options, setOptions] = useState(false);
    const [arrow, setArrow] = useState('')
    const [queryParams, setQueryParams] = useState({name:'',dateChoice:'',date:'',distance:'', type:''});
    const [selectedComp, setSelectedComp] = useState(null);
    const [hideComps, setHideComps] = useState('');
    const [navBar, setNavBar] = useState(null);



    const flipArrow = () => {

        if(arrow === 'down'){
            setArrow('up')
        } else{
            setArrow('down')
        }

    }

    var adminBack = null;


    if(props.page === 'admin'){
        adminBack = <BackArrow size={25} func={props.func} />
    }

    const closeComp = () => {

        setSelectedComp(null);
        setHideComps('');
    }

    const openComp  = async (id) => {

        setHideComps('hideComps');
        setLoadingPage(true);
        await wait(1000);
        var compData = await fetch(`http://localhost:3000/general/getCompInfo?referenceID=${id}`);
        compData = await compData.json();
        setLoadingPage(false);
        var compDiv = 
        <div className="clickedCompBackground flex-column-start-center">
            <ExitButton func={() => closeComp()} />
            <CompTable cssValue={true} noHover={true} table={compData} />
        </div>
        setSelectedComp(compDiv)
    }


    const findComps = async () => {
        
        var compList = await fetch(`http://localhost:3000/general/generalInfo?request=2&name=${queryParams.name}&dateChoice=${queryParams.dateChoice}&date=${queryParams.date}&distance=${queryParams.distance}&type=${queryParams.type}`);
        compList = await compList.json();
        setCompsList(compList[0].map((comps,index) => <CompCard key={index}  action={() => openComp(comps.referenceID)} status={comps.status} name={comps.compDetails.name}/>));
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (data) => {

            if(data){
                var isAdmin = await fetch(`http://localhost:3000/admin/checkAdminStatus?uid=${data.uid}`);
                isAdmin = await isAdmin.json();
             
                isAdmin.admin ? setNavBar(<NavBar page={props.page} user={true}/>) : setNavBar(<NavBar page={props.page} user={true}/>)
                
            }else{
                setNavBar(<NavBar page={props.page} user={false}/>)
            }
            
        })
        
        findComps()

        setLoadingPage(false);
      }, [queryParams]);

    if(loadingPage){
        return <Loading />
    }

    return ( <div>

                {navBar}
                <div className={"centerColumnSpaceB " + hideComps}>
                    
                    <div className="flex-super-center  search-strip">
                        {adminBack}
                        <SearchBar obj={queryParams}  setSearch={setQueryParams} tempText={'Search for competitions'}/>
                        <div className="flex-column-start-center down-button">
                            <p>More options</p>

                                <AiFillCaretDown className={"hover arrow " + arrow}  size={25} color="white"  onClick={() => {setOptions(!options); flipArrow();}}/>
                        </div>
                        
                    </div>
                    {options ? 
                    <div className="flex-super-start  search-strip-bottom wrap">
                        
                        <ChoseDate obj={queryParams}  setSearch={setQueryParams} />
                        <ChoseDistance  obj={queryParams}  setSearch={setQueryParams} />
                        <ChoseType  obj={queryParams} setSearch={setQueryParams} />
                    </div>
                    
                : null }
                    <div className="compsBackground ">
                            <div className="compsContainer">
                                {compsList}
                            </div>
                    </div>
                </div>

                {selectedComp}
                
            </div>
    )
}



const ChoseDate = (props) => {
    const [dateOption, setDateOption] = useState(['active','','']);
    const [date, setDate] = useState(getToday());
    const [noDate, setNoDate] = useState(true);

    return ( 
    <div className="flex-column-super-center space-distance">
    
        <div className=' dateSelectorBox flex-super-center'>
                <div className={'dateSelector left flex-super-center hover ' + dateOption[0]} onClick={() => {setDateOption(['active','','']); setNoDate(true); var newObj = {...props.obj}; newObj.date = ''; newObj.dateChoice = ''; props.setSearch(newObj); props.setSearch(newObj); }} >
                    <p>Any</p>

                </div>  

                <div className={'dateSelector middle flex-super-center hover ' + dateOption[1]} onClick={() => {setDateOption(['','active','']); setNoDate(false); var newObj = {...props.obj}; newObj.dateChoice = 'lt'; props.setSearch(newObj); }}>
                    <p>Before</p>

                </div>  

                <div className={'dateSelector right flex-super-center hover '  + dateOption[2]} onClick={() => {setDateOption(['','','active']); setNoDate(false); var newObj = {...props.obj}; newObj.dateChoice = 'gt'; props.setSearch(newObj);}}>
                    <p>After</p>
                </div>  
                
        </div>

        {noDate ? null : <input className={"dateSelectionCss hover "} type="date" name="dateSelection" value={date} min="2020-01-01" max="2030-01-01" onChange={(e) => {setDate(e.target.value); var newObj = {...props.obj}; newObj.date = e.target.value; props.setSearch(newObj);}}  /> }      
    </div>
    )
}


const ChoseDistance = (props) => {
    const [dateOption, setDateOption] = useState(['active','','', '']);

    return ( 
    <div className="flex-column-super-center space-date">
    
        <div className=' dateSelectorBox flex-super-center'>
                <div className={'dateSelector left flex-super-center hover ' + dateOption[0]} onClick={() => {setDateOption(['active','','','']); var newObj = {...props.obj}; newObj.distance = ''; props.setSearch(newObj);}} >
                    <p>Any</p>

                </div>  

                <div className={'dateSelector middle flex-super-center hover ' + dateOption[1]} onClick={() => {setDateOption(['','active','','']); var newObj = {...props.obj}; newObj.distance = 'SCY'; props.setSearch(newObj);}}>
                    <p>SCY</p>

                </div>  

                <div className={'dateSelector middle flex-super-center hover ' + dateOption[2]} onClick={() => {setDateOption(['','','active','']); var newObj = {...props.obj}; newObj.distance = 'SCM'; props.setSearch(newObj); }}>
                    <p>SCM</p>

                </div> 

                <div className={'dateSelector right flex-super-center hover '  + dateOption[3]} onClick={() => {setDateOption(['','','','active']); var newObj = {...props.obj}; newObj.distance = 'LCM'; props.setSearch(newObj);}}>
                    <p>LCM</p>
                </div>  
                
        </div>    
    </div>
    )
}




const ChoseType = (props) => {
    const [dateOption, setDateOption] = useState(['active','','']);

    return ( 
    <div className="flex-column-super-center space-date">
    
        <div className=' dateSelectorBox flex-super-center'>
                <div className={'dateSelector left flex-super-center hover ' + dateOption[0]} onClick={() => {setDateOption(['active','','','']); var newObj = {...props.obj}; newObj.type = ''; props.setSearch(newObj);}} >
                    <p>Any</p>

                </div>  

                <div className={'dateSelector middle flex-super-center hover ' + dateOption[1]} onClick={() => {setDateOption(['','active','','']); var newObj = {...props.obj}; newObj.type = '0'; props.setSearch(newObj);}}>
                    <p>Future</p>

                </div>  

                <div className={'dateSelector middle flex-super-center hover ' + dateOption[2]} onClick={() => {setDateOption(['','','active','']); var newObj = {...props.obj}; newObj.type = '1'; props.setSearch(newObj);}}>
                    <p>Current</p>

                </div> 

                <div className={'dateSelector right flex-super-center hover '  + dateOption[3]} onClick={() => {setDateOption(['','','','active']); var newObj = {...props.obj}; newObj.type = '-1'; props.setSearch(newObj);}}>
                    <p>Past</p>
                </div>  
                
        </div>    
    </div>
    )
}


const getToday = () => {

    let today = new Date();

 
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
 
    let yyyy = today.getFullYear();
 
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm  + '-' + dd;
    return (today);
}



export default CompetitionsPage;