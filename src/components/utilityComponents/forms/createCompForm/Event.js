import React from "react";
import './form.css'
import {useState, useEffect } from 'react';
import { FaArrowDown } from "react-icons/fa";
import GeneralButton from "../../buttons/GeneralButton";

const Event = (props) => {

    const [eventBox, setEventBox] = useState(false);

    useEffect(() => {

    }, [eventBox]);
    let backgroundCSS = '';
    let fr = '0fr';
    let arrowBox = 'flex-column-super-center rotateDown hover';
    backgroundCSS = 'EventBackground flex-column-super-center';
        

    if(eventBox){
         fr = '1fr';
         arrowBox = 'flex-column-super-center rotateUp hover'
        backgroundCSS = 'EventBackground flex-column-super-center';
    } 

    const swimmersNames = props.swimmers.toString();


    const saveNames = () => {
        //var namesList = document.getElementById(props.eventName).value.split(',');
        

    }

    
    
    return (
    <div className={backgroundCSS}>
        <text className="titleText">{props.eventName}</text>
        <div class="hidden-field" style={{'grid-template-rows': fr}}>
            <div className="expandField flex-column-super-center">
                <textarea id={props.eventName} value={swimmersNames} className="eventTextArea"></textarea>
                <div className="saveButton"><GeneralButton func={saveNames} content={'Save'}/></div>
                
            </div>
        </div>
        <div  onClick={() => setEventBox(!eventBox)} className={arrowBox}><FaArrowDown/></div>
    </div>
  );
}



export default Event