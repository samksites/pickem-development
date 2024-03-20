import React from "react";
import './css/buttons.css'



const SubmitButton = (props) => {


    return <input key={Math.random()}  className={props.css} type="button" value="Submit" onClick={props.function} />;
}


export default SubmitButton;