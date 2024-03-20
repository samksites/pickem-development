import React from "react";
import '../../../general.css'
import './form.css'
import {useState, useEffect} from 'react';
import InputBar from "../../input/InputBar";
import MultiOption from "../../input/MultiOption";
import SetDate from "../../input/SetDate";
import GeneralButton from "../../buttons/GeneralButton";
import CompDay from "../../../competitionsPage/CompDay";
import { IoTrashOutline } from "react-icons/io5";
import ErrorDisplay from "../../displays/ErrorDisplay";
const { DateTime } = require("luxon");


const CompForm = (props) => {

    const [compTitle, setCompTitle] = useState(props.compDetails.name);
    const [compDistance, setCompDistance] = useState(props.compDetails.distance);
    const [compGender, setCompGender] = useState(props.compDetails.gender);
    const [compEntriesClose, setEntriesClose] = useState(props.compDetails.entriesClose);
    const [compEntriesOpen, setEntriesOpen] = useState(props.compDetails.entriesOpen);
    const [selectPage, setSelectPage] = useState(true);
    const [days, setDays] = useState(props.compDetails.days);
    const [events, setEvents] = useState(props.compDetails.allEvents);
    const [singleDayEvents, setSingleDayEvents] = useState(null);
    const [errorDisplay, setErrorDisplay] = useState(null);
    const [saveState, setSaveState] = useState(0);



    // when a successful save of the data occurs
    const save = () => setSaveState(1);
    

    useEffect(() => {
        if(saveState === 0){
            setSaveState(1)
        } else if (saveState === 1){
            setSaveState(2);
        }
        

    },[compTitle,events,compDistance,compGender,compEntriesClose,compEntriesOpen,days,events]);

    // variable for the save button to be active or not
    let saved = saveState <= 1;


    // this function is called to save all the updates made to the comp.
    const saveData = async () => {
        // sets the put request parameters 
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid:props.uid, referenceID:props.referenceID ,compDetails: {name:compTitle, gender:compGender, distance:compDistance, days:days, allEvents:events, entriesOpen:compEntriesOpen, entriesClose: compEntriesClose } })
        }

        // make a request to the back end to edit a comp.
        await fetch('http://localhost:3000/admin/editComp',requestOptions).then(async (response) => {
            if (!response.ok) {
                setErrorDisplay(<ErrorDisplay function={() => setErrorDisplay(null)} errorMessage={'Connection issue with the server please try again.'} />);
            } else{
                
                // builds out the response message
                response =  await response.json();

                // if an error message is sent back from the server displays that
                if(response.errorMessage !== undefined){
                    setErrorDisplay(<ErrorDisplay function={() => setErrorDisplay(null)} errorMessage={response.errorMessage} />);
                } else if(response.successMessage === '1'){
                    save();
                }
            } 
        }).catch(() =>{
            // if an error occurs it displays a connection issue occurred 
            setErrorDisplay(<ErrorDisplay function={() => setErrorDisplay(null)} errorMessage={'Connection issue with the server please try again.'} />);
    })};



    // the below logic is used to set all date and time elements to est.
    var openMin = DateTime.now().setZone("America/New_York").plus({ days: 2 }).toISO().split('.')[0].slice(0, -3);
    var openMax =  DateTime.now().setZone("America/New_York").plus({ years: 2, days: 2 }).toISO().split('.')[0].slice(0, -3);
    var closeMin = DateTime.now().setZone("America/New_York").plus({ days: 3 }).toISO().split('.')[0].slice(0, -3);
    var closeMax = DateTime.now().setZone("America/New_York").plus({ years: 2, days: 3 }).toISO().split('.')[0].slice(0, -3);

    var leftPage =  
    <div className="flex-column-super-center generalInfoBoxComp">
        <InputBar placeholder={'Enter competition name'} title={'Competition name'} txtSetter={setCompTitle}  txt={compTitle} />
        <MultiOption baseValue={compDistance} options={[{value:'scy',txt:'Short course yards'},{value:'scm',txt:'Short course meters'}, {value:'lcm',txt:'Long course meters'}]} titleTxt={'Select meet distance'} topMargin={'30px'} selected={compDistance} valueSetter={setCompDistance} />
        <MultiOption baseValue={compGender} options={[{value:'b',txt:'Both'},{value:'m',txt:'Men'}, {value:'f',txt:'Women'}]} titleTxt={'Select a gender'} topMargin={'30px'} selected={compGender} valueSetter={setCompGender} />
        <SetDate txt={'Entries open date'} min={openMin} max={openMax} dateTime={compEntriesOpen} dateSetter={setEntriesOpen} />
        <SetDate txt={'Entries close and Competition start date'} min={closeMin} max={closeMax} dateTime={compEntriesClose} dateSetter={setEntriesClose} />
        
    </div>;
    var daysList = null;
    if(!selectPage){
        daysList = days.map((value,index) => <div className="flex-super-center" key={index}> <CompDay index={index} events={value} allEvents={{'events':events,'setEvents':setEvents}}  editDay={setSingleDayEvents} /> <div title="Delete" onClick={() => { days.splice(index,1); var days2 = days.map((value) => value); setDays(days2); setEvents(events.map((event) => {if(event.Day > index){event.Day -= 1; return event} else if(event.Day === index){event.Day = -1; return event}})); } } className="hover trashBox"> 
            <IoTrashOutline className="trashCan" size={30}/></div> 
            </div>)
    }
    var rightPage =  
    <div className="flex-column-super-center generalInfoBoxComp"> 
        {daysList}
    <GeneralButton content={'Add competition day.'} func={() => setDays([...days,[]])} />
    
    </div>;

    var displayPage = selectPage ? leftPage : rightPage 

    return(
    <div className="fullWidth flex-column-super-center">
        <div id="newCompBox" className="flex-column-super-center">
            <div className="justifyRowStart" id="newCompTabsRow">
                <div id="newCompLeftTab" className="newCompTabs hover" onClick={() => setSelectPage(true)}>Competition Details</div>
                <div id="newCompRightTab" className="newCompTabs hover" onClick={() => setSelectPage(false)}>Competition events</div>
            </div>
            {displayPage}
            
            <GeneralButton clickFalse={saved} content={'Save'} func={saveData} />
        </div>

        {singleDayEvents}
        {errorDisplay}
    </div>);
}


export default CompForm;