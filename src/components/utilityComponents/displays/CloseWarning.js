import React from 'react';
import ExitButton from "../buttons/ExitButton";
import GeneralButton from "../buttons/GeneralButton";
import { useNavigate } from "react-router-dom";
import './css/displays.css'
import '../../general.css'
const CloseWarning = (props) => {
    let navigate = useNavigate();

    let confirm = null;
   
    if(props.path === ''){
        confirm = props.confirmFunc;
    } else{
        confirm = () => {
        props.confirmFunc();
        navigate(props.path);         
        }
    }
    return (
        <div>
            
            <div className={props.classN} >
                <ExitButton func={props.exitFunc}/>
                <h2 className="space alighnTextCenter">{props.headerText}</h2>
                {props.bodyText}
                <GeneralButton content={"confirm"} func={ confirm}/>
            </div>
        </div>
    );
}

export default CloseWarning;