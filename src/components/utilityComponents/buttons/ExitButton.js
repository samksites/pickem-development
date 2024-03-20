import React from 'react';
import '../../general.css'
import './css/buttons.css'

/**
 * Exit button
 * @param {JSON} props json object Func: function that runs when exit button click
 * @returns exit button component 
 */
const ExitButton = (props) => {

    let z = props.z;
    // prop to define the z-index
    if(z === undefined){
        z = '1';   
    }
    // returns exit button
    return (
    <div className='justifyLeft' style={{width:'100%'}}>
        <div onClick={props.func === undefined ? null :  props.func} style={{zIndex:z}} className='exitButton hover' >
        </div>
    </div>
    )
    }
export default ExitButton;