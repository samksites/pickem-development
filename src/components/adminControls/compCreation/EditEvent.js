import React from 'react';
import './css/createComps.css'
import '../../general.css'
import { useState } from 'react'
import ExitButton from '../../utilityComponents/buttons/ExitButton'
import GeneralButton from '../../utilityComponents/buttons/GeneralButton'

const EditEvent = (props) => {

    const [swimmers, setSwimmers] = useState(props.swimmers.names);
    const [txtValue, setTxt] = useState('');

    
    let txt = '';

    
    let names = swimmers.map((e, i) => {
        if(e.name !== '' && e.time !== ''){
            txt += e.name + ' [' + e.time + '],'
        }
        
        return <div className='justifyRowCenter' > 
                    <div className='names'>{i + 1 + '. ' + e.name} </div> 
                    <div className='names'>Seed Time: {e.time}</div> 
                </div>});
    
    
    function handelEvent(event){
        
        setTxt(event.target.value);

        let groups = event.target.value.split(',');

        let swimmersAndTimes = groups.map((e) => {
                
                let info = {name:"",time:''}
                let first = e.indexOf('[');
                let second = e.indexOf(']');
                if(first > -1 && second > -1){
                    info = {name:e.substring(0,first), time:e.substring(first + 1, second)};
                } else if( first > -1){
                    info = {name: e.substring(0,first), time:''};
                } else{
                    info = {name: e, time:''};
                }

                return info}
                );

        setSwimmers(swimmersAndTimes);
        
    }

    let save = () => {
        props.swimmers.names = swimmers;
        props.set(props.obj)
    }

    if(txtValue !== ''){
        txt = txtValue;
    }

    return(
        <div  className='editEventBackground centerColumn'>
            <ExitButton func={props.deleate}  z={'200'}/>
            <h2 style={{margin: '-5px 0px -10px 0px'}}>Please enter info as Name Comma Square brackets with seed time inside  </h2>
            <h3>Ex: Marry Jane  [1:58.2],</h3>
            <div className='justifyRow'>
                    <textarea className='inputSwimmers' value={txt} id={props.idenfifier} onChange={ handelEvent}  type="text"></textarea >
                <div className='justifyrow namesBackground'>
                    <div className='centerColumn'>{names}</div>
                </div>
            
            </div>
            <GeneralButton func={save} content={'Save'} />
        </div>

    );


}





export default EditEvent;