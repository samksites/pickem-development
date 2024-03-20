import React from "react";
import '../../general.css'




const InputBar = (props) => {
    
    
    
    return (
        <div className="flex-column-super-center">
            <h3 className="alighnTextCenter">{props.title}</h3>
            <input placeholder={props.placeholder} onChange={(e) => {props.txtSetter(e.target.value)}} value={props.txt}></input>
        </div>
    );
};




export default InputBar;