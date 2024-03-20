import React from "react";
import {BiArrowBack} from "react-icons/bi";
import "./css/buttons.css";
import "../../general.css"

/**
 * Back arrow
 * @param {JSON} props func: function run on click, size: size of the exit button
 * @returns Back arrow component
 */
const BackArrow = (props) => {

    

    return(
        <div className="backArrow hover" onClick={props.func}>
            <BiArrowBack size={props.size} />
        </div>);

}



export default BackArrow;