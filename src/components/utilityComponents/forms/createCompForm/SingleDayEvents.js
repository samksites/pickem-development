import React from "react";
import './form.css'
import GeneralButton from "../../buttons/GeneralButton";
import SmokeyBackground from "../../visuals/SmokeyBackground";
import ScrollableBox from "../../helperComponents/ScrollableBox";
import Event from "./Event";
import {useState } from 'react';

const SingleDayEvents = (props) => {

    const [availableEvents, setAvailableEvents] = useState(props.allEvents.events.filter((event) => event.Day === -1));
    const [dayEvents, setDayEvents] = useState(props.allEvents.events.filter((event) => event.Day === props.day - 1));

    // list of event names variable
    var availableEventNames = [];

    const addEvent = (eventName) => {
        

        

    }

    // Creates the list of available events to be added to the day.
    availableEvents.forEach((event) => { availableEventNames.push({'value':event.Name, 'txt':event.Name}) });
    
    // Gets all the events set for this day and displays them
    const events = dayEvents.map((event) => <Event key={event.Name} eventName={event.Name} swimmers={event.Swimmers} />)

    return (
        <div>
            <SmokeyBackground />
            <div id="SingleDatEventsBox" className="flex-column-start-center">
                <h3>Day {props.day} events</h3>
                <div id="outerShell" className="flex-space-evenly">
                    <div id='leftBox'></div>
                    <div className="flex-column-start-center" id='middleBox'>{events}</div>
                    <div className="flex-column-super-center" id='rightBox'><ScrollableBox rows={availableEvents.map((event,index) => <tr onClick={'temp'} className="hover scrollRow" key={event + toString(index)}><td className="restWidthScroll">{event.Name}</td> </tr>)} headers={<th className="restWidthScroll" key={'eventScrollTable'}>Events</th>}/> </div>
                </div>
                <GeneralButton content={'Save'} />
            </div>

        </div>
        

    );

}


export default SingleDayEvents;