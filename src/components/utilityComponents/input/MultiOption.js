import React from "react";
import { FaArrowDown } from "react-icons/fa";
import './inputs.css'
import '../../general.css'
import {useState } from 'react';

const MultiOption = (props) => {

    const [openOptions, setOpenOptions] = useState(2);

    var optionsDisplay = 'noDisplay';

    const flip = openOptions === 1 ? 0 : 1;

    if (openOptions === 1){
        optionsDisplay = 'optionsDropDown';
    } else if (openOptions === 0){
        optionsDisplay = 'optionsUp'
    }

    const rotate = openOptions === 1 ? "rotate(180deg)" : "rotate(0)"

    var dropDownOptions = []

    var baseText = ''
    if (props.baseValue === ''){
        
        baseText = props.titleTxt
    } 
    props.options.forEach((element,index) => {
        if(props.baseValue !== element.value) {
        dropDownOptions.push(<div onClick={() => {setOpenOptions(flip); props.valueSetter(element.value);}} key={element.value + toString(index)} className={"option multiButtons flex-super-center " + optionsDisplay}>{element.txt}</div>);
        } else{
            baseText = element.txt;
        }
    });

    

return (
    <div className="flex-column-super-center" style={{marginTop:props.topMargin}}>
        <div className="multiMainButton flex-super-center" onClick={() => setOpenOptions(flip)}>
            {baseText} <FaArrowDown style={{marginLeft:'5px', transform: rotate, transition: "all 0.3s linear"}} />
        </div>
        <div className='dropDownOptionBox flex-column-end-center'>{dropDownOptions}</div>
    </div>

    )}



export default MultiOption;