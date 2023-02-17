import React from 'react';
import '../../general.css'
import '../css/utilityComponents.css'

const ExitButton = (props) => {

    let z = props.z;

    if(z === undefined){
        z = '1';
        
    }

    

    return (
    <div className='justifyLeft' style={{width:'100%'}}>
        <div onClick={props.func === undefined ? null :  props.func} style={{zIndex:z}} className='exitButton hover' >
        </div>
    </div>
    )
    }
export default ExitButton;