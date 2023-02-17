
import './css/createComps.css'
import '../../general.css'

import React from 'react'
import CompDay from './CompDay';
import ExitButton from '../../utilityComponents/buttons/ExitButton';
import GeneralButton from '../../utilityComponents/buttons/GeneralButton';
import CloseWarning from '../../utilityComponents/displays/CloseWarning';
import Loading from '../../utilityComponents/visuals/Loading';
import {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../../../firebase'
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import _ from 'lodash';




const headerTextNoSave =  <h2 className="alighnTextCenter">Warning you are attempting to leave with unsaved data.</h2>
const bodyTextNoSave = <p className="alighnTextCenter">If you wish to continue with out saving please click confirm. <br/> 
If you would like to save your work or continue editing click on the button in the top left.</p>

const headerTextEraseEvents =  <h2 className="alighnTextCenter">Warning making this change will deleate event data for each day.</h2>
const bodyTextEraseEvents = <p className="alighnTextCenter">If you wish to continue this change. <br/> 
Click the confirm button seen below. If you would like to cancle this change click the X in the top left.</p>


const updateNew = async (setNew, obj) => {

    setNew ( await parseData(obj));
}


const parseData = async (compObject) => {
    return await JSON.parse(JSON.stringify(compObject))};

const saveData = async (user, obj, setOld) => {
    const config = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userID:user.uid, obj:obj})
    }

    await fetch('http://localhost:3000/adminAdd',config);

    setOld(await parseData(obj));
    
}

const onChange = async (distance, gender, setCompObject, newObj,firstRound, setOld, setWar) => {
    
    let warn = false;
    let newCompSettings = await parseData(newObj)
    
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({distance:distance, gender:gender})
    }
    let data = await fetch('http://localhost:3000/general/eventNames', config);
    data = await data.json();
    

    newCompSettings.compDetials.allEvents = data
    
    
    newCompSettings.compDetials.gender = gender;
    newCompSettings.compDetials.distance = distance;

    
    
    
    if(firstRound){
        
        setOld(await parseData(newObj));
    
    }else{
        const compSet = new Set();

        for(let e of data.events){
            compSet.add(e.Name);
        } 

      
        for (let z = 0; z < newCompSettings.compDetials.days.length; z++){

            let l = newCompSettings.compDetials.days[z].events.length;
            
            for(let i = 0; i < l; i++){
               
                if(compSet.has(newCompSettings.compDetials.days[z].events[i].name)){
                    
                    
                } else{
                    warn = true
                    newCompSettings.compDetials.days[z].events.pop(i);
                    l--;
                    i--;
                }
            }
        }
    } ;

    if(warn){
        const warningProp = <CloseWarning classN={'compWarning'} headerText={headerTextEraseEvents} bodyText={bodyTextEraseEvents} exitFunc={() => {setWar(null); setCompObject(newObj)}} path={`/AdminContrls/AdminComp`} confirmFunc={() => {}}/>;
        setWar(warningProp);
    } else{
        setCompObject(newCompSettings);
    }
    
   
}

const checkEquil = (oldObj, newObj, setExit, goHome) => {

    
    if(!_.isEqual(oldObj,newObj)){
        setExit();
    } else{

        goHome(true);

    }
    

}


const addDays = async (setCompObject, compotitionObjec) => {
    var len = compotitionObjec.compDetials.days.length;

    compotitionObjec.compDetials.days.push({id: len + 1, name:"", events:[]});

    setCompObject(await parseData(compotitionObjec));
    
}

const  updateData = async (setOld, setNew, setLoad, id, uId) => {
    

    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userID:uId, query:{_id:id}})
    }
    let data = await fetch('http://localhost:3000/adminFindComps',config);
    data = await data.json();
    const compObject = data.comps[0];
    
    await onChange(compObject.compDetials.distance,compObject.compDetials.gender, setNew, compObject, true, setOld)
    setLoad(false);

    


}


const AdminNewCompTemplate = (props) => {
 
    const location = useLocation();

   
    const [compObject, setCompObject] = useState(null);

    const [oldComObject, setOld] =  useState(null);

    const [loading, setLoading] = useState(true);


    const [nav, setNav] = useState(false);

    const [exitWarning, setExitWarning] = useState(null);

    const [user] =  useAuthState(auth);
    

    let navigate = useNavigate();

    

    if(nav){
  
        let path = `/AdminComp`; 
        navigate(path);

    }
    
    useEffect(() => {

        onAuthStateChanged(auth,(data) => {
            
            updateData( setOld,setCompObject ,setLoading ,location.state.comp._id,data.uid);
        })
        
    }
    ,[]);
    
    if(loading){
        return ( <Loading />
         )
    } else {
       
    return(
        <div className='centerColumn'>
            {exitWarning}
            <div id="createBackground">
                <ExitButton height={"10vw"} width={"10vw"} color={"black"} func={() => checkEquil(compObject,oldComObject, () => setExitWarning(<CloseWarning  classN={'compWarning'} headerText={headerTextNoSave} bodyText={bodyTextNoSave} exitFunc={() => setExitWarning(null)} path={`/AdminContrls/AdminComp`} confirmFunc={() => setExitWarning(null)}/>),setNav)}/>
                <h3>Name of the compotition</h3>
                <input className='space' value={compObject.compDetials.name} id='name' onChange={() => { 
                    compObject.compDetials.name = document.getElementById('name').value; updateNew(setCompObject, compObject);}}>    
                </input>
                <h3>Distance type</h3>
                    <select value={compObject.compDetials.distance} onChange={() => {onChange(document.getElementById('distance').value,compObject.compDetials.gender, setCompObject, compObject, false ,setOld, setExitWarning); }} id="distance" name="distance">
                        <option value="SCY">Short course yards</option>
                        <option value="SCM">Short course meters</option>
                        <option value="LCM">Long course meters</option>
                    </select>
                <h3>Gender</h3>
                    <select value={compObject.compDetials.gender} onChange={ () => {onChange(compObject.compDetials.distance,document.getElementById('gender').value,setCompObject,compObject, false ,setOld,setExitWarning); }} id="gender" name="gender">
                        <option value="B">Both</option>
                        <option value="F">Women</option>
                        <option value="M">Men</option>
                    </select>
                <h3>Date compotition entries start</h3>
                <input value={compObject.compDetials.entriesOpen.substring(0,16)} id='entriesStart' type="datetime-local" onChange={() => {compObject.compDetials.entriesOpen = document.getElementById('entriesStart').value; updateNew(setCompObject, compObject);}}></input>
                <h3>Date compotition entries close</h3>
                <input value={compObject.compDetials.entriesClose.substring(0,16)} id='compStarts' type="datetime-local" onChange={() => {compObject.compDetials.entriesClose = document.getElementById('compStarts').value; updateNew(setCompObject, compObject);}}></input>
                {compObject.compDetials.days.map((d) => 
                <CompDay key={d.id} index={d.id - 1} obj={compObject} dayEvents={d.events} parse={parseData}  set={setCompObject}/>)}
                <GeneralButton func={() => {addDays(setCompObject, compObject); }} content={'Add day'} />
                <GeneralButton func={() => { saveData(user, compObject, setOld)}} content={'Save'} />
            </div>
        </div>
        
    );
                }
}


export default AdminNewCompTemplate