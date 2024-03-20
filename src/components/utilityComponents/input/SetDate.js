import React from "react";
import './inputs.css'
const { DateTime } = require("luxon");


const SetDate = (props) => {
    var min = null;
    var max = null;
    min = props.min !== null ? props.min : DateTime.now().setZone("America/New_York").minus({ years: 2 }).toISO().split('.')[0].slice(0, -3);
    max = props.max !== null ? props.max : DateTime.now().setZone("America/New_York").plus({ years: 10 }).toISO().split('.')[0].slice(0, -3);
   return (
    <div className="flex-column-super-center">
   <h3>{props.txt}</h3>
   <txt>All time set to etc</txt>
   <input onChange={(e) => props.dateSetter(e.target.value)}
    type="datetime-local"
    id="meeting-time"
    name="meeting-time"
    value={props.dateTime}
    min={min}
    max={max} />
    </div>)


}







export default SetDate;