import React from 'react';
import './css/createComps.css'
import '../../general.css'
import ExitButton from '../../utilityComponents/buttons/ExitButton';
import { useState } from 'react'
import GeneralButton from '../../utilityComponents/buttons/GeneralButton'
import EventBlock from './EventBlock'




const updateObj = async (index, obj,parse,set,setSelect, name) => {
    

    if(name === null){

        const val = document.getElementById(index + 'event').value;


        obj.compDetials.days[index].events.push({name: val,swimmers: {names:[{name: "",time:""}]}});
    
        const objIndex = obj.compDetials.allEvents.events.findIndex(x => x.Name === val);
    
        obj.compDetials.allEvents.events[objIndex].aval = false;
    
       
    
        setSelect(null);
        set(await parse(obj));

    } else {
        const objIndex = obj.compDetials.allEvents.events.findIndex(x => x.Name === name);

        obj.compDetials.allEvents.events[objIndex].aval = true;

        const deleateIndex = obj.compDetials.days[index].events.findIndex(x => x === name);

        obj.compDetials.days[index].events.splice(deleateIndex,1);
        
        set(await parse(obj));
    }


}


const CompDay = (props) => {

   

    const [selectEvent, setSelectEvent] = useState(null);

    const avalibleEvents = props.obj.compDetials.allEvents.events.filter(e => e.aval !== false);

    const index = props.index;

    const obj = props.obj;

    const parse = props.parse;

    const set = props.set;
    


    const getEvents = () => <select id={index + 'event'} onChange={async () => await  updateObj(index,obj,parse,set,setSelectEvent, null)}> <option value={"na"} key={-1} >N/A</option>  {avalibleEvents.map((singleEvent,i) => <option  value={singleEvent.Name} key={i} >{singleEvent.Name}</option>)} </select>



  
    return(
    <div className="centerColumn">
        <h2>Day {props.index + 1}</h2> 
        <div className="compDays centerSpace">
            <ExitButton func={async () => {obj.compDetials.days.pop(index); set(await parse(obj))}}/>
            <h3>Events</h3>
            {obj.compDetials.days[index].events.map((e, i) =>  <EventBlock obj={obj} index={index} i={i} parse={parse} set={set} func={async () => await updateObj(index,obj,parse,set,setSelectEvent, e.name)} key={e.name} text={e.name}/>)}
            {selectEvent}
            
            <GeneralButton content={"Add event"} func={() => setSelectEvent(getEvents)}/>
        </div>
    </div>)
}


export default CompDay