import React from "react";
import './css/visuals.css';


const BannedNotBanned = (props) => {

    return props.banned ? <div className="banned">Yes</div> : <div className="notBanned">No</div>


}


export default BannedNotBanned;