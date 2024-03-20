import React from "react";
import './css/errorDisplay.css'
import '../../general.css'




/**
 * Component displayed when an error occurs 
 * @param {json} props has function and errorMessage keys
 * @returns error component
 */
const ErrorDisplay = (props) => {

    return(
    <div className="screenBlur">
        <div className="errorSpacing">
            <div className="errorBox">
                <div id="top">
                    <h2>Error</h2>
                    <h3 className="text-width">{props.errorMessage}</h3>
                </div>
                <div onClick={props.function} id="bottom" className="dismiss hover"><p className="center-text">Dismiss</p></div>
            </div>
            
        </div>
    </div>
    );

};


export default ErrorDisplay