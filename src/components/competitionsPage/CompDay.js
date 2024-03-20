import React from 'react';
import '../general.css'
import GeneralButton from '../utilityComponents/buttons/GeneralButton';
import SingleDayEvents from "../utilityComponents/forms/createCompForm/SingleDayEvents";



const CompDay = (props) => {

    var dayEvents = props.events.map((eventName) => <div key={eventName} >{eventName}</div>)
    var day = props.index + 1
    return(<div className='flex-column-super-center dayBox'>
        <h2 className='titleSpacing'>{'Day ' + day}</h2>
        <text>Events</text>
        {dayEvents}
        <GeneralButton content={'Edit day'} func={() => props.editDay(<SingleDayEvents allEvents={props.allEvents} day={props.index + 1}/>)} />
    </div>)
};

export default CompDay
