import React from 'react';
import GeneralButton from "../../utilityComponents/buttons/GeneralButton";
import  './css/createComps.css'
import EditEvent from "./EditEvent.js";
import {useState} from 'react';
import SmokeyBackground from "../../utilityComponents/visuals/SmokeyBackground";


const EventBlock = (props) => {

    let obj = props.obj;

    let swimmersAndTimes = obj.compDetials.days[props.index].events[props.i].swimmers;

    
    const [editSwimmers, setEditSwimmers] = useState(null);

    let color = 'Red';

    if(swimmersAndTimes > 0){
        color = 'green';
    }


    const edit = <div  className='postionBlock'>
                    <div className="flex-center" style={{width:'100vw'}}>
                    <EditEvent deleate={() => setEditSwimmers(null)} set={props.set} obj={props.obj}  swimmers={swimmersAndTimes} idenfifier={props.index.toString() + props.i.toString()}/>
                    </div>
                    <SmokeyBackground/>
                </div>
    
    return (

        <div className="eventsBlock" style={{backgroundColor:color}}>
            {editSwimmers}
            <div className='spaceTxt'>
                <h4>{props.text}</h4>
            </div>
            <div className="justifyRowSpaceB">
                <GeneralButton func={() => setEditSwimmers(edit)}  content={"Edit"}/>
                <GeneralButton func={props.func} content={"Delete"}/>
            </div>

            
            
        </div>

    );

}


export default EventBlock;