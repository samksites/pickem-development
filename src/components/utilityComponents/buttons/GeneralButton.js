import React from 'react';
import '../../general.css'
import '../css/utilityComponents.css'


const GeneralButton = (props) => {

    

return (<div className='gButtons hover' onClick={ props.func}>{props.content}</div>);

}

export default GeneralButton;